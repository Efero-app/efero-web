import { describe, expect, it } from 'vitest'
import {
  buildContactEmail,
  CONTACT_START_OPTIONS,
  CONTACT_TEAM_OPTIONS,
  validateContactRequest,
} from './contact-request'

const validInput = {
  name: 'Kari Nordmann',
  email: 'KARI@EXAMPLE.NO',
  company: 'Nordmann Elektro AS',
  team: CONTACT_TEAM_OPTIONS[2],
  start: CONTACT_START_OPTIONS[0],
  message: 'Vi ønsker mer informasjon.',
  website: '',
  source: 'contact',
}

describe('validateContactRequest', () => {
  it('normaliserer en gyldig henvendelse', () => {
    const result = validateContactRequest(validInput)

    expect(result.ok).toBe(true)
    if (result.ok) expect(result.data.email).toBe('kari@example.no')
  })

  it('lar meldingen være tom slik skjemaet viser', () => {
    const result = validateContactRequest({
      name: 'Kari Nordmann',
      email: 'kari@example.no',
      message: '',
    })

    expect(result.ok).toBe(true)
  })

  it('krever navn og gyldig e-post', () => {
    const result = validateContactRequest({ name: '', email: 'ugyldig' })

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors).toMatchObject({ name: expect.any(String), email: expect.any(String) })
    }
  })
})

describe('buildContactEmail', () => {
  it('tar med team, oppstart og tekstversjon', () => {
    const result = validateContactRequest(validInput)
    if (!result.ok) throw new Error('Testdata should be valid')

    const email = buildContactEmail(result.data)

    expect(email.subject).toBe('Ny henvendelse: Nordmann Elektro AS')
    expect(email.text).toContain(CONTACT_TEAM_OPTIONS[2])
    expect(email.text).toContain(CONTACT_START_OPTIONS[0])
  })

  it('escaper brukerinnhold i HTML-e-posten', () => {
    const result = validateContactRequest({
      ...validInput,
      company: '<img src=x onerror=alert(1)>',
      message: '<script>alert(1)</script>',
    })
    if (!result.ok) throw new Error('Testdata should be valid')

    const email = buildContactEmail(result.data)

    expect(email.html).not.toContain('<script>')
    expect(email.html).not.toContain('<img')
    expect(email.html).toContain('&lt;script&gt;')
    expect(email.html).toContain('&lt;img')
  })

  it('merker Jobbsjekk-leads tydelig', () => {
    const result = validateContactRequest({
      ...validInput,
      source: 'jobbsjekk',
      message: 'Jobbsjekk: 4/10. Kilde: instagram / sma_mysterier / 01_time.',
    })
    if (!result.ok) throw new Error('Testdata should be valid')

    const email = buildContactEmail(result.data)

    expect(email.subject).toBe('Nytt Jobbsjekk-lead: Nordmann Elektro AS')
    expect(email.text).toContain('Kilde: Jobbsjekken')
    expect(email.text).toContain('instagram / sma_mysterier / 01_time')
  })
})
