'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ANALYTICS_CONSENT_KEY, CONSENT_CHANGED, readAnalyticsConsent } from '@/lib/analytics-consent'
import { stopAnalytics, trackPageView } from '@/lib/google-analytics'

export function GoogleAnalytics() {
  const pathname = usePathname()
  useEffect(() => {
    const update = () => {
      if (readAnalyticsConsent() === 'accepted') trackPageView(pathname)
      else stopAnalytics()
    }
    const storage = (event: StorageEvent) => {
      if (event.key === ANALYTICS_CONSENT_KEY || event.key === null) update()
    }
    update()
    window.addEventListener(CONSENT_CHANGED, update)
    window.addEventListener('storage', storage)
    return () => {
      window.removeEventListener(CONSENT_CHANGED, update)
      window.removeEventListener('storage', storage)
    }
  }, [pathname])
  return null
}
