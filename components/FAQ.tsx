'use client'
import { useState } from 'react'

const items = [
  {
    q: 'Hva koster Efero?',
    a: 'Prisen tilpasses antall brukere, arbeidsområdene dere trenger og eventuelle integrasjoner. Etter en kort behovsavklaring får dere en tydelig, skriftlig totalpris før oppstart.',
  },
  {
    q: 'Trenger jeg å installere noe?',
    a: 'Nei. Efero fungerer i nettleseren på alle enheter. Mobilappen for iPhone og Android kommer snart.',
  },
  {
    q: 'Hvor mange teknikere kan jeg ha?',
    a: 'Efero kan tilpasses både små fagbedrifter og større team. Antall brukere inngår i prisforslaget, slik at dere får en løsning som passer dagens behov og kan utvides senere.',
  },
  {
    q: 'Hva skjer etter prøveperioden?',
    a: 'Du velger selv om du vil fortsette. Ingen automatisk trekk uten at du legger inn betalingskort.',
  },
  {
    q: 'Kan jeg prøve det uten å forplikte meg?',
    a: 'Ja. Du får 30 dager gratis uten betalingskort.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-white border-b border-border py-24 px-6">
      <div className="max-w-[720px] mx-auto">
        <h2 className="text-[36px] font-semibold text-navy tracking-tight text-center mb-14">
          Ofte stilte spørsmål
        </h2>

        <div>
          {items.map((item, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-6"
              >
                <span className="text-[16px] font-semibold text-navy">{item.q}</span>
                <svg
                  className={`w-5 h-5 text-slate flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}
                >
                  <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {open === i && (
                <p className="text-[15px] text-slate leading-[1.7] pb-5 pr-10">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
