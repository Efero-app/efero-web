import { describe, expect, it } from 'vitest'
import { isConfirmedIntake, shouldRetrySameIntake } from './intake-response'

describe('intake acknowledgement', () => {
  it('requires explicit acceptance, not just HTTP 200', () => {
    for (const result of [null, {}, { ok: false }, 'OK', '<html>Error</html>']) {
      expect(isConfirmedIntake(result)).toBe(false)
    }
    expect(isConfirmedIntake({ ok: true })).toBe(true)
  })
  it('keeps the operation key through uncertain and rate-limited retries', () => {
    for (const status of [200, 202, 408, 425, 429, 500, 502, 503]) {
      expect(shouldRetrySameIntake(status)).toBe(true)
    }
    for (const status of [400, 409, 413, 415]) expect(shouldRetrySameIntake(status)).toBe(false)
  })
})
