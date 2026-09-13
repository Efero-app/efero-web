'use client'

import { useState } from 'react'
import Link from '@/components/SiteLink'
import { AnimatedSection } from '@/components/AnimatedSection'
import { DEMO_LINK } from '@/lib/links'
import {
  CORE_PACKAGE_FEATURES,
  OPTIONAL_MODULES,
  PRICING_FACTORS,
  PRICING_PROMISES,
  PRICING_TERMS,
} from '@/lib/pricing'

const included = [
  PRICING_TERMS.trial,
  PRICING_TERMS.setup,
  PRICING_TERMS.cancellation,
  PRICING_TERMS.support,
  'Norsk MVA og sikker lagring av bedriftsdata',
]

const faqItems = [
  {
    q: 'Hva koster Efero?',
    a: 'Prisen tilpasses det bedriften faktisk trenger: antall brukere, valgte arbeidsområder og eventuelle integrasjoner. Etter en kort behovsavklaring får dere en tydelig, skriftlig totalpris før dere bestemmer dere.',
  },
  {
    q: 'Hvorfor viser dere ikke én standardpris?',
    a: 'Håndverksbedrifter jobber forskjellig. Noen trenger først og fremst timer og planlegging, mens andre trenger tilbud, HMS, serviceoppfølging eller prosjektøkonomi. Behovsbasert prising gjør at dere slipper å betale for en unødvendig stor løsning.',
  },
  {
    q: 'Kan vi få hele systemet?',
    a: 'Ja. Hvis dere ønsker hele Efero, setter vi opp en samlet løsning og gir dere én fast totalpris basert på antall brukere og aktuelle integrasjoner.',
  },
  {
    q: 'Hva skjer etter 30 dager gratis?',
    a: 'Dere velger selv om dere vil fortsette. Vi sender en påminnelse før prøveperioden utløper, og det blir ingen automatisk belastning uten en aktiv avtale.',
  },
  {
    q: 'Kan løsningen endres senere?',
    a: 'Ja. Dere kan starte med det viktigste og utvide med flere brukere eller arbeidsområder når behovet endrer seg.',
  },
  {
    q: 'Er det bindingstid?',
    a: 'Nei. Efero faktureres månedlig og kan sies opp før neste faktureringsperiode. Det er ingen etableringsavgift for standard oppstart.',
  },
]

