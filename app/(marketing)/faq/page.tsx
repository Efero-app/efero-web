import Link from '@/components/SiteLink'
import { AnimatedSection } from '@/components/AnimatedSection'
import { FaqAccordion } from '@/components/FaqAccordion'
import { breadcrumbSchema, faqSchema, pageMeta } from '@/lib/seo'
import { DEMO_LINK } from '@/lib/links'
import type { Metadata } from 'next'

const faqItems = [
  {
    q: 'Finnes Efero som app?',
    a: 'Mobilappen for iOS og Android kommer snart. Der skal montørene kunne føre timer, ta bilder, fylle ut sjekklister og skrive rapporter ute på jobb. Kontorløsningen brukes allerede i nettleseren.',
  },
  {
    q: 'Er Efero enkelt å komme i gang med?',
    a: 'Efero er laget for å være enkelt nok at eldre, ikke-tekniske ansatte kan bruke det. Kontoret bruker Efero direkte i nettleseren, uten tung installasjon. Mobilappen kommer snart til App Store og Google Play.',
  },
  {
    q: 'Hva koster Efero?',
    a: 'Prisen tilpasses antall brukere, arbeidsområdene dere trenger og eventuelle integrasjoner. Etter en kort behovsavklaring får dere en tydelig, skriftlig totalpris før oppstart.',
  },
  {
    q: 'Trenger jeg å installere noe på PC?',
    a: 'Nei. Kontoret bruker Efero direkte i nettleseren. Mobilappen for montører kommer snart til iPhone og Android.',
  },
  {
    q: 'Kan jeg prøve uten å forplikte meg?',
    a: 'Ja. Du får 30 dager gratis uten betalingskort. Det er ingen etableringsavgift eller bindingstid etterpå.',
  },
  {
    q: 'Støtter Efero norsk MVA og faktura?',
    a: 'Ja. Efero er bygget for norske håndverksbedrifter, med faktura, tilbud og dokumentasjon tilpasset norsk praksis.',
  },
]

export const metadata: Metadata = pageMeta({
  title: 'Ofte stilte spørsmål (FAQ)',
  description:
    'Svar på vanlige spørsmål om Efero: app for iOS/Android, priser, prøveperiode, faktura, MVA og hvordan håndverksbedrifter kommer i gang.',
  path: '/faq',
  keywords: ['efero faq', 'håndverker app spørsmål', 'efero pris', 'efero prøveperiode'],
})

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Hjem', path: '/' },
              { name: 'FAQ', path: '/faq' },
            ])
          ),
        }}
      />

      <section className="max-w-site mx-auto px-6 md:px-10 pt-20 md:pt-24 pb-12">
        <AnimatedSection eager>
          <nav aria-label="Brødsmuler" className="font-mono text-[12px] tracking-[0.08em] text-[#3d5c52] mb-8">
            <Link href="/" className="hover:text-ink">Hjem</Link>
            <span className="mx-2" aria-hidden> / </span>
            <span className="text-ink">FAQ</span>
          </nav>
          <h1 className="m-0 text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-medium text-ink max-w-[16ch] mb-6">
            Ofte stilte spørsmål
          </h1>
          <p className="m-0 text-[18px] leading-[1.55] text-[#2f4a41] max-w-[46ch]">
            Kort om app, oppstart, faktura og prøveperiode. Finner du ikke svaret?{' '}
            <Link href="/kontakt" className="text-forest underline underline-offset-2">
              Kontakt oss
            </Link>
            .
          </p>
        </AnimatedSection>
      </section>

      <section className="max-w-site mx-auto px-6 md:px-10 pb-20" aria-label="Spørsmål og svar">
        <FaqAccordion items={faqItems} />
      </section>

      <section className="bg-forest text-[#e4ece8]">
        <div className="max-w-site mx-auto px-6 md:px-10 py-16 flex flex-wrap items-center justify-between gap-8">
          <h2 className="m-0 text-[clamp(28px,3.5vw,40px)] font-medium text-[#f5f7f5] tracking-[-0.03em]">
            Klar for en demo?
          </h2>
          <Link
            href={DEMO_LINK}
            className="h-12 px-7 rounded-full bg-[#f5f7f5] text-ink text-[15px] font-medium inline-flex items-center"
          >
            Book en demo
          </Link>
        </div>
      </section>
    </>
  )
}
