import Link from 'next/link'
import { HomeContactForm } from '@/components/HomeContactForm'
import { AnimatedSection } from '@/components/AnimatedSection'
import { ScrollProgress } from '@/components/ScrollProgress'
import { DEMO_LINK } from '@/lib/links'

const trustPoints = [
  'Mindre jaging av folk på telefon, SMS og regneark.',
  'Færre tapte timer, materialer og fakturaer.',
  'Alt dokumentert for kvalitet, HMS og eventuelle tvister.',
  'Enkelt nok at eldre, ikke-tekniske ansatte kan bruke det.',
]

const officeFeatures = [
  'Hold kunder, jobber, ansatte og timeplaner organisert.',
  'Send tilbud, få godkjenninger, spor endringer og lag faktura.',
  'Se timer, materialer, innkjøp og lønnsomhet per jobb.',
  'Planlegg periodisk vedlikehold og hold oversikt over utstyr hos kundene.',
  'Få oversikt over hva som er gjort, forsinket, mangler eller trenger oppfølging.',
]

const techFeatures = [
  'Se dagens jobber tydelig.',
  'Registrer timer, materialer, utgifter, bilder og notater mens du er på stedet.',
  'Fullfør sjekklister, risikovurderinger og servicerapporter.',
  'Meld avvik eller farlige forhold raskt.',
  'Mindre papirarbeid etter arbeidsdagen.',
]

const customerFeatures = [
  'Motta profesjonelle tilbud, dokumenter og jobbinformasjon.',
  'Godkjenn tilbud eller endringer enkelt.',
  'Få tydelig dokumentasjon på utført arbeid.',
]

const businessPoints = [
  { letter: 'A', text: 'Alt dokumenteres skikkelig for kvalitet, HMS og fremtidige tvister.' },
  { letter: 'B', text: 'Færre tapte timer, materialer og fakturaer.' },
  { letter: 'C', text: 'Mindre jaging av folk på telefon, SMS og regneark.' },
  { letter: 'D', text: 'Enkelt nok at eldre, ikke-tekniske ansatte kan bruke det.' },
]

const appCapabilities = [
  { title: 'Timeføring', text: 'Start, stopp og korriger timer på jobben.' },
  { title: 'Bilder', text: 'Dokumenter arbeidet før, under og etter.' },
  { title: 'Rapporter', text: 'Sjekklister, servicerapporter og avvik.' },
]

function Em({ children }: { children: React.ReactNode }) {
  return (
    <em className="font-serif italic font-normal text-forest">
      {children}
    </em>
  )
}

type EditorialImageProps = {
  name: 'team-ved-servicebil' | 'planlegging-pa-kontoret' | 'mobil-pa-byggeplass'
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}

/**
 * The Cloudflare image fallback can return the original JPEG dimensions even
 * when Next requests a smaller variant. Pre-sized WebP sources keep the page
 * light and let the browser select the right file without a runtime service.
 */
function EditorialImage({ name, alt, sizes, className = '', priority = false }: EditorialImageProps) {
  const base = `/images/editorial/${name}`

  return (
    <img
      src={`${base}-1200.webp`}
      srcSet={`${base}-480.webp 480w, ${base}-768.webp 768w, ${base}-1200.webp 1200w`}
      sizes={sizes}
      alt={alt}
      width={1200}
      height={750}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  )
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <AnimatedSection key={item} delay={Math.min(i, 4) * 70}>
          <h3
            className={`m-0 border-t border-mist py-[26px] text-[19px] md:text-[21px] leading-[1.4] font-normal text-ink ${
              i === items.length - 1 ? 'border-b' : ''
            }`}
          >
            {item}
          </h3>
        </AnimatedSection>
      ))}
    </div>
  )
}

