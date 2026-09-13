'use client'
import { useState } from 'react'
import { CONTACT_START_OPTIONS, CONTACT_TEAM_OPTIONS } from '@/lib/contact-request'

export function HomeContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', team: '', start: '', message: '', website: '' })
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setState('ok')
        return
      }

      const result = await res.json().catch(() => null) as { error?: string } | null
      setErrorMessage(result?.error || 'Noe gikk galt. Prøv igjen eller send oss en e-post direkte.')
      setState('error')
    } catch {
      setErrorMessage('Kunne ikke kontakte serveren. Prøv igjen eller send oss en e-post direkte.')
      setState('error')
    }
  }

  const inputCls = 'w-full h-12 border border-border rounded-[8px] px-4 text-[15px] text-charcoal bg-white placeholder:text-slate/40 focus:outline-none focus:border-eblue transition-colors'

  return (
    <section id="kontakt" className="bg-white border-b border-mist py-24 px-6 md:px-10">
      <div className="max-w-site mx-auto grid grid-cols-1 md:grid-cols-5 gap-16 items-start">

        {/* Left — 40% */}
        <div className="md:col-span-2">
          <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-eblue font-medium mb-4">Kontakt</p>
          <h2 className="text-[36px] md:text-[42px] font-semibold text-navy tracking-tight mb-5">
            Ta kontakt med oss
          </h2>
          <p className="text-[16px] text-slate leading-[1.8] mb-8">
            Svar innen én arbeidsdag på hverdager. Vi hjelper deg i gang med Efero.
          </p>

          <div className="flex flex-col gap-3 mb-8">
            <a href="mailto:kontakt@efero.no" className="text-[15px] text-forest underline underline-offset-2">
              kontakt@efero.no
            </a>
            <span className="text-[15px] text-[#2f4a41]">Svar innen 24 timer</span>
          </div>

          <div className="bg-white border border-border rounded-[12px] p-5">
            <p className="text-[13px] font-semibold text-navy mb-3">Det inkluderer:</p>
            <ul className="flex flex-col gap-2">
              {[
                'Gratis 30-dagers prøveperiode',
                'Oppsett og onboarding-hjelp',
                'Norsk support',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-[13px] text-slate">
                  <svg className="w-4 h-4 text-eblue flex-shrink-0" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — 60% */}
        <div className="md:col-span-3 bg-white rounded-[14px] border border-border p-9">
          {state === 'ok' ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[18px] font-semibold text-navy mb-2">Melding sendt!</p>
              <p className="text-[14px] text-slate">Vi svarer deg innen én arbeidsdag.</p>
            </div>
          ) : (
            <>
              <p className="text-[18px] font-semibold text-navy mb-1">La oss finne riktig løsning</p>
              <p className="text-[13px] text-slate mb-7">Tar under 1 minutt.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="contact-website">Nettside</label>
                  <input
                    id="contact-website"
                    value={form.website}
                    onChange={set('website')}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-[12px] font-medium text-[#2f4a41]">Navn *</label>
                  <input id="contact-name" className={inputCls} value={form.name} onChange={set('name')} placeholder="Kjetil Hansen" required autoComplete="name" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-[12px] font-medium text-[#2f4a41]">E-post *</label>
                  <input id="contact-email" type="email" className={inputCls} value={form.email} onChange={set('email')} placeholder="kjetil@vvs.no" required autoComplete="email" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-company" className="text-[12px] font-medium text-[#2f4a41]">Bedriftsnavn</label>
                  <input id="contact-company" className={inputCls} value={form.company} onChange={set('company')} placeholder="VVS Service AS" autoComplete="organization" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-team" className="text-[12px] font-medium text-[#2f4a41]">Antall teknikere</label>
                  <select id="contact-team" className={`${inputCls} cursor-pointer`} value={form.team} onChange={set('team')}>
                    <option value="">Velg antall</option>
                    {CONTACT_TEAM_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-start" className="text-[12px] font-medium text-[#2f4a41]">Når ønsker du å starte?</label>
                  <select id="contact-start" className={`${inputCls} cursor-pointer`} value={form.start} onChange={set('start')}>
                    <option value="">Velg tidspunkt</option>
                    {CONTACT_START_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-[12px] font-medium text-[#2f4a41]">Melding</label>
                  <textarea
                    id="contact-message"
                    className="w-full border border-border rounded-[8px] px-4 py-3 text-[15px] text-charcoal bg-white placeholder:text-[#5a7268] focus:outline-none focus:border-eblue transition-colors resize-none"
                    rows={4}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Hva lurer du på?"
                  />
                </div>

                {state === 'error' && (
                  <p role="alert" className="text-[13px] text-red-600">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="h-[52px] w-full rounded-[10px] bg-eblue text-white text-[15px] font-semibold hover:bg-[#003d2e] transition-colors disabled:opacity-60 mt-2"
                >
                  {state === 'loading' ? 'Sender…' : 'Send melding'}
                </button>

                <p className="text-[13px] text-slate text-center flex items-center justify-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Svar innen én arbeidsdag
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
