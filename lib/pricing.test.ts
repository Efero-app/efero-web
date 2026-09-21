import { describe, expect, it } from 'vitest'
import {
  CORE_PACKAGE_FEATURES,
  OPTIONAL_MODULES,
  PRICING_FACTORS,
  PRICING_PROMISES,
  PRICING_TERMS,
} from '@/lib/pricing'

describe('offentlig prismodell', () => {
  it('forklarer hva prisforslaget baseres på uten å publisere beløp', () => {
    expect(PRICING_FACTORS.map(factor => factor.name)).toEqual([
      'Behov og arbeidsflyt',
      'Antall brukere',
      'Moduler og integrasjoner',
    ])
    expect(PRICING_PROMISES).toContain('Totalpris og omfang bekreftes skriftlig før oppstart')
    expect(JSON.stringify({ PRICING_FACTORS, PRICING_PROMISES })).not.toMatch(/kr\/mnd|\d{3}\s?kr/i)
  })

  it('forklarer grunnpakke, tilvalg og kommersielle vilkår', () => {
    expect(CORE_PACKAGE_FEATURES).toHaveLength(6)
    expect(OPTIONAL_MODULES).toHaveLength(5)
    expect(PRICING_TERMS).toEqual({
      trial: '30 dager gratis uten betalingskort',
      setup: 'Personlig hjelp til oppstart',
      support: 'E-postsupport med svar innen én virkedag',
    })
  })
})
