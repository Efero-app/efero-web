import type { Metadata } from 'next'
import { HomeContent } from '@/components/HomeContent'
import { pageMeta, softwareApplicationSchema, webPageSchema } from '@/lib/seo'

const description = 'Efero samler kunder, oppdrag, tilbud, timer, materialer, HMS og faktura for norske håndverksbedrifter – i ett enkelt system.'

export const metadata: Metadata = {
  ...pageMeta({
    title: 'Fagsystem for håndverkere – tilbud, timer og ordre | Efero',
    description,
    path: '/',
  }),
  title: {
    absolute: 'Fagsystem for håndverkere – tilbud, timer og ordre | Efero',
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            softwareApplicationSchema,
            webPageSchema({
              name: 'Fagsystem for håndverkere – tilbud, timer og ordre | Efero',
              description,
              path: '/',
            }),
          ]),
        }}
      />
      <HomeContent />
    </>
  )
}
