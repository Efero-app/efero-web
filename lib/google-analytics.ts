import { readAnalyticsConsent } from './analytics-consent'

export const GA_MEASUREMENT_ID = 'G-2WHM8Z62QJ'
const DISABLE_KEY = `ga-disable-${GA_MEASUREMENT_ID}` as const
type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  [DISABLE_KEY]?: boolean
}
let configured = false
let lastPath = ''
let previousLocation = ''
const completedLeads = new Set<string>()

export function isAnalyticsHost(hostname: string, production: boolean): boolean {
  return production && (hostname === 'efero.no' || hostname === 'www.efero.no')
}

export function safePageLocation(path: string): string | null {
  if (!path.startsWith('/') || path.startsWith('//')) return null
  const pathname = path.split(/[?#]/, 1)[0]
  if (/^\/(app|admin|platform|api|login|partner\/login)(\/|$)/.test(pathname)) return null
  return `https://efero.no${pathname}`
}

function eligible() {
  return typeof window !== 'undefined' && isAnalyticsHost(window.location.hostname, process.env.NODE_ENV === 'production')
    && readAnalyticsConsent() === 'accepted'
}

function clearAnalyticsCookies() {
  for (const entry of document.cookie.split(';')) {
    const name = entry.trim().split('=')[0]
    if (name !== '_ga' && !name.startsWith('_ga_')) continue
    for (const domain of ['', '; Domain=efero.no', '; Domain=.efero.no', '; Domain=www.efero.no']) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax`
    }
  }
}

export function stopAnalytics() {
  if (typeof window === 'undefined') return
  const browser = window as AnalyticsWindow
  browser[DISABLE_KEY] = true
  clearAnalyticsCookies()
  // An executed Google script cannot be unloaded. A new document removes its listeners
  // and timers; the persisted denied choice prevents it being loaded again.
  if (configured) window.location.reload()
}

function configure(location: string) {
  const browser = window as AnalyticsWindow
  browser[DISABLE_KEY] = false
  if (configured) return
  browser.dataLayer = browser.dataLayer || []
  browser.gtag = function () { browser.dataLayer?.push(arguments) }
  browser.gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  })
  browser.gtag('consent', 'update', { analytics_storage: 'granted' })
  browser.gtag('js', new Date())
  browser.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, page_location: location, page_referrer: safeReferrer(document.referrer),
    allow_google_signals: false, allow_ad_personalization_signals: false,
    cookie_expires: 180 * 24 * 60 * 60, cookie_update: false,
  })
  const script = document.createElement('script')
  script.id = 'efero-google-analytics'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
  configured = true
}

function safeReferrer(raw: string) {
  try {
    const url = new URL(raw)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.origin : ''
  } catch { return '' }
}

export function trackPageView(path: string) {
  if (!eligible()) return
  const location = safePageLocation(path)
  if (!location) return
  configure(location)
  if (lastPath === location) return
  const browser = window as AnalyticsWindow
  const campaign: Record<string, string> = {}
  // Never forward arbitrary query parameters, partner codes, fragments or form fields.
  const params = new URLSearchParams(window.location.search)
  for (const [parameter, field] of [['utm_source', 'campaign_source'], ['utm_medium', 'campaign_medium'], ['utm_campaign', 'campaign_name']]) {
    const value = params.get(parameter)
    if (value && /^[a-zA-Z0-9_-]{1,100}$/.test(value)) campaign[field] = value
  }
  browser.gtag?.('set', { page_location: location, page_referrer: previousLocation || safeReferrer(document.referrer) })
  browser.gtag?.('event', 'page_view', {
    send_to: GA_MEASUREMENT_ID, page_location: location, page_title: document.title,
    page_referrer: previousLocation || safeReferrer(document.referrer), ...campaign,
  })
  lastPath = location
  previousLocation = location
}

export function trackDemoConfirmed(operationId: string) {
  if (!eligible() || completedLeads.has(operationId)) return
  const location = safePageLocation(window.location.pathname)
  if (!location) return
  trackPageView(window.location.pathname)
  ;(window as AnalyticsWindow).gtag?.('event', 'generate_lead', {
    send_to: GA_MEASUREMENT_ID, form_name: 'book_demo', page_location: location,
  })
  // Deduplicate locally. Do not send operation IDs, names, phone numbers or email to GA.
  completedLeads.add(operationId)
}
