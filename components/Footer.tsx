import Link from '@/components/SiteLink'
import EferoLogo from './EferoLogo'

function AppBadges() {
  return (
    <div
      className="flex flex-wrap items-center gap-3"
      aria-label="Efero-appen kommer snart til iOS og Android"
    >
      <span className="inline-flex items-center h-10 px-4 rounded-[10px] bg-white/10 text-white/80 text-[12px] font-medium border border-white/15">
        Kommer snart på App Store
      </span>
      <span className="inline-flex items-center h-10 px-4 rounded-[10px] bg-white/10 text-white/80 text-[12px] font-medium border border-white/15">
        Kommer snart på Google Play
      </span>
    </div>
  )
}

const cols = [
  {
    label: 'Produkt',
    links: [
      { label: 'Funksjoner', href: '/funksjoner' },
      { label: 'Ordrestyring', href: '/funksjoner/ordrestyring' },
      { label: 'Timeføring', href: '/funksjoner/timeforing' },
      { label: 'Tilbud', href: '/funksjoner/tilbud' },
      { label: 'Bransjer', href: '/bransjer' },
      { label: 'For elektrikere', href: '/bransjer/elektriker' },
      { label: 'For rørleggere', href: '/bransjer/rorlegger' },
      { label: 'Kom i gang', href: '/kom-i-gang' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Priser', href: '/priser' },
      { label: 'Guider', href: '/ressurser' },
      { label: 'Venteliste', href: '/venteliste' },
    ],
  },
  {
    label: 'Selskap',
    links: [
      { label: 'Om oss', href: '/om-oss' },
      { label: 'Bli partner', href: '/partner' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'Personvern', href: '/personvern' },
      { label: 'Vilkår', href: '/vilkar' },
      { label: 'Databehandleravtale', href: '/databehandleravtale' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10">
      <div className="max-w-site mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          <div>
            <EferoLogo variant="white" />
            <p className="mt-4 text-[14px] text-white/75 leading-relaxed max-w-[220px]">
              Ett enkelt system for hele arbeidsdagen.
            </p>
            <a
              href="mailto:kontakt@efero.no"
              className="mt-3 block text-[13px] text-white/75 hover:text-white transition-colors"
            >
              kontakt@efero.no
            </a>
            <p className="mt-2 text-[13px] text-white/70 m-0">Norge · Man–fre 09–17</p>
          </div>

          {cols.map(col => (
            <div key={col.label}>
              <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-white/70 mb-5">
                {col.label}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[14px] text-white/80 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-10">
          <AppBadges />
          <p className="text-[13px] text-white/70 m-0">© 2026 Efero. Alle rettigheter forbeholdt.</p>
        </div>
      </div>
    </footer>
  )
}
