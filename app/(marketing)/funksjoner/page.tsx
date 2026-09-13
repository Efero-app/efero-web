import Link from '@/components/SiteLink'
import { AnimatedSection } from '@/components/AnimatedSection'
import { DEMO_LINK } from '@/lib/links'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'
import type { Metadata } from 'next'
import { LandingCards } from '@/components/LandingCards'
import { featurePages } from '@/lib/landing-pages'

export const metadata: Metadata = pageMeta({
  title: 'Funksjoner for håndverkere – ordre, timer og tilbud',
  description:
    'Se hvordan Efero samler tilbud, jobber, timer, materialer, sjekklister, HMS og faktura i ett system — for kontoret, montørene og kundene.',
  path: '/funksjoner',
  keywords: [
    'efero funksjoner',
    'håndverker jobbstyring',
    'montørapp',
    'faktura håndverk',
    'HMS sjekklister',
  ],
})

const groups = [
  {
    id: 'kontoret',
    num: '01',
    title: 'For kontoret',
    intro: 'Ett sted for alt kontoret trenger for å holde jobbene i gang og pengene inn.',
    items: [
      'Hold kunder, jobber, ansatte og timeplaner organisert.',
      'Send tilbud, få godkjenninger, spor endringer og lag faktura.',
      'Følg timer, materialer, innkjøp og fakturerte beløp per jobb.',
      'Planlegg periodisk vedlikehold og hold oversikt over utstyr hos kundene.',
      'Få oversikt over hva som er gjort, forsinket, mangler eller trenger oppfølging.',
    ],
  },
  {
    id: 'montorene',
    num: '02',
    title: 'For montørene',
    intro: 'En mobilvennlig arbeidsflate, fylt ut mens jobben er fersk.',
    items: [
      'Se dagens jobber tydelig.',
      'Registrer timer, materialer, utgifter, bilder og notater mens du er på stedet.',
      'Fullfør sjekklister, risikovurderinger og servicerapporter.',
      'Meld avvik eller farlige forhold raskt.',
      'Mindre papirarbeid etter arbeidsdagen.',
    ],
  },
  {
    id: 'kundene',
    num: '03',
    title: 'For kundene',
    intro: 'Den delen av jobben kunden faktisk ser.',
    items: [
      'Motta profesjonelle tilbud, dokumenter og jobbinformasjon.',
      'Godkjenn tilbud eller endringer enkelt.',
      'Få tydelig dokumentasjon på utført arbeid.',
    ],
  },
]

const appCapabilities = [
  { title: 'Timeføring', text: 'Start, stopp og korriger timer på jobben.' },
  { title: 'Bilder', text: 'Dokumenter arbeidet før, under og etter.' },
  { title: 'Rapporter', text: 'Sjekklister, servicerapporter og avvik.' },
]

export default function FunksjonerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Hjem', path: '/' },
              { name: 'Funksjoner', path: '/funksjoner' },
            ])
          ),
        }}
      />

      <section className="max-w-site mx-auto px-6 md:px-10 pt-20 md:pt-24 pb-16">
        <AnimatedSection eager>
          <nav aria-label="Brødsmuler" className="font-mono text-[12px] tracking-[0.08em] text-[#3d5c52] mb-8">
            <Link href="/" className="hover:text-ink">Hjem</Link>
            <span className="mx-2" aria-hidden> / </span>
            <span className="text-ink">Funksjoner</span>
          </nav>
          <h1 className="m-0 text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-medium text-ink max-w-[18ch] mb-7">
            Alt dere trenger for hele arbeidsdagen
          </h1>
          <p className="m-0 text-[18px] md:text-[19px] leading-[1.55] text-[#2f4a41] max-w-[48ch]">
            Tilbud, jobber, timer, materialer, sjekklister og faktura på ett sted — fra
            kontorpulten til bilen til kundens innboks. Se også{' '}
            <Link href="/bransjer" className="text-forest underline underline-offset-2">bransjer</Link>
            {' '}og{' '}
            <Link href="/faq" className="text-forest underline underline-offset-2">FAQ</Link>.
          </p>
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-site px-6 pb-16 md:px-10">
        <h2 className="mb-8 text-[30px] font-medium tracking-tight">Se hvordan funksjonene brukes</h2>
        <LandingCards pages={featurePages} />
      </section>

      {groups.map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          className={`max-w-site mx-auto px-6 md:px-10 ${gi === 0 ? 'pb-8' : 'pt-[88px]'} ${
            gi === groups.length - 1 ? 'pb-8' : ''
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-[72px] items-start">
            <AnimatedSection className="lg:sticky lg:top-[120px]">
              <p className="font-mono text-[12px] tracking-[0.16em] text-[#3d5c52] mb-[18px]">
                {group.num}
              </p>
              <h2 className="m-0 mb-5 text-[36px] md:text-[42px] leading-[1.05] tracking-[-0.03em] font-medium text-ink">
                {group.title}
              </h2>
              <p className="text-[17px] leading-[1.55] text-[#2f4a41] max-w-[34ch] m-0">
                {group.intro}
              </p>
            </AnimatedSection>
            <div>
              {group.items.map((item, i) => (
                <AnimatedSection key={item} delay={Math.min(i, 4) * 70}>
                  <h3
                    className={`m-0 border-t border-mist py-[26px] text-[19px] md:text-[21px] leading-[1.4] font-normal text-ink ${
                      i === group.items.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    {item}
                  </h3>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="mt-[104px] border-y border-mist bg-[#eef2ef]">
        <div className="max-w-site mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="max-w-[720px]">
            <AnimatedSection>
              <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#3d5c52] mb-[18px]">
                Mobilappen kommer snart
              </p>
              <h2 className="m-0 mb-6 text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.03em] font-medium text-ink max-w-[22ch]">
                Hele jobben i lomma —{' '}
                <em className="font-serif italic font-normal text-forest">også uten kontor.</em>
              </h2>
              <p className="text-[18px] leading-[1.55] text-[#2f4a41] max-w-[46ch] mb-9">
                Når mobilappen lanseres, kan montørene føre timer, ta bilder og skrive rapporter
                direkte ute på jobb. Alt havner på riktig jobb i samme system som kontoret bruker.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-mist mb-9">
              {appCapabilities.map((cap, i) => (
                <AnimatedSection key={cap.title} delay={i * 80} className="bg-[#eef2ef]">
                  <div className={`py-5 ${i === 0 ? 'pr-5' : 'px-5'}`}>
                    <h3 className="m-0 mb-1.5 text-[17px] font-medium text-ink">{cap.title}</h3>
                    <p className="m-0 text-[15px] leading-[1.5] text-[#2f4a41]">{cap.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-site mx-auto px-6 md:px-10 py-[100px]">
        <AnimatedSection>
          <div className="flex flex-wrap items-end justify-between gap-10">
            <h2 className="m-0 text-[clamp(32px,4.4vw,56px)] leading-[1.02] tracking-[-0.035em] font-medium text-ink max-w-[18ch]">
              Klar til å se Efero i praksis?
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href={DEMO_LINK}
                className="h-14 px-[34px] rounded-full bg-forest text-[#f5f7f5] text-[17px] font-medium inline-flex items-center hover:bg-ink transition-colors"
              >
                Book en demo
              </Link>
              <Link
                href="/kom-i-gang"
                className="h-14 px-[34px] rounded-full border border-[#b9c9c1] text-forest text-[17px] inline-flex items-center"
              >
                Kom i gang
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
