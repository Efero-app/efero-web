'use client'
import { useState, useEffect } from 'react'
import Link from '@/components/SiteLink'
import { usePathname } from 'next/navigation'
import EferoLogo from './EferoLogo'
import { DEMO_LINK } from '@/lib/links'

const centerLinks = [
  { href: '/',            label: 'Hjem' },
  { href: '/funksjoner', label: 'Funksjoner' },
  { href: '/jobbsjekk',  label: 'Jobbsjekk' },
  { href: '/bransjer',   label: 'Bransjer' },
  { href: '/priser',     label: 'Priser' },
  { href: '/om-oss',     label: 'Om oss' },
  { href: '/kontakt',    label: 'Kontakt' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-lgray transition-[box-shadow,border-color] ${
        scrolled
          ? 'border-mist shadow-[0_1px_0_rgba(0,40,31,0.06)]'
          : 'border-transparent'
      }`}
    >
      <div className="max-w-site mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center shrink-0" aria-label="Efero hjem">
          <EferoLogo variant="dark" />
        </Link>

        <nav className="hidden xl:flex items-center gap-6 flex-1 justify-center" aria-label="Hovedmeny">
          {centerLinks.map(l => (
            <Link
              key={l.label}
              href={l.href}
              aria-current={pathname === l.href ? 'page' : undefined}
              className={`text-[15px] font-medium transition-colors hover:text-ink ${
                pathname === l.href ? 'text-ink underline decoration-forest/45 underline-offset-8' : 'text-slate'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <Link
            href={DEMO_LINK}
            className="h-11 px-5 rounded-full bg-ink text-[#f5f7f5] text-[14px] font-medium flex items-center hover:bg-forest transition-colors"
          >
            Book en demo
          </Link>
        </div>

        <button
          type="button"
          className="xl:hidden min-h-11 min-w-11 p-2 -mr-2 shrink-0 inline-flex items-center justify-center"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Lukk meny' : 'Åpne meny'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <div className="w-5 flex flex-col gap-[5px]">
            <span className={`h-[2px] bg-ink rounded transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`h-[2px] bg-ink rounded transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] bg-ink rounded transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="xl:hidden bg-lgray border-t border-mist px-6 py-5 flex flex-col gap-4">
          {centerLinks.map(l => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === l.href ? 'page' : undefined}
              className={`text-[16px] font-medium ${pathname === l.href ? 'text-forest underline underline-offset-4' : 'text-ink'}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={DEMO_LINK}
            onClick={() => setOpen(false)}
            className="mt-2 h-12 rounded-full bg-ink text-[#f5f7f5] text-[14px] font-medium flex items-center justify-center"
          >
            Book en demo
          </Link>
        </div>
      )}
    </header>
  )
}