function Check() {
  return (
    <svg className="h-[18px] w-[18px] flex-shrink-0 text-eblue" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M3.5 9.5l4 4 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="mx-auto max-w-[720px]">
      {faqItems.map((item, index) => (
        <div key={item.q} className="border-b border-border">
          <button
            onClick={() => setOpen(open === index ? null : index)}
            className="flex w-full items-center justify-between gap-6 py-5 text-left"
            aria-expanded={open === index}
          >
            <span className="text-[16px] font-semibold text-navy">{item.q}</span>
            <svg className={`h-5 w-5 flex-shrink-0 text-slate transition-transform duration-200 ${open === index ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
              <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {open === index && <p className="pb-5 pr-10 text-[15px] leading-[1.7] text-slate">{item.a}</p>}
        </div>
      ))}
    </div>
  )
}

export default function Priser() {
  return (
    <>
      <section className="max-w-site mx-auto px-6 md:px-10 pt-20 md:pt-24 pb-16">
        <AnimatedSection eager>
          <nav aria-label="Brødsmuler" className="font-mono text-[12px] tracking-[0.08em] text-[#3d5c52] mb-8">
            <Link href="/" className="hover:text-ink">Hjem</Link>
            <span className="mx-2" aria-hidden> / </span>
            <span className="text-ink">Priser</span>
          </nav>
          <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#3d5c52] mb-[18px]">Behovsbasert prising</p>
          <h1 className="m-0 text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-medium text-ink max-w-[18ch] mb-7">
            Betal for det dere{' '}
            <em className="font-serif italic font-normal text-forest">faktisk trenger</em>
          </h1>
          <p className="m-0 text-[18px] md:text-[19px] leading-[1.55] text-[#2f4a41] max-w-[48ch]">
            Efero tilpasses arbeidsflyten, størrelsen og behovene deres. Dere får én tydelig totalpris før oppstart – uten unødvendige funksjoner eller overraskelser.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <Link href={DEMO_LINK} className="h-12 px-7 rounded-full bg-forest text-[#f5f7f5] text-[15px] font-medium inline-flex items-center hover:bg-ink transition-colors">Få et prisforslag</Link>
            <Link href="/#kontakt" className="h-12 px-7 rounded-full border border-[#b9c9c1] text-forest text-[15px] inline-flex items-center">Snakk med oss</Link>
          </div>
        </AnimatedSection>
      </section>

      <section className="border-y border-mist bg-[#eef2ef]">
        <div className="max-w-site mx-auto px-6 md:px-10 py-16 md:py-20">
          <AnimatedSection>
            <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#3d5c52] mb-[18px]">Slik settes prisen</p>
            <h2 className="m-0 text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.03em] font-medium text-ink max-w-[20ch]">En løsning tilpasset bedriften</h2>
            <p className="mt-5 text-[17px] leading-[1.55] text-[#2f4a41] max-w-[46ch]">En kort behovsavklaring er nok til at vi kan sette sammen riktig omfang og gi dere en forutsigbar totalpris.</p>
          </AnimatedSection>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-mist">
            {PRICING_FACTORS.map((factor, index) => (
              <AnimatedSection key={factor.name} delay={index * 70} className="bg-[#eef2ef]">
                <article className="p-8 md:p-10 h-full">
                  <p className="font-mono text-[12px] text-[#3d5c52] mb-5">0{index + 1}</p>
                  <h3 className="m-0 mb-3 text-[21px] font-medium text-ink">{factor.name}</h3>
                  <p className="m-0 text-[15px] leading-[1.6] text-[#2f4a41]">{factor.description}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRICING_PROMISES.map(promise => <li key={promise} className="flex items-start gap-2.5"><Check /><span className="text-[15px] leading-[1.55] text-[#2f4a41]">{promise}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="max-w-site mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-[88px]">
          <AnimatedSection>
            <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#3d5c52] mb-[18px]">Den daglige arbeidsflyten</p>
            <h2 className="m-0 text-[32px] md:text-[38px] leading-[1.08] tracking-[-0.03em] font-medium text-ink">Et solid utgangspunkt</h2>
            <p className="mt-5 text-[17px] leading-[1.55] text-[#2f4a41]">Vi starter med arbeidsflyten dere trenger i hverdagen og tilpasser løsningen rundt den.</p>
            <ul className="mt-8 border-t border-mist">
              {CORE_PACKAGE_FEATURES.map(feature => <li className="flex items-center gap-3 py-4 border-b border-mist" key={feature}><Check /><span className="text-[15px] text-ink">{feature}</span></li>)}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-[#3d5c52] mb-[18px]">Kan utvides</p>
            <h2 className="m-0 text-[32px] md:text-[38px] leading-[1.08] tracking-[-0.03em] font-medium text-ink">Velg relevante arbeidsområder</h2>
            <div className="mt-8 border-t border-mist">
              {OPTIONAL_MODULES.map(module => <div className="py-4 border-b border-mist" key={module.name}><h3 className="m-0 text-[17px] font-medium text-ink">{module.name}</h3><p className="mt-1.5 text-[14px] leading-[1.55] text-[#2f4a41]">{module.description}</p></div>)}
            </div>
            <p className="mt-5 text-[14px] leading-[1.55] text-[#2f4a41]">Ingenting aktiveres før pris og omfang er bekreftet skriftlig.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="border-y border-mist bg-[#eef2ef]">
        <div className="max-w-site mx-auto px-6 md:px-10 py-16 md:py-20">
          <AnimatedSection>
            <h2 className="m-0 mb-9 text-[32px] md:text-[36px] leading-[1.1] tracking-[-0.03em] font-medium text-ink">Dette er alltid med</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
            {included.map((item, index) => <AnimatedSection key={item} delay={index * 40}><div className="flex items-start gap-3"><Check /><span className="text-[15px] leading-[1.55] text-[#2f4a41]">{item}</span></div></AnimatedSection>)}
          </div>
        </div>
      </section>

      <section className="max-w-site mx-auto px-6 md:px-10 py-20 md:py-24">
        <AnimatedSection>
          <h2 className="m-0 mb-10 text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.03em] font-medium text-ink max-w-[18ch]">Ofte stilte spørsmål om pris</h2>
        </AnimatedSection>
        <PricingFAQ />
      </section>

      <section className="bg-forest text-[#e4ece8]">
        <div className="max-w-site mx-auto px-6 md:px-10 py-20 md:py-24 flex flex-wrap items-end justify-between gap-10">
          <AnimatedSection>
            <h2 className="m-0 text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.03em] font-medium text-[#f5f7f5] max-w-[16ch]">Få en pris tilpasset bedriften</h2>
            <p className="mt-5 m-0 text-[16px] leading-[1.6] text-[#e4ece8] max-w-[42ch]">Fortell hvor mange dere er og hvilke arbeidsområder som er viktigst. Vi viser det relevante og sender en tydelig totalpris.</p>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <Link href={DEMO_LINK} className="h-[52px] px-8 rounded-full bg-[#f5f7f5] text-ink text-[15px] font-medium inline-flex items-center hover:bg-white transition-colors">Book en kort gjennomgang</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
