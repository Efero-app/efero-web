'use client'

import { useEffect } from 'react'
import { captureBrowserAttribution, trackMarketingEvent } from '@/lib/marketing-attribution'

export function MarketingAttribution() {
  useEffect(() => {
    const attribution = captureBrowserAttribution()
    trackMarketingEvent('landing_view', attribution)
  }, [])

  return null
}
