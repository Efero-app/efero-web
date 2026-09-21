import { describe, expect, it } from 'vitest'
import {
  buildDemoEmail,
  buildPartnerDemoMessage,
  DEMO_MODULES,
  START_TIMELINE_OPTIONS,
  TEAM_SIZE_OPTIONS,
  validateDemoBooking,
} from './demo-booking'

const validInput = {
  name: 'Enlil Sawa',
  company: 'Efero AS',
  email: 'ENLIL@EXAMPLE.NO',
  phone: '+47 925 26 265',
  teamSize: TEAM_SIZE_OPTIONS[1],
  modules: ['quotes', 'time'],
  startTimeline: START_TIMELINE_OPTIONS[1],
  message: 'Vi ønsker bedre flyt fra tilbud til faktura.',
  website: '',
}

describe('validateDemoBooking', () => {
  it('normaliserer en gyldig demoforespørsel', () => {
    const result = validateDemoBooking(validInput)

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.email).toBe('enlil@example.no')
      expect(result.data.modules).toEqual(['quotes', 'time'])
    }
  })

  it('krever kontaktinfo, team, modulvalg og oppstart', () => {
    const result = validateDemoBooking({})

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors).toMatchObject({
        name: expect.any(String),
        company: expect.any(String),
        email: expect.any(String),
        teamSize: expect.any(String),
        modules: expect.any(String),
        startTimeline: expect.any(String),
      })
    }
  })

  it('slipper ikke gjennom ukjente modulverdier', () => {
    const result = validateDemoBooking({ ...validInput, modules: ['unknown-module'] })

    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.modules).toBeTruthy()
  })
})

describe('buildDemoEmail', () => {
  it('uses readable Norwegian module names in partner referrals and fits the intake limit', () => {
    const message = buildPartnerDemoMessage({ ...validInput,
      modules: DEMO_MODULES.map(module => module.id), message: 'a'.repeat(1500),
    })
    expect(message).toContain('Tilbud og godkjenning')
    expect(message).toContain('Timer og ansatte')
    expect(message).not.toContain('quotes')
    expect(message.length).toBeLessThanOrEqual(2000)
    expect(message.endsWith('a'.repeat(1500))).toBe(true)
  })
  it('keeps customer-controlled email subjects on one line', () => {
    const email = buildDemoEmail({ ...validInput, company: 'Bedrift\r\nBcc: injected@example.test' })
    expect(email.subject).not.toMatch(/[\r\n]/)
  })
  it('lager både tekst og HTML med valgte moduler', () => {
    const result = validateDemoBooking(validInput)
    if (!result.ok) throw new Error('Testdata should be valid')

    const email = buildDemoEmail(result.data)

    expect(email.subject).toBe('Ny demoforespørsel: Efero AS')
    expect(email.text).toContain('Tilbud og godkjenning')
    expect(email.text).toContain('Timer og ansatte')
    expect(email.html).toContain('Ønskede moduler')
    expect(email.html).toContain('background:#004c3a')
    expect(email.html).toContain('role="presentation"')
    expect(email.html).toContain('Svar kunden')
    expect(email.html).toContain('mailto:enlil%40example.no')
    expect(email.html).not.toContain('Kom fra partner')
    expect(email.html).not.toContain('/platform/partners/')
  })

  it('escaper brukerinnhold i HTML-e-posten', () => {
    const result = validateDemoBooking({
      ...validInput,
      company: '<img src=x onerror=alert(1)>',
      message: '<script>alert(1)</script>',
    })
    if (!result.ok) throw new Error('Testdata should be valid')

    const email = buildDemoEmail(result.data)

    expect(email.html).not.toContain('<script>')
    expect(email.html).not.toContain('<img')
    expect(email.html).toContain('&lt;script&gt;')
    expect(email.html).toContain('&lt;img')
  })
})
