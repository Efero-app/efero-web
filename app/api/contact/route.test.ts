import { afterEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from './route'
import { CONTACT_START_OPTIONS, CONTACT_TEAM_OPTIONS } from '@/lib/contact-request'

const validPayload = {
  name: 'Kari Nordmann',
  email: 'kari@example.no',
  company: 'Nordmann Elektro AS',
  team: CONTACT_TEAM_OPTIONS[2],
  start: CONTACT_START_OPTIONS[0],
  message: '',
  website: '',
}

function request(payload: unknown) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('POST /api/contact', () => {
  it('lagrer kontakten i Resend og sender fra verifisert Efero-domene', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key')
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'contact_123' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'email_123' }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(request(validPayload))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, saved: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)

    const [contactUrl, contactOptions] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(contactUrl).toBe('https://api.resend.com/contacts')
    expect(JSON.parse(String(contactOptions.body))).toMatchObject({
      email: 'kari@example.no',
      first_name: 'Kari',
      last_name: 'Nordmann',
      unsubscribed: true,
      properties: {
        company_name: 'Nordmann Elektro AS',
        team_size: CONTACT_TEAM_OPTIONS[2],
      },
    })

    const [url, options] = fetchMock.mock.calls[1] as [string, RequestInit]
    expect(url).toBe('https://api.resend.com/emails')
    const email = JSON.parse(String(options.body)) as Record<string, unknown>
    expect(email).toMatchObject({
      from: 'Efero <noreply@efero.no>',
      to: ['kontakt@efero.no'],
      reply_to: 'kari@example.no',
    })
    expect(String(email.text)).toContain(CONTACT_TEAM_OPTIONS[2])
  })

  it('oppdaterer eksisterende kontakt uten å endre markedsføringsvalget', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key')
    vi.stubEnv('CONTACT_RESEND_SEGMENT_ID', 'contact-segment-123')
    const fetchMock = vi.fn(async (url: string, options: RequestInit) => {
      if (url === 'https://api.resend.com/contacts' && options.method === 'POST') {
        return new Response(null, { status: 409 })
      }
      return new Response(JSON.stringify({ id: 'ok' }), { status: 200 })
    })
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(request(validPayload))

    expect(response.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledTimes(4)
    expect(fetchMock.mock.calls[1][0]).toBe('https://api.resend.com/contacts/kari%40example.no')
    const update = JSON.parse(String(fetchMock.mock.calls[1][1]?.body)) as Record<string, unknown>
    expect(update).not.toHaveProperty('unsubscribed')
    expect(fetchMock.mock.calls[2][0]).toBe(
      'https://api.resend.com/contacts/kari%40example.no/segments/contact-segment-123',
    )
    expect(fetchMock.mock.calls[3][0]).toBe('https://api.resend.com/emails')
  })

  it('lykkes når kontakten er lagret selv om varselmailen feiler', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key')
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'contact_123' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(request(validPayload))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, saved: true })
  })

  it('lykkes via varselmail når Contacts feiler', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key')
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'email_123' }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(request(validPayload))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, saved: false })
  })

  it('returnerer feil bare når både Contacts og varselmail feiler', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key')
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 500 }))
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(request(validPayload))

    expect(response.status).toBe(502)
  })

  it('avviser ugyldige felt uten å kontakte e-postleverandøren', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(request({ name: '', email: 'ugyldig' }))

    expect(response.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('later som botinnsendinger lykkes uten å sende e-post', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key')
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(request({ ...validPayload, website: 'https://spam.example' }))

    expect(response.status).toBe(200)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
