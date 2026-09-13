import Link from '@/components/SiteLink'
import { DashboardMockup } from './AppMockup'

export function Hero() {
  return (
    <section className="pt-28 pb-20 bg-lgray overflow-hidden">
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-eblue/10 text-eblue rounded-full px-4 py-1.5 text-[13px] font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-eblue inline-block"/>
              Bygget for norske håndverkere
            </div>

            <h1 className="text-[52px] md:text-[60px] font-bold leading-[1.1] text-navy mb-5 tracking-tight">
              Jobb enkelt.<br />Fakturer raskt.
            </h1>

            <p className="text-[19px] text-slate leading-relaxed mb-8 max-w-[480px]">
              Efero samler jobber, team og fakturering i én app.
              Fra kundetelefon til betalt faktura — uten papir og Excel.
            </p>

            <div className="flex flex-wrap gap-3 mb-7">
              <Link
                href="/#kom-i-gang"
                className="h-[52px] px-7 rounded-btn bg-navy text-white text-[15px] font-semibold flex items-center hover:bg-charcoal transition-colors"
              >
                Start gratis prøveperiode →
              </Link>
              <Link
                href="#"
                className="h-[52px] px-7 rounded-btn border-2 border-navy text-navy text-[15px] font-semibold flex items-center hover:bg-navy hover:text-white transition-colors"
              >
                Last ned appen
              </Link>
            </div>

            <ul className="flex flex-col sm:flex-row gap-3 text-[14px] text-slate">
              {['30 dager gratis uten betalingskort', 'Personlig oppstart inkludert', 'Ingen bindingstid'].map(t => (
                <li key={t} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — dashboard mockup */}
          <div className="animate-fade-up delay-200 w-full">
            <DashboardMockup />
          </div>

        </div>
      </div>
    </section>
  )
}
