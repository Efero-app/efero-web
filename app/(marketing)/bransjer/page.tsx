import Link from '@/components/SiteLink'
import { AnimatedSection } from '@/components/AnimatedSection'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'
import { DEMO_LINK } from '@/lib/links'
import type { Metadata } from 'next'
import { LandingCards } from '@/components/LandingCards'
import { industryPages } from '@/lib/landing-pages'

export const metadata: Metadata = pageMeta({
  title: 'For håndverksbransjer',
  description:
    'Efero for rørleggere, elektrikere, snekkere, malere og VVS. Ett ordresystem for jobber, timer, tilbud, HMS og faktura — bygget for norske håndverkere.',
  path: '/bransjer',
  keywords: [
    'rørlegger program',
    'elektriker app',
    'snekker jobbstyring',
    'VVS program',
    'håndverker faktura',
  ],
})

const trades = [
  {
    title: 'Rørleggere & VVS',
    text: 'Serviceordrer, periodisk vedlikehold, bilder før/etter og faktura uten Excel-kaos.',
  },
  {
    title: 'Elektrikere',
    text: 'Jobber, materialer, sjekklister og dokumentasjon samlet — også ute hos kunden.',
  },
  {
    title: 'Snekkere & tømrere',
    text: 'Tilbud, endringer, timer og oppfølging på ett sted for kontor og montører.',
  },
  {
    title: 'Malere & overflate',
    text: 'Hold oversikt over flere småjobber, bilder og hva som gjenstår å fakturere.',
  },
  {
    title: 'Service & vedlikehold',
    text: 'Planlegg gjentakende oppdrag og hold utstyrshistorikk hos hver kunde.',
  },
  {
    title: 'Blandede håndverksfirma',
    text: 'Ett system for hele teamet — uansett fag — med felles kunder og fakturaflyt.',
  },
]

export default function BransjerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Hjem', path: '/' },
              { name: 'Bransjer', path: '/bransjer' },
            ])
          ),
        }}
      />

      <section className="max-w-site mx-auto px-6 md:px-10 pt-20 md:pt-24 pb-14">
        <AnimatedSection eager>
          <nav aria-label="Brødsmuler" className="font-mono text-[12px] tracking-[0.08em] text-[#3d5c52] mb-8">
            <Link href="/" className="hover:text-ink">Hjem</Link>
            <span className="mx-2" aria-hidden> / </span>
            <span className="text-ink">Bransjer</span>
          </nav>
          <h1 className="m-0 text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-medium text-ink max-w-[18ch] mb-6">
            Bygget for norske håndverksfag
          </h1>
          <p className="m-0 text-[18px] leading-[1.55] text-[#2f4a41] max-w-[48ch]">
            Samme enkle system enten du er rørlegger, elektriker eller driver et blandet firma —
            med mobilvennlig arbeidsflyt for montørene og oversikt til kontoret.
          </p>
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-site px-6 pb-14 md:px-10">
        <h2 className="mb-8 text-[30px] font-medium tracking-tight">En arbeidsflyt fra ditt fag</h2>
        <LandingCards pages={industryPages} />
      </section>

      <section className="border-y border-mist bg-[#eef2ef]" aria-label="Bransjer Efero passer for">
        <div className="max-w-site mx-auto px-6 md:px-10 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-mist">
          {trades.map((t, i) => (
            <AnimatedSection key={t.title} delay={i * 50} className="bg-[#eef2ef]">
              <article className="p-8 h-full">
                <h2 className="m-0 mb-3 text-[20px] font-medium text-ink">{t.title}</h2>
                <p className="m-0 text-[15px] leading-[1.6] text-[#2f4a41]">{t.text}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="max-w-site mx-auto px-6 md:px-10 py-20">
        <AnimatedSection>
          <h2 className="m-0 mb-4 text-[32px] font-medium text-ink tracking-tight">
            Vil du se det for ditt fag?
          </h2>
          <p className="m-0 mb-8 text-[17px] text-[#2f4a41] max-w-[42ch]">
            Se mer under{' '}
            <Link href="/funksjoner" className="text-forest underline underline-offset-2">
              funksjoner
            </Link>{' '}
            eller book en kort demo.
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
