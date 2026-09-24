'use client'
import { useState, useEffect } from 'react'
import Link from '@/components/SiteLink'
import { ANALYTICS_CONSENT_KEY, CONSENT_SETTINGS, readAnalyticsConsent, saveAnalyticsConsent } from '@/lib/analytics-consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!readAnalyticsConsent())
    const open = () => setVisible(true)
    const storage = (event: StorageEvent) => {
      if (event.key === ANALYTICS_CONSENT_KEY || event.key === null) setVisible(!readAnalyticsConsent())
    }
    window.addEventListener(CONSENT_SETTINGS, open)
    window.addEventListener('storage', storage)
    return () => {
      window.removeEventListener(CONSENT_SETTINGS, open)
      window.removeEventListener('storage', storage)
    }
  }, [])

  const dismiss = (value: 'accepted' | 'declined') => {
    saveAnalyticsConsent(value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region" aria-label="Valg for informasjonskapsler"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#00281f',
        borderTop: '2px solid #004c3a',
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
      }}
        className="cookie-inner"
      >
        {/* Text */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Med ditt samtykke bruker vi Google Analytics til å måle besøk og demoforespørsler på efero.no. Du kan avslå analyse og bruke siden som vanlig. Endre valget når som helst under «Informasjonskapsler» nederst på siden.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4, margin: '4px 0 0' }}>
            Les mer i vår{' '}
            <Link href="/personvern" style={{ color: '#c5ddd2', textDecoration: 'underline' }}>
              personvernerklæring
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div className="cookie-buttons" style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => dismiss('accepted')}
            style={{
              height: 44,
              padding: '0 24px',
              backgroundColor: '#004c3a',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#003d2e')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#004c3a')}
          >
            Godta analyse
          </button>
          <button
            type="button"
            onClick={() => dismiss('declined')}
            style={{
              height: 44,
              padding: '0 24px',
              backgroundColor: 'transparent',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 600,
              border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
          >
            Avslå analyse
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .cookie-inner {
            padding: 16px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .cookie-buttons {
            flex-direction: column !important;
          }
          .cookie-buttons button {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}
