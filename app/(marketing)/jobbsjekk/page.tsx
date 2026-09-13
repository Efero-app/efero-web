import type { Metadata } from 'next'
import { JobCheck } from '@/components/JobCheck'
import { pageMeta, webPageSchema } from '@/lib/seo'

const description = 'Sjekk på 60 sekunder om jobben er klar for faktura. Fem enkle spørsmål om tilbud, timer, materialer, bilder og dokumentasjon.'

export const metadata: Metadata = pageMeta({
  title: 'Jobbsjekken — Er jobben klar for faktura?',
  description,
  path: '/jobbsjekk',
  keywords: [
    'jobbsjekk håndverker',
    'faktura håndverker',
    'timeføring håndverker',
    'tilbud håndverker',
  ],
})

export default function JobCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema({
            name: 'Jobbsjekken — Er jobben klar for faktura?',
            description,
            path: '/jobbsjekk',
          })),
        }}
      />
      <section className="relative overflow-hidden border-b border-mist bg-[#f5f7f5]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,rgba(0,76,58,0.11),transparent_38%)]" />
        <div className="relative mx-auto max-w-site px-6 pb-12 pt-10 md:px-10 md:pb-20 md:pt-20">
          <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.16em] text-[#3d5c52]">
            Jobbsjekken · 5 spørsmål · ca. 60 sekunder
          </p>
          <h1 className="m-0 max-w-[18ch] text-[clamp(42px,7vw,82px)] font-medium leading-[0.98] tracking-[-0.045em] text-ink">
            Er jobben klar for <em className="font-serif font-normal text-forest">faktura?</em>
          </h1>
          <p className="mb-0 mt-7 max-w-[48ch] text-[18px] leading-7 text-[#2f4a41] md:text-[20px]">
            Svar på fem enkle spørsmål. Du ser med én gang hva som er klart – og hva som mangler.
          </p>
        </div>
      </section>

      <section className="bg-[#eef2ef] px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-site">
          <JobCheck />
        </div>
      </section>
    </>
  )
}
