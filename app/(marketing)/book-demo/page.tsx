import type { Metadata } from 'next'
import Link from '@/components/SiteLink'
import { AnimatedSection } from '@/components/AnimatedSection'
import { DemoBookingForm } from '@/components/DemoBookingForm'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Book en demo',
  description: 'Book en tilpasset demo av Efero. Velg modulene bedriften trenger og fortell når dere ønsker å komme i gang.',
  path: '/book-demo',
  keywords: ['book demo efero', 'demo håndverkersystem', 'modulbasert håndverker app'],
})

export default async function BookDemoPage({ searchParams }: { searchParams?: Promise<{ partner?: string | string[] }> }) {
  const query = await searchParams
  const partner = typeof query?.partner === 'string' ? query.partner.slice(0, 32) : ''
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Hjem', path: '/' },
            { name: 'Book en demo', path: '/book-demo' },
          ])),
        }}
      />

      <section className="border-b border-mist bg-[radial-gradient(ellipse_at_top_right,rgba(0,76,58,0.10),transparent_55%)]">
        <div className="mx-auto max-w-site px-6 pb-14 pt-16 md:px-10 md:pb-20 md:pt-20">
          <AnimatedSection eager>
            <nav aria-label="Brødsmuler" className="mb-8 font-mono text-[12px] tracking-[0.08em] text-[#3d5c52]">
              <Link href="/" className="hover:text-ink">Hjem</Link>
              <span className="mx-2" aria-hidden="true"> / </span>
              <span className="text-ink">Book en demo</span>
            </nav>
            <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_0.72fr]">
              <div>
                <p className="mb-5 font-mono text-[12px] uppercase tracking-[0.16em] text-[#3d5c52]">Tilpasset deres arbeidsdag</p>
                <h1 className="m-0 max-w-[15ch] text-[clamp(40px,5.5vw,72px)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">
                  Se bare det dere faktisk trenger
                </h1>
              </div>
              <p className="m-0 max-w-[46ch] text-[17px] leading-7 text-[#2f4a41] lg:pb-1">
                Efero er modulbasert. Fortell hvilke deler av systemet som er aktuelle, så viser vi en kort demo uten å bruke tiden deres på resten.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="mx-auto grid max-w-site grid-cols-1 gap-10 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-[0.52fr_1fr] lg:gap-16">
        <AnimatedSection className="lg:sticky lg:top-[112px] lg:self-start">
          <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.12em] text-[#3d5c52]">Dette skjer videre</p>
          <ol className="space-y-5">
            {[
              ['01', 'Velg modulene som er aktuelle.'],
              ['02', 'Vi tar kontakt innen én arbeidsdag.'],
              ['03', 'Dere får en kort demo tilpasset bedriften.'],
            ].map(([number, text]) => (
              <li key={number} className="flex gap-4 border-t border-mist pt-5">
                <span className="font-mono text-[12px] text-[#3d5c52]">{number}</span>
                <span className="text-[15px] leading-6 text-ink">{text}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-[12px] bg-[#e8efeb] p-5">
            <p className="mb-1 text-[14px] font-semibold text-ink">Ingen forpliktelser</p>
            <p className="m-0 text-[13px] leading-5 text-[#466158]">Demoen er gratis. Dere velger selv om og når dere vil gå videre.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={80}>
          <DemoBookingForm initialPartner={partner} />
        </AnimatedSection>
      </section>
    </>
  )
}
