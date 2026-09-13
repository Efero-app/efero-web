'use client'

import Link from '@/components/SiteLink'
import { useMemo, useState } from 'react'
import {
  getJobCheckResult,
  JOB_CHECK_QUESTIONS,
  type JobCheckAnswer,
  type JobCheckAnswers,
} from '@/lib/job-check'
import { captureBrowserAttribution, trackMarketingEvent } from '@/lib/marketing-attribution'

const answerOptions: Array<{ value: JobCheckAnswer; label: string; detail: string }> = [
  { value: 'yes', label: 'Ja', detail: 'Alltid på plass' },
  { value: 'sometimes', label: 'Noen ganger', detail: 'Ikke på alle jobber' },
  { value: 'no', label: 'Nei', detail: 'Dette må vi lete etter' },
]

type LeadForm = {
  name: string
  email: string
  company: string
  website: string
}

const emptyForm: LeadForm = { name: '', email: '', company: '', website: '' }

function CheckIcon({ done }: { done: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold ${
        done
          ? 'border-forest bg-forest text-white'
          : 'border-[#b9c9c1] bg-white text-[#789087]'
      }`}
    >
      {done ? '✓' : '–'}
    </span>
  )
}

export function JobCheck() {
  const [answers, setAnswers] = useState<JobCheckAnswers>({})
  const [step, setStep] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [form, setForm] = useState<LeadForm>(emptyForm)
  const [formState, setFormState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const result = useMemo(() => getJobCheckResult(answers), [answers])
  const question = JOB_CHECK_QUESTIONS[step]
  const answeredCount = Object.keys(answers).length

  const answer = (value: JobCheckAnswer) => {
    const nextAnswers = { ...answers, [question.id]: value }
    setAnswers(nextAnswers)

    if (step === JOB_CHECK_QUESTIONS.length - 1) {
      setShowResult(true)
      trackMarketingEvent('job_check_complete', captureBrowserAttribution())
      return
    }

    setStep(current => current + 1)
  }

  const restart = () => {
    setAnswers({})
    setStep(0)
    setShowResult(false)
    setFormState('idle')
    setErrorMessage('')
  }

  const setField = (field: keyof LeadForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(current => ({ ...current, [field]: event.target.value }))
  }

  const submitLead = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormState('loading')
    setErrorMessage('')

    const missingText = result.missing.length
      ? result.missing.map(item => item.short).join(', ')
      : 'Ingen'
    const attribution = captureBrowserAttribution()
    const sourceText = [attribution.utmSource, attribution.utmCampaign, attribution.utmContent]
      .filter(Boolean)
      .join(' / ') || 'Direkte eller ukjent'

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'jobbsjekk',
          team: '',
          start: '',
          message: `Jobbsjekk: ${result.score}/10. Må følges opp: ${missingText}. Kilde: ${sourceText}. Ønsker en kort, relevant visning av Efero.`,
        }),
      })

      if (response.ok) {
        trackMarketingEvent('job_check_submit', attribution)
        setFormState('ok')
        return
      }

      const body = await response.json().catch(() => null) as { error?: string } | null
      setErrorMessage(body?.error || 'Noe gikk galt. Prøv igjen eller send oss en e-post.')
      setFormState('error')
    } catch {
      setErrorMessage('Kunne ikke kontakte serveren. Prøv igjen eller send oss en e-post.')
      setFormState('error')
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
      <aside className="order-2 rounded-[24px] bg-ink p-7 text-white md:p-9 lg:order-1">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
          Én vanlig jobb
        </p>

        <ol className="relative m-0 flex list-none flex-col gap-1 p-0" aria-label="Veien fra tilbud til faktura">
          {JOB_CHECK_QUESTIONS.map((item, index) => {
            const selected = answers[item.id]
            const complete = selected === 'yes'
            const isCurrent = !showResult && index === step

            return (
              <li
                key={item.id}
                className={`relative flex items-center gap-4 rounded-[14px] px-3 py-4 transition-colors ${
                  isCurrent ? 'bg-white/10' : ''
                }`}
              >
                <CheckIcon done={complete} />
                <div className="min-w-0">
                  <span className="block text-[17px] font-medium">{item.short}</span>
                  {selected && selected !== 'yes' && (
                    <span className="mt-0.5 block text-[13px] text-[#b9c9c1]">Må sjekkes</span>
                  )}
                </div>
                {index < JOB_CHECK_QUESTIONS.length - 1 && (
                  <span className="absolute left-[26px] top-[49px] h-[14px] w-px bg-white/20" aria-hidden="true" />
                )}
              </li>
            )
          })}
        </ol>

        <div className="mt-8 border-t border-white/15 pt-6">
          <p className="m-0 text-[14px] leading-6 text-white/70">
            Når alt ligger på samme jobb, slipper du å lete før fakturaen lages.
          </p>
        </div>
      </aside>

      <section className="order-1 rounded-[24px] border border-mist bg-white p-7 shadow-[0_22px_70px_rgba(0,40,31,0.08)] md:p-10 lg:order-2">
        {!showResult ? (
          <div aria-live="polite">
            <div className="mb-10 flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#52675f]">
                Spørsmål {step + 1} av {JOB_CHECK_QUESTIONS.length}
              </span>
              <div className="h-1.5 w-28 overflow-hidden rounded-full bg-[#e5ece9]" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-forest transition-[width] duration-300"
                  style={{ width: `${(answeredCount / JOB_CHECK_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="m-0 max-w-[18ch] text-[clamp(32px,5vw,54px)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">
              {question.question}
            </h2>

            <div className="mt-10 grid gap-3">
              {answerOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => answer(option.value)}
                  className="group flex min-h-[74px] w-full items-center justify-between rounded-[14px] border border-mist px-5 text-left transition hover:border-forest hover:bg-[#f0f5f2] focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
                >
                  <span>
                    <span className="block text-[18px] font-medium text-ink">{option.label}</span>
                    <span className="mt-1 block text-[13px] text-[#52675f]">{option.detail}</span>
                  </span>
                  <span className="text-[22px] text-[#789087] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(current => Math.max(0, current - 1))}
                className="mt-7 min-h-11 text-[14px] font-medium text-forest underline decoration-[#9bb4aa] underline-offset-4"
              >
                ← Forrige spørsmål
              </button>
            )}
          </div>
        ) : (
          <div aria-live="polite">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[#52675f]">Resultatet</p>
            <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
              <span className="text-[70px] font-medium leading-none tracking-[-0.055em] text-forest">{result.score}</span>
              <span className="pb-2 text-[17px] text-[#52675f]">av 10</span>
            </div>
            <h2 className="mb-3 mt-7 text-[38px] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
              {result.title}
            </h2>
            <p className="m-0 max-w-[48ch] text-[17px] leading-7 text-[#2f4a41]">{result.text}</p>

            {result.missing.length > 0 && (
              <div className="my-8 rounded-[16px] bg-[#eef2ef] p-5">
                <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-forest">Gjør dette først</p>
                <ul className="m-0 list-none space-y-2 p-0">
                  {result.missing.map(item => (
                    <li key={item.id} className="flex gap-3 text-[15px] leading-6 text-ink">
                      <span aria-hidden="true" className="text-forest">→</span>
                      {item.fix}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {formState === 'ok' ? (
              <div className="mt-8 rounded-[16px] border border-[#a9c6b9] bg-[#f0f6f2] p-6">
                <p className="m-0 text-[20px] font-medium text-ink">Takk – vi tar kontakt.</p>
                <p className="mb-0 mt-2 text-[15px] leading-6 text-[#2f4a41]">
                  Vi bruker resultatet til å vise bare den delen av Efero som er relevant for dere.
                </p>
              </div>
            ) : (
              <form onSubmit={submitLead} className="mt-8 border-t border-mist pt-8">
                <h3 className="m-0 text-[23px] font-medium text-ink">Vil du se en enklere måte?</h3>
                <p className="mb-6 mt-2 text-[14px] leading-6 text-[#52675f]">
                  {result.missing.length > 0
                    ? 'Legg igjen kontaktinformasjonen. Vi viser akkurat det dere mangler – på 15 minutter.'
                    : 'Legg igjen kontaktinformasjonen. Vi viser hvordan Efero holder hele flyten samlet – på 15 minutter.'}
                </p>

                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="job-check-website">Nettside</label>
                  <input id="job-check-website" value={form.website} onChange={setField('website')} tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-[12px] font-medium text-[#2f4a41]">
                    Navn *
                    <input
                      value={form.name}
                      onChange={setField('name')}
                      required
                      autoComplete="name"
                      className="mt-1.5 h-12 w-full rounded-[9px] border border-mist bg-white px-4 text-[15px] text-ink outline-none transition focus:border-forest"
                    />
                  </label>
                  <label className="text-[12px] font-medium text-[#2f4a41]">
                    Jobb-e-post *
                    <input
                      type="email"
                      value={form.email}
                      onChange={setField('email')}
                      required
                      autoComplete="email"
                      className="mt-1.5 h-12 w-full rounded-[9px] border border-mist bg-white px-4 text-[15px] text-ink outline-none transition focus:border-forest"
                    />
                  </label>
                </div>
                <label className="mt-4 block text-[12px] font-medium text-[#2f4a41]">
                  Bedrift
                  <input
                    value={form.company}
                    onChange={setField('company')}
                    autoComplete="organization"
                    className="mt-1.5 h-12 w-full rounded-[9px] border border-mist bg-white px-4 text-[15px] text-ink outline-none transition focus:border-forest"
                  />
                </label>

                {formState === 'error' && <p role="alert" className="mt-4 text-[13px] text-red-700">{errorMessage}</p>}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-forest px-7 text-[15px] font-medium text-white transition hover:bg-ink disabled:opacity-60"
                >
                  {formState === 'loading' ? 'Sender…' : 'Vis meg Efero'}
                </button>
                <p className="mb-0 mt-3 text-center text-[12px] leading-5 text-[#52675f]">
                  Ingen spam. Se hvordan vi behandler opplysninger i{' '}
                  <Link href="/personvern" className="underline underline-offset-2">personvernerklæringen</Link>.
                </p>
              </form>
            )}

            <button
              type="button"
              onClick={restart}
              className="mt-7 min-h-11 text-[14px] font-medium text-forest underline decoration-[#9bb4aa] underline-offset-4"
            >
              Ta sjekken på nytt
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
