'use client'
import { CONSENT_SETTINGS } from '@/lib/analytics-consent'

export function CookiePreferences() {
  return <button type="button" className="text-[14px] text-white/80 underline underline-offset-4 hover:text-white"
    onClick={() => window.dispatchEvent(new Event(CONSENT_SETTINGS))}>Informasjonskapsler</button>
}
