import { afterEach, describe, expect, it, vi } from 'vitest'
import { attributionFromSearchParams, captureBrowserAttribution, normalizeAttribution, trackMarketingEvent } from './marketing-attribution'

afterEach(() => vi.unstubAllGlobals())

describe('marketing attribution', () => {
  it('normaliserer UTM-parametere og godkjent kampanjeproblem', () => {
    expect(attributionFromSearchParams({
      utm_source: ' Meta ', utm_medium: 'paid-social', utm_campaign: 'efero_margin',
      utm_content: '01_marginen_lekker', problem: 'margin',
    })).toMatchObject({
      utmSource: 'Meta', utmMedium: 'paid-social', utmCampaign: 'efero_margin',
      utmContent: '01_marginen_lekker', problem: 'margin', landingPath: '/venteliste',
    })
  })

  it('forkaster ukjente problemverdier og begrenser feltlengde', () => {
    const result = normalizeAttribution({ problem: 'ukjent', utm_source: 'x'.repeat(200) })
    expect(result.problem).toBe('')
    expect(result.utmSource).toHaveLength(120)
  })

  it('fanger kampanjen og publiserer ventelistehendelser', () => {
    const storage = new Map<string, string>()
    const fakeWindow = {
      location: {
        search: '?utm_source=meta&utm_medium=paid-social&utm_campaign=efero_margin&utm_content=01_marginen_lekker&problem=margin',
        pathname: '/venteliste',
      },
      sessionStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
      dispatchEvent: vi.fn(),
      dataLayer: [] as Array<Record<string, unknown>>,
    }
    vi.stubGlobal('window', fakeWindow)
    vi.stubGlobal('CustomEvent', class { constructor(public type: string, public init: unknown) {} })

    const attribution = captureBrowserAttribution()
    trackMarketingEvent('waitlist_start', attribution)

    expect(attribution).toMatchObject({ utmCampaign: 'efero_margin', problem: 'margin' })
    expect(fakeWindow.dataLayer).toContainEqual(expect.objectContaining({
      event: 'efero_marketing', eferoEvent: 'waitlist_start', utmContent: '01_marginen_lekker',
    }))
  })

  it('registrerer fullført Jobbsjekk og innsending som lead', () => {
    const fbq = vi.fn()
    const fakeWindow = {
      dispatchEvent: vi.fn(),
      dataLayer: [] as Array<Record<string, unknown>>,
      fbq,
    }
    vi.stubGlobal('window', fakeWindow)
    vi.stubGlobal('CustomEvent', class { constructor(public type: string, public init: unknown) {} })

    const attribution = normalizeAttribution({
      utm_source: 'instagram',
      utm_campaign: 'sma_mysterier',
      utm_content: '01_time',
      landingPath: '/jobbsjekk',
    })
    trackMarketingEvent('job_check_complete', attribution)
    trackMarketingEvent('job_check_submit', attribution)

    expect(fakeWindow.dataLayer).toContainEqual(expect.objectContaining({
      eferoEvent: 'job_check_complete',
      utmContent: '01_time',
    }))
    expect(fakeWindow.dataLayer).toContainEqual(expect.objectContaining({
      eferoEvent: 'job_check_submit',
      utmCampaign: 'sma_mysterier',
    }))
    expect(fbq).toHaveBeenCalledWith('track', 'Lead', { content_name: 'sma_mysterier' })
  })
})
