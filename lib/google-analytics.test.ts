import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { ANALYTICS_CONSENT_KEY, CONSENT_MAX_AGE_MS, parseConsent } from './analytics-consent'

afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs() })
beforeEach(() => vi.resetModules())

async function fixture({ host = 'efero.no', production = true, accepted = true, blockedStorage = false } = {}) {
  vi.stubEnv('NODE_ENV', production ? 'production' : 'development')
  const store = new Map<string, string>()
  if (accepted) store.set(ANALYTICS_CONSENT_KEY, JSON.stringify({ choice: 'accepted', savedAt: Date.now() }))
  const scripts: { src?: string }[] = []
  const cookieWrites: string[] = []
  const browser = {
    location: { hostname: host, pathname: '/book-demo', search: '?email=private@example.test&partner=PRIVATE&utm_source=instagram&utm_medium=social&utm_campaign=autumn', reload: vi.fn() },
    localStorage: {
      getItem: (key: string) => { if (blockedStorage) throw new Error('blocked'); return store.get(key) ?? null },
      setItem: (key: string, value: string) => { if (blockedStorage) throw new Error('blocked'); store.set(key, value) },
    },
    dispatchEvent: vi.fn(), dataLayer: [] as IArguments[],
  }
  const doc = {
    title: 'Bestill demo | Efero', referrer: 'https://www.google.com/search?q=private',
    createElement: vi.fn(() => ({})), head: { appendChild: (script: { src?: string }) => scripts.push(script) },
    get cookie() { return '_ga=test; _ga_2WHM8Z62QJ=session; essential=keep' },
    set cookie(value: string) { cookieWrites.push(value) },
  }
  vi.stubGlobal('window', browser); vi.stubGlobal('document', doc)
  const analytics = await import('./google-analytics')
  const consent = await import('./analytics-consent')
  return { browser, store, scripts, cookieWrites, analytics, consent, commands: () => browser.dataLayer.map(entry => Array.from(entry)) }
}

