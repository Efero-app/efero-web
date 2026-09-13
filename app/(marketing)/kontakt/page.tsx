import Link from '@/components/SiteLink'
import { HomeContactForm } from '@/components/HomeContactForm'
import { AnimatedSection } from '@/components/AnimatedSection'
import { breadcrumbSchema, pageMeta, SITE_EMAIL } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = pageMeta({
  title: 'Kontakt',
  description:
    'Ta kontakt med Efero. Vi svarer innen én arbeidsdag og hjelper håndverksbedrifter i gang med oppdrag, tilbud og fakturaflyt.',
  path: '/kontakt',
  keywords: ['kontakt efero', 'demo håndverker app', 'support efero'],
})

export default function KontaktPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Hjem', path: '/' },
              { name: 'Kontakt', path: '/kontakt' },
            ])
          ),
        }}
      />

      <section className="max-w-site mx-auto px-6 md:px-10 pt-20 md:pt-24 pb-10">
        <AnimatedSection eager>
          <nav aria-label="Brødsmuler" className="font-mono text-[12px] tracking-[0.08em] text-[#3d5c52] mb-8">
            <Link href="/" className="hover:text-ink">Hjem</Link>
            <span className="mx-2" aria-hidden> / </span>
            <span className="text-ink">Kontakt</span>
          </nav>
          <h1 className="m-0 text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-medium text-ink max-w-[16ch] mb-6">
            Ta kontakt med oss
          </h1>
          <p className="m-0 text-[18px] leading-[1.55] text-[#2f4a41] max-w-[46ch]">
            Book en demo, still spørsmål eller spør om onboarding. Skriv til{' '}
            <a href={`mailto:${SITE_EMAIL}`} className="text-forest underline underline-offset-2">
              {SITE_EMAIL}
            </a>{' '}
            — eller bruk skjemaet under.
          </p>
        </AnimatedSection>
      </section>

      <HomeContactForm />
    </>
  )
}