export function HomeContent() {
  return (
    <>
      <ScrollProgress />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,76,58,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(0,40,31,0.04),transparent_50%)]" />
        <div className="relative max-w-site mx-auto px-6 md:px-10 pt-20 md:pt-24 pb-16 md:pb-20">
          <div>
            <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#3d5c52] mb-10">
              Ordre- og timesystem for håndverksbedrifter
            </p>
            <h1 className="hero-lcp m-0 text-[clamp(40px,6vw,88px)] leading-[1.0] tracking-[-0.035em] font-medium text-ink max-w-[20ch] mb-0">
              Ett enkelt system for <Em>hele håndverksbedriften.</Em>
            </h1>
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-10 mt-14">
              <p className="m-0 max-w-[48ch] text-[19px] leading-[1.55] text-[#2f4a41]">
                Tilbud, jobber, timer, materialer, sjekklister og faktura på ett sted — fra
                kontorpulten til bilen til kundens innboks.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={DEMO_LINK}
                  className="h-[52px] px-7 rounded-full bg-forest text-[#f5f7f5] text-[16px] font-medium inline-flex items-center hover:bg-ink transition-colors"
                >
                  Book en demo
                </Link>
                <Link
                  href="/funksjoner"
                  className="h-[52px] px-7 rounded-full border border-[#b9c9c1] text-forest text-[16px] inline-flex items-center hover:border-forest hover:bg-[#e9efeb] transition-colors"
                >
                  Se funksjoner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ────────────────────────────────────────── */}
      <section aria-label="Kort oppsummert" className="border-y border-mist bg-[#eef2ef]">
        <div className="max-w-site mx-auto px-6 md:px-10 py-[34px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point, i) => (
            <AnimatedSection key={point} delay={i * 60}>
              <p className="text-[15px] leading-[1.5] text-[#2f4a41] m-0">{point}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── ARBEIDSDAGEN ──────────────────────────────────────── */}
      <section className="max-w-site mx-auto px-6 md:px-10 pt-16 md:pt-20">
        <figure className="m-0">
          <div className="relative overflow-hidden rounded-[22px] bg-[#dfe7e2] aspect-[3/2] md:aspect-[18/8]">
            <EditorialImage
              name="team-ved-servicebil"
              alt="Et håndverkerteam som planlegger arbeidsdagen sammen ved servicebilen"
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) calc(100vw - 80px), 1160px"
              className="object-cover object-center md:object-[center_42%]"
              priority
            />
          </div>
          <figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-[13px] leading-[1.5] text-[#52675f]">
            <span>Fra planlegging på kontoret til ferdig jobb hos kunden.</span>
            <span className="font-mono uppercase tracking-[0.1em]">Én arbeidsflyt</span>
          </figcaption>
        </figure>
      </section>

      {/* ── FOR KONTORET ───────────────────────────────────────── */}
      <section id="kontoret" className="max-w-site mx-auto px-6 md:px-10 pt-[104px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-[72px] items-start">
          <AnimatedSection className="lg:sticky lg:top-[120px]">
            <p className="font-mono text-[12px] tracking-[0.16em] text-[#3d5c52] mb-[18px]">01</p>
            <h2 className="m-0 mb-5 text-[42px] leading-[1.05] tracking-[-0.03em] font-medium text-ink">
              For kontoret
            </h2>
            <p className="text-[17px] leading-[1.55] text-[#2f4a41] max-w-[34ch] m-0">
              Ett sted for alt kontoret trenger for å holde jobbene i gang og pengene inn.
            </p>
            <figure className="m-0 mt-9 max-w-[480px]">
              <div className="relative overflow-hidden rounded-[18px] bg-[#dfe7e2] aspect-[3/2]">
                <EditorialImage
                  name="planlegging-pa-kontoret"
                  alt="Tre kolleger som planlegger oppdrag med laptop og arbeidstegninger"
                  sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 80px), 480px"
                  className="object-cover"
                />
              </div>
            </figure>
          </AnimatedSection>
          <FeatureList items={officeFeatures} />
        </div>
      </section>

      {/* ── FOR MONTØRENE ──────────────────────────────────────── */}
      <section id="montorene" className="max-w-site mx-auto px-6 md:px-10 pt-[104px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-[72px] items-start">
          <AnimatedSection className="lg:sticky lg:top-[120px]">
            <p className="font-mono text-[12px] tracking-[0.16em] text-[#3d5c52] mb-[18px]">02</p>
            <h2 className="m-0 mb-5 text-[42px] leading-[1.05] tracking-[-0.03em] font-medium text-ink">
              For montørene
            </h2>
            <p className="text-[17px] leading-[1.55] text-[#2f4a41] max-w-[34ch] m-0">
              Mobilvennlig arbeidsflyt, fylt ut mens jobben er fersk.
            </p>
          </AnimatedSection>
          <FeatureList items={techFeatures} />
        </div>
      </section>

      {/* ── APPEN ──────────────────────────────────────────────── */}
      <section
        id="appen"
        aria-label="Efero-appen for iOS og Android"
        className="mt-[104px] border-y border-mist bg-[#eef2ef]"
      >
        <div className="max-w-site mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.72fr] gap-14 lg:gap-20 items-center">
            <div className="max-w-[720px]">
              <AnimatedSection>
                <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#3d5c52] mb-[18px]">
                  Mobilappen kommer snart
                </p>
                <h2 className="m-0 mb-6 text-[clamp(34px,4vw,54px)] leading-[1.05] tracking-[-0.03em] font-medium text-ink max-w-[22ch]">
                  Hele jobben i lomma — <Em>også uten kontor.</Em>
                </h2>
                <p className="text-[18px] leading-[1.55] text-[#2f4a41] max-w-[46ch] mb-9">
                  Montørene fører timer, tar bilder og skriver rapporter direkte på mobilen mens de
                  er ute på jobb. Alt havner på riktig jobb i samme system som kontoret bruker.
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

              <AnimatedSection>
                <div
                  className="flex flex-wrap gap-3"
                  aria-label="Efero-appen kommer snart til iOS og Android"
                >
                  <span
                    aria-disabled="true"
                    className="inline-flex min-w-[176px] items-center rounded-full bg-forest px-6 py-3 text-[#f5f7f5]"
                  >
                    <span className="leading-tight">
                      <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-white/70">
                        Kommer snart på
                      </span>
                      <span className="block text-[16px] font-medium">App Store</span>
                    </span>
                  </span>
                  <span
                    aria-disabled="true"
                    className="inline-flex min-w-[176px] items-center rounded-full border border-[#b9c9c1] px-6 py-3 text-forest"
                  >
                    <span className="leading-tight">
                      <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#52675f]">
                        Kommer snart på
                      </span>
                      <span className="block text-[16px] font-medium">Google Play</span>
                    </span>
                  </span>
                </div>
                <p className="mt-4 mb-0 text-[14px] leading-[1.5] text-[#52675f]">
                  Vil du få beskjed når appen er klar?{' '}
                  <Link href="/venteliste" className="font-medium text-forest underline underline-offset-4">
                    Meld din interesse
                  </Link>
                  .
                </p>
              </AnimatedSection>
            </div>

            <AnimatedSection>
              <figure className="m-0 max-w-[460px] lg:ml-auto">
                <div className="relative overflow-hidden rounded-[22px] bg-[#dfe7e2] aspect-[4/5]">
                  <EditorialImage
                    name="mobil-pa-byggeplass"
                    alt="Håndverker som registrerer arbeid på mobilen ute på byggeplass"
                    sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 80vw, 420px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 text-[13px] leading-[1.5] text-[#52675f]">
                  Timer, bilder og rapporter registreres mens jobben er fersk.
                </figcaption>
              </figure>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FOR KUNDENE ────────────────────────────────────────── */}
      <section id="kundene" className="max-w-site mx-auto px-6 md:px-10 pt-[104px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-[72px] items-start">
          <AnimatedSection className="lg:sticky lg:top-[120px]">
            <p className="font-mono text-[12px] tracking-[0.16em] text-[#3d5c52] mb-[18px]">03</p>
            <h2 className="m-0 mb-5 text-[42px] leading-[1.05] tracking-[-0.03em] font-medium text-ink">
              For kundene
            </h2>
            <p className="text-[17px] leading-[1.55] text-[#2f4a41] max-w-[34ch] m-0">
              Den delen av jobben kunden faktisk ser.
            </p>
          </AnimatedSection>
          <FeatureList items={customerFeatures} />
        </div>
      </section>

      {/* ── FOR BEDRIFTEN ──────────────────────────────────────── */}
      <section id="bedriften" className="mt-[104px] bg-forest text-[#e4ece8]">
        <div className="max-w-site mx-auto px-6 md:px-10 py-[104px]">
          <AnimatedSection>
            <p className="font-mono text-[12px] tracking-[0.16em] text-[#c5ddd2] mb-[18px]">04</p>
            <h2 className="m-0 mb-16 text-[clamp(36px,4.6vw,64px)] leading-[1.02] tracking-[-0.03em] font-medium text-[#f5f7f5] max-w-[22ch]">
              For bedriften
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1d6350]">
            {businessPoints.map((point, i) => (
              <AnimatedSection key={point.letter} delay={i * 70} className="bg-forest">
                <div className="p-[38px] md:px-10">
                  <p className="m-0 mb-4 font-mono text-[12px] text-[#c5ddd2]">{point.letter}</p>
                  <h3 className="m-0 text-[22px] leading-[1.4] font-normal text-[#f5f7f5]">
                    {point.text}
                  </h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA (Claude copy) ────────────────────────────── */}
      <section className="max-w-site mx-auto px-6 md:px-10 py-[120px]">
        <AnimatedSection>
          <div className="flex flex-wrap items-end justify-between gap-12">
            <h2 className="m-0 text-[clamp(36px,4.8vw,66px)] leading-[1.0] tracking-[-0.035em] font-medium text-ink max-w-[20ch]">
              Ett system for hele <Em>arbeidsdagen.</Em>
            </h2>
            <div className="flex flex-col gap-4">
              <Link
                href={DEMO_LINK}
                className="h-14 px-[34px] rounded-full bg-forest text-[#f5f7f5] text-[17px] font-medium inline-flex items-center justify-center hover:bg-ink transition-colors"
              >
                Book en demo
              </Link>
              <span className="font-mono text-[12px] tracking-[0.1em] uppercase text-[#3d5c52]">
                Mobilappen kommer snart. Kontorløsningen fungerer på mobil og PC.
              </span>
              <p className="m-0 text-[14px] text-[#2f4a41]">
                <Link href="/bransjer" className="text-forest underline underline-offset-2">Bransjer</Link>
                {' · '}
                <Link href="/faq" className="text-forest underline underline-offset-2">FAQ</Link>
                {' · '}
                <Link href="/kom-i-gang" className="text-forest underline underline-offset-2">Kom i gang</Link>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── KONTAKT ────────────────────────────────────────────── */}
      <HomeContactForm />
    </>
  )
}
