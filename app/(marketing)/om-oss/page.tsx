import Link from '@/components/SiteLink'
import { AnimatedSection } from '@/components/AnimatedSection'
import { DEMO_LINK } from '@/lib/links'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = pageMeta({
  title: 'Om oss',
  description:
    'Efero er laget for norske håndverkere som vil bruke tid på jobben, ikke på administrasjon. Les historien bak Efero.',
  path: '/om-oss',
  keywords: ['om efero', 'norsk håndverker software', 'efero historie'],
})

const values = [
  {
    num: '01',
    title: 'Enkelthet',
    text: 'Hvis en rørlegger i arbeidshansker ikke kan bruke det, er det for komplisert. Vi prioriterer enkelhet over alt annet.',
  },
  {
    num: '02',
    title: 'Ærlighet',
    text: 'Ingen skjulte kostnader. Du vet alltid hva du betaler.',
  },
  {
    num: '03',
    title: 'Norsk',
    text: 'Bygget for norske regler og norsk MVA. Vi forstår hvordan norske håndverkere driver bedrift.',
  },
]

export default function OmOss() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Hjem', path: '/' },
              { name: 'Om oss', path: '/om-oss' },
            ])
          ),
        }}
      />

      <section className="max-w-site mx-auto px-6 md:px-10 pt-20 md:pt-24 pb-16">
        <AnimatedSection eager>
          <nav aria-label="Brødsmuler" className="font-mono text-[12px] tracking-[0.08em] text-[#3d5c52] mb-8">
            <Link href="/" className="hover:text-ink">Hjem</Link>
            <span className="mx-2" aria-hidden> / </span>
            <span className="text-ink">Om oss</span>
          </nav>
          <h1 className="m-0 text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-medium text-ink max-w-[18ch] mb-7">
            Bygget for folk som jobber med hendene
          </h1>
          <p className="m-0 text-[18px] md:text-[19px] leading-[1.55] text-[#2f4a41] max-w-[48ch]">
            Vi er et norsk team som har sett håndverkere slite med administrasjon for lenge. Efero
            er løsningen vi alltid ønsket fantes.
          </p>
        </AnimatedSection>
      </section>

      <section className="border-y border-mist bg-white/70">
        <div className="max-w-site mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="max-w-2xl">
            <AnimatedSection>
              <h2 className="m-0 mb-8 text-[32px] md:text-[36px] leading-[1.1] tracking-[-0.03em] font-medium text-ink">
                Vår historie
              </h2>
            </AnimatedSection>
            <div className="flex flex-col gap-6 text-[17px] leading-[1.7] text-[#2f4a41]">
              <AnimatedSection delay={80}>
                <p className="m-0">
                  Det startet med en enkel observasjon: norske håndverkere er eksperter på faget
                  sitt, men bruker altfor mye tid på papirarbeid. Fakturaer i Excel, jobboversikt
                  på WhatsApp, og kunder som venter i ukevis på å betale.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={140}>
                <p className="m-0">
                  Vi bygget Efero fordi vi mente det måtte finnes en bedre måte. En app som er
                  enkel nok til å brukes på byggeplass, men kraftig nok til å samle oppdrag,
                  dokumentasjon og oppfølging i én arbeidsflyt.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <p className="m-0">
                  Målet vårt er at rørleggere, elektrikere, snekkere og andre håndverkere skal få
                  en ryddig arbeidsdag uten dobbeltregistrering og unødvendig papirarbeid. Derfor
                  utvikler vi Efero tett på de faktiske arbeidsflytene i norske håndverksbedrifter.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-site mx-auto px-6 md:px-10 py-20 md:py-24">
        <AnimatedSection>
          <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#3d5c52] mb-4">
            Verdier
          </p>
          <h2 className="m-0 mb-12 text-[32px] md:text-[36px] leading-[1.1] tracking-[-0.03em] font-medium text-ink">
            Våre verdier
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-mist">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 80} className="bg-lgray">
              <div className="p-8 md:p-10 h-full">
                <p className="font-mono text-[12px] text-[#3d5c52] mb-5">{v.num}</p>
                <h3 className="m-0 mb-3 text-[22px] font-medium text-ink">{v.title}</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-[#2f4a41]">{v.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="bg-forest text-[#e4ece8]">
        <div className="max-w-site mx-auto px-6 md:px-10 py-20 md:py-24 flex flex-wrap items-end justify-between gap-10">
          <AnimatedSection>
            <h2 className="m-0 text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.03em] font-medium text-[#f5f7f5] max-w-[16ch]">
              Bli med oss
            </h2>
            <p className="mt-5 m-0 text-[16px] text-[#e4ece8] max-w-[36ch]">
              Prøv Efero gratis i 30 dager. Vi hjelper deg personlig i gang. Eller se{' '}
              <Link href="/kom-i-gang" className="underline underline-offset-2 text-[#f5f7f5]">
                hvordan du kommer i gang
              </Link>
              .
            </p>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <Link
              href={DEMO_LINK}
              className="h-[52px] px-8 rounded-full bg-[#f5f7f5] text-ink text-[15px] font-medium inline-flex items-center hover:bg-white transition-colors"
            >
              Book en demo
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
