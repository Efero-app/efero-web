// The old banner only described necessary cookies. Never reuse its acceptance for GA4.
export const ANALYTICS_CONSENT_KEY = 'efero_analytics_consent_v1'
export const CONSENT_CHANGED = 'efero:analytics-consent'
export const CONSENT_SETTINGS = 'efero:cookie-settings'
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000
export type AnalyticsConsent = 'accepted' | 'declined'
let memoryConsent: AnalyticsConsent | null = null

export function parseConsent(raw: string | null, now = Date.now()): AnalyticsConsent | null {
  try {
    const value: unknown = JSON.parse(raw ?? 'null')
    if (!value || typeof value !== 'object' || !('choice' in value) || !('savedAt' in value)) return null
    if (value.choice !== 'accepted' && value.choice !== 'declined') return null
    if (typeof value.savedAt !== 'number' || !Number.isFinite(value.savedAt) || value.savedAt > now || now - value.savedAt >= CONSENT_MAX_AGE_MS) return null
    return value.choice
  } catch { return null }
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') return null
  try { return parseConsent(window.localStorage.getItem(ANALYTICS_CONSENT_KEY)) }
  catch { return memoryConsent }
}

export function saveAnalyticsConsent(choice: AnalyticsConsent) {
  memoryConsent = choice
  try { window.localStorage.setItem(ANALYTICS_CONSENT_KEY, JSON.stringify({ choice, savedAt: Date.now() })) }
  catch { /* Consent still applies to this document when storage is unavailable. */ }
  window.dispatchEvent(new Event(CONSENT_CHANGED))
}