describe('Google tag privacy and counting', () => {
  it.each(['localhost', '127.0.0.1', 'app.efero.no', 'preview.efero.no', 'efero.no.attacker.test'])('never loads or sends on %s', async host => {
    const f = await fixture({ host })
    f.analytics.trackPageView('/'); f.analytics.trackDemoConfirmed('a')
    expect(f.scripts).toEqual([]); expect(f.commands()).toEqual([])
  })
  it('never sends in development, even with production hostname', async () => {
    const f = await fixture({ production: false })
    f.analytics.trackPageView('/')
    expect(f.scripts).toEqual([])
  })
  it('requires fresh explicit analytics consent, ignoring the previous necessary-cookie banner', async () => {
    const f = await fixture({ accepted: false })
    f.store.set('efero_cookie_consent', 'accepted')
    f.analytics.trackPageView('/'); f.analytics.trackDemoConfirmed('a')
    expect(f.scripts).toEqual([]); expect(f.commands()).toEqual([])
    f.consent.saveAnalyticsConsent('declined'); f.analytics.trackPageView('/')
    expect(f.scripts).toEqual([])
    f.consent.saveAnalyticsConsent('accepted'); f.analytics.trackPageView('/')
    expect(f.scripts).toHaveLength(1)
  })
  it('loads once after consent, disables automatic config pageviews, deduplicates rerenders but counts revisits', async () => {
    const f = await fixture()
    f.analytics.trackPageView('/'); f.analytics.trackPageView('/')
    f.analytics.trackPageView('/priser'); f.analytics.trackPageView('/')
    expect(f.scripts).toEqual([expect.objectContaining({ src: 'https://www.googletagmanager.com/gtag/js?id=G-2WHM8Z62QJ' })])
    expect(f.commands().filter(item => item[0] === 'event' && item[1] === 'page_view')).toHaveLength(3)
    expect(f.commands()[0]).toEqual(['consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }])
    expect(f.commands()).toContainEqual(['config', 'G-2WHM8Z62QJ', expect.objectContaining({ send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false })])
  })
  it('strips queries/fragments, retains constrained campaigns, and never passes form or partner data', async () => {
    const f = await fixture()
    f.analytics.trackPageView('/book-demo?email=private@example.test#secret')
    f.analytics.trackDemoConfirmed('secret-operation-id')
    const encoded = JSON.stringify(f.commands())
    for (const secret of ['private@example.test', 'PRIVATE', 'secret-operation-id', '?', '#secret']) expect(encoded).not.toContain(secret)
    expect(f.commands()).toContainEqual(['event', 'page_view', expect.objectContaining({ campaign_source: 'instagram', campaign_medium: 'social', campaign_name: 'autumn', page_location: 'https://efero.no/book-demo', page_referrer: 'https://www.google.com' })])
  })
  it('counts a confirmed demo only once per operation and never replays one from before consent', async () => {
    const f = await fixture({ accepted: false })
    f.analytics.trackDemoConfirmed('before-consent')
    f.consent.saveAnalyticsConsent('accepted'); f.analytics.trackPageView('/book-demo')
    expect(f.commands().filter(item => item[1] === 'generate_lead')).toHaveLength(0)
    f.analytics.trackDemoConfirmed('a'); f.analytics.trackDemoConfirmed('a'); f.analytics.trackDemoConfirmed('b')
    expect(f.commands().filter(item => item[1] === 'generate_lead')).toHaveLength(2)
  })
  it('stops further events on withdrawal, clears only analytics cookies and reloads the loaded script', async () => {
    const f = await fixture()
    f.analytics.trackPageView('/')
    const count = f.commands().length
    f.consent.saveAnalyticsConsent('declined'); f.analytics.stopAnalytics()
    f.analytics.trackPageView('/priser'); f.analytics.trackDemoConfirmed('a')
    expect(f.commands()).toHaveLength(count)
    expect(f.cookieWrites).toContain('_ga=; Max-Age=0; Path=/; SameSite=Lax')
    expect(f.cookieWrites.some(value => value.startsWith('essential='))).toBe(false)
    expect(f.browser.location.reload).toHaveBeenCalledOnce()
  })
  it('fails closed with blocked storage but allows explicit consent for the current document', async () => {
    const f = await fixture({ blockedStorage: true })
    f.analytics.trackPageView('/')
    expect(f.scripts).toHaveLength(0)
    f.consent.saveAnalyticsConsent('accepted'); f.analytics.trackPageView('/')
    expect(f.scripts).toHaveLength(1)
  })
  it.each(['/app', '/admin', '/platform/tenants', '/api/demo', '/login', '/partner/login', '//other.test'])('never measures private path %s', async path => {
    const f = await fixture(); f.analytics.trackPageView(path)
    expect(f.scripts).toEqual([])
  })
  it('expires choices and rejects malformed records', () => {
    const now = Date.now()
    expect(parseConsent(JSON.stringify({ choice: 'accepted', savedAt: now }), now)).toBe('accepted')
    expect(parseConsent(JSON.stringify({ choice: 'accepted', savedAt: now - CONSENT_MAX_AGE_MS }), now)).toBeNull()
    expect(parseConsent(JSON.stringify({ choice: 'accepted', savedAt: now + 1 }), now)).toBeNull()
    expect(parseConsent('accepted')).toBeNull()
    expect(parseConsent('{')).toBeNull()
  })
  it('wires demo tracking after the server-confirmed success branch and mounts only on marketing pages', () => {
    const form = readFileSync(new URL('../components/DemoBookingForm.tsx', import.meta.url), 'utf8')
    expect(form.indexOf('trackDemoConfirmed(analyticsOperation.current)')).toBeGreaterThan(form.indexOf("setStatus('success')"))
    expect(form).toContain('!isConfirmedIntake(result)')
    const layout = readFileSync(new URL('../app/(marketing)/layout.tsx', import.meta.url), 'utf8')
    expect(layout).toContain('<GoogleAnalytics />')
    expect(readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8')).not.toContain('<GoogleAnalytics />')
  })
})
