'use client'
import { useState, useEffect } from 'react'
import Link from '@/components/SiteLink'

const STORAGE_KEY = 'efero_cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const existing = localStorage.getItem(STORAGE_KEY)
    if (!existing) {
      const t = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(t)
    }
  }, [])

  const dismiss = (value: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, value)
    setFading(true)
    setTimeout(() => setVisible(false), 300)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#00281f',
        borderTop: '2px solid #004c3a',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.3s ease',
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
            Vi bruker kun nødvendige informasjonskapsler for innlogging og sesjonshåndtering. Ingen sporings- eller markedsføringscookies.
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
            Godta
          </button>
          <button
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
            Avvis
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
