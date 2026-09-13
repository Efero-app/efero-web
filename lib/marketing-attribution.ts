export const CAMPAIGN_PROBLEMS = ['margin', 'admin', 'likviditet', 'team', 'kundereise'] as const

export type CampaignProblem = typeof CAMPAIGN_PROBLEMS[number]

export type MarketingAttribution = {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  problem: CampaignProblem | ''
  landingPath: string
}

export const EMPTY_ATTRIBUTION: MarketingAttribution = {
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
  problem: '',
  landingPath: '',
}

const STORAGE_KEY = 'efero_marketing_attribution'
const problemSet = new Set<string>(CAMPAIGN_PROBLEMS)

function clean(value: unknown, maxLength = 120) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export function normalizeAttribution(input: Record<string, unknown>): MarketingAttribution {
  const rawProblem = clean(input.problem, 30).toLowerCase()
  return {
    utmSource: clean(input.utmSource ?? input.utm_source),
    utmMedium: clean(input.utmMedium ?? input.utm_medium),
    utmCampaign: clean(input.utmCampaign ?? input.utm_campaign),
    utmContent: clean(input.utmContent ?? input.utm_content),
    problem: problemSet.has(rawProblem) ? rawProblem as CampaignProblem : '',
    landingPath: clean(input.landingPath ?? input.landing_path, 200),
  }
}

export function hasAttribution(attribution: MarketingAttribution) {
  return Object.values(attribution).some(Boolean)
}

export function attributionFromSearchParams(params: Record<string, string | string[] | undefined>) {
  const scalar = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value
  return normalizeAttribution({
    utm_source: scalar(params.utm_source),
    utm_medium: scalar(params.utm_medium),
    utm_campaign: scalar(params.utm_campaign),
    utm_content: scalar(params.utm_content),
    problem: scalar(params.problem),
    landingPath: '/venteliste',
  })
}

export function readStoredAttribution(): MarketingAttribution {
  if (typeof window === 'undefined') return EMPTY_ATTRIBUTION
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    return stored ? normalizeAttribution(JSON.parse(stored) as Record<string, unknown>) : EMPTY_ATTRIBUTION
  } catch {
    return EMPTY_ATTRIBUTION
  }
}

export function captureBrowserAttribution() {
  if (typeof window === 'undefined') return EMPTY_ATTRIBUTION
  const params = new URLSearchParams(window.location.search)
  const current = normalizeAttribution({
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    problem: params.get('problem'),
    landingPath: window.location.pathname,
  })
  const stored = readStoredAttribution()
  const merged = normalizeAttribution({ ...stored, ...Object.fromEntries(Object.entries(current).filter(([, value]) => value)) })
  try { window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged)) } catch { /* Browsere kan blokkere lagring. */ }
  return merged
}

type TrackingWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
  fbq?: (...args: unknown[]) => void
}

export function trackMarketingEvent(name: 'landing_view' | 'waitlist_start' | 'waitlist_submit' | 'job_check_complete' | 'job_check_submit', attribution: MarketingAttribution) {
  if (typeof window === 'undefined') return
  const trackingWindow = window as TrackingWindow
  const detail = { event: 'efero_marketing', eferoEvent: name, ...attribution }
  trackingWindow.dataLayer = trackingWindow.dataLayer || []
  trackingWindow.dataLayer.push(detail)
  window.dispatchEvent(new CustomEvent('efero:marketing', { detail }))
  if (typeof trackingWindow.fbq === 'function') {
    if (name === 'waitlist_submit' || name === 'job_check_submit') trackingWindow.fbq('track', 'Lead', { content_name: attribution.utmCampaign || attribution.problem || 'jobbsjekk' })
    else trackingWindow.fbq('trackCustom', name, attribution)
  }
}
