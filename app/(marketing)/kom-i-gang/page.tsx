import Link from '@/components/SiteLink'
import { AnimatedSection } from '@/components/AnimatedSection'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'
import { DEMO_LINK } from '@/lib/links'
import type { Metadata } from 'next'

export const metadata: Metadata = pageMeta({
  title: 'Kom i gang',
  description:
    'Slik kommer håndverksbedrifter i gang med Efero: book demo, prøv i 30 dager og få oversikt over kunder, oppdrag, tilbud og faktura.',
  path: '/kom-i-gang',
  keywords: ['komme i gang efero', 'håndverker program oppstart', 'efero onboarding'],
})

const steps = [
  {
    num: '01',
    title: 'Book en kort demo',
    text: 'Vi viser hvordan Efero passer for ditt fag — rør, elektro, snekker eller blandet firma. Ingen forpliktelse.',
  },
  {
    num: '02',
    title: 'Prøv i 30 dager',
    text: 'Sett opp kunder og oppdrag, inviter medarbeidere, og se tilbud og faktura i samme system.',
  },
  {
    num: '03',
    title: 'Kjør hele arbeidsdagen',
    text: 'Kontoret planlegger og fakturerer. Montørene fører timer, bilder og rapporter ute. Kundene får ryddige tilbud.',
  },
]

export default function KomIGangPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Hjem', path: '/' },
              { name: 'Kom i gang', path: '/kom-i-gang' },
            ])
          ),
        }}
      />

      <section className="max-w-site mx-auto px-6 md:px-10 pt-20 md:pt-24 pb-14">
        <AnimatedSection eager>
          <nav aria-label="Brødsmuler" className="font-mono text-[12px] tracking-[0.08em] text-[#3d5c52] mb-8">
            <Link href="/" className="hover:text-ink">Hjem</Link>
            <span className="mx-2" aria-hidden> / </span>
            <span className="text-ink">Kom i gang</span>
          </nav>
          <h1 className="m-0 text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-medium text-ink max-w-[16ch] mb-6">
            Fra første demo til første faktura
          </h1>
          <p className="m-0 text-[18px] leading-[1.55] text-[#2f4a41] max-w-[48ch]">
            Efero er laget for å være enkelt å ta i bruk — også for team som ikke er glade i nye systemer.
          </p>
        </AnimatedSection>
      </section>

      <section className="border-y border-mist bg-[#eef2ef]" aria-label="Steg for å komme i gang">
        <div className="max-w-site mx-auto px-6 md:px-10 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-mist">
          {steps.map((s, i) => (
            <AnimatedSection key={s.num} delay={i * 60} className="bg-[#eef2ef]">
              <article className="p-8 md:p-10 h-full">
                <p className="font-mono text-[12px] tracking-[0.16em] text-[#3d5c52] mb-4">{s.num}</p>
                <h2 className="m-0 mb-3 text-[22px] font-medium text-ink">{s.title}</h2>
                <p className="m-0 text-[15px] leading-[1.6] text-[#2f4a41]">{s.text}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="max-w-site mx-auto px-6 md:px-10 py-20">
        <AnimatedSection>
          <h2 className="m-0 mb-4 text-[32px] font-medium text-ink tracking-tight">
            Klar for neste steg?
          </h2>
          <p className="m-0 mb-8 text-[17px] text-[#2f4a41] max-w-[44ch]">
            Les mer om{' '}
            <Link href="/funksjoner" className="text-forest underline underline-offset-2">
              funksjoner
            </Link>
            , se{' '}
            <Link href="/faq" className="text-forest underline underline-offset-2">
              vanlige spørsmål
            </Link>
            , eller ta kontakt.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={DEMO_LINK}
              className="h-12 px-7 rounded-full bg-forest text-[#f5f7f5] text-[15px] font-medium inline-flex items-center"
            >
              Book en demo
            </Link>
            <Link
              href="/kontakt"
              className="h-12 px-7 rounded-full border border-[#b9c9c1] text-forest text-[15px] inline-flex items-center"
            >
              Kontakt oss
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
