'use client'

import Link from '@/components/SiteLink'
import { useRef, useState } from 'react'
import { buildPartnerDemoMessage, DEMO_MODULES, START_TIMELINE_OPTIONS, TEAM_SIZE_OPTIONS, validateDemoBooking } from '@/lib/demo-booking'
import { isConfirmedIntake, shouldRetrySameIntake } from '@/lib/intake-response'

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  teamSize: string
  modules: string[]
  startTimeline: string
  message: string
  website: string
}

const initialForm: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  teamSize: '',
  modules: [],
  startTimeline: '',
  message: '',
  website: '',
}

const inputClass = 'w-full min-h-12 rounded-[10px] border border-[#b9c9c1] bg-white px-4 text-[16px] text-ink placeholder:text-[#5a7268] outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/15'
const labelClass = 'text-[13px] font-semibold text-ink'

export function DemoBookingForm({ initialPartner = '' }: { initialPartner?: string }) {
  const [form, setForm] = useState<FormState>(initialForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [partnerCode, setPartnerCode] = useState(initialPartner)
  const [organizationNumber, setOrganizationNumber] = useState('')
  const [partnerConsent, setPartnerConsent] = useState(false)
  const [uncertain, setUncertain] = useState(false)
  const partnerOperation = useRef<string | null>(null)

  const updateField = (field: keyof FormState, value: string) => {
    setForm(current => ({ ...current, [field]: value }))
    setFieldErrors(current => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
    if (status === 'error') setStatus('idle')
  }

  const toggleModule = (moduleId: string) => {
    setForm(current => ({
      ...current,
      modules: current.modules.includes(moduleId)
        ? current.modules.filter(id => id !== moduleId)
        : [...current.modules, moduleId],
    }))
    setFieldErrors(current => {
      if (!current.modules) return current
      const next = { ...current }
      delete next.modules
      return next
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    if (partnerCode.trim() && !partnerOperation.current) {
      const validation = validateDemoBooking(form)
      if (!validation.ok) { setFieldErrors(validation.errors); setStatus('error'); setErrorMessage('Kontroller feltene.'); return }
      const message = buildPartnerDemoMessage(validation.data)
      if (form.message.trim().length > 1500 || message.length > 2000) {
        setFieldErrors({ message: 'Bruk maksimalt 1500 tegn når du oppgir partnerkode.' })
        setStatus('error'); setErrorMessage('Kort ned meldingen før du sender.'); return
      }
      if (!/^[A-Z0-9][A-Z0-9-]{2,31}$/.test(partnerCode.trim().toUpperCase()) || !/^\d{9}$/.test(organizationNumber) || !partnerConsent) {
        setStatus('error'); setErrorMessage('Kontroller partnerkoden, skriv ni sifre i organisasjonsnummeret og godta at vi kontakter deg.'); return
      }
      partnerOperation.current = JSON.stringify({ clientOperationId: crypto.randomUUID(),
        partnerCode: partnerCode.trim().toUpperCase(), organizationNumber,
        name: validation.data.name, company: validation.data.company, email: validation.data.email,
        phone: validation.data.phone, consent: true, website: validation.data.website,
        message,
      })
    }

    setStatus('sending')
    setFieldErrors({})
    setErrorMessage('')

    try {
      const response = await fetch(partnerOperation.current ? '/api/partners/referrals' : '/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: partnerOperation.current ?? JSON.stringify(form),
      })
      const result = await response.json().catch(() => ({})) as {
        error?: string
        fields?: Record<string, string>
      }

      if (!response.ok || !isConfirmedIntake(result)) {
        if (partnerOperation.current) {
          const retrySame = shouldRetrySameIntake(response.status)
          setUncertain(retrySame)
          if (!retrySame) partnerOperation.current = null
        }
        setFieldErrors(result.fields ?? {})
        setErrorMessage(result.error || 'Kunne ikke sende forespørselen. Prøv igjen.')
        setStatus('error')
        return
      }

      setStatus('success')
      partnerOperation.current = null
      setUncertain(false)
    } catch {
      if (partnerOperation.current) setUncertain(true)
      setErrorMessage('Vi fikk ikke kontakt med serveren. Kontroller nettet og prøv igjen.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[18px] border border-[#b9c9c1] bg-white p-8 md:p-12 text-center" role="status">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#dcebe4] text-forest">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mb-3 text-[28px] font-medium tracking-tight text-ink">Takk – forespørselen er sendt</h2>
        <p className="mx-auto mb-7 max-w-[46ch] text-[16px] leading-7 text-[#2f4a41]">
          Vi tar kontakt innen én arbeidsdag for å finne et tidspunkt og tilpasse demoen til bedriften deres.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initialForm)
            setOrganizationNumber('')
            setPartnerConsent(false)
            setStatus('idle')
          }}
          className="min-h-12 rounded-full border border-[#b9c9c1] px-6 text-[15px] font-medium text-forest transition hover:border-forest hover:bg-[#eef2ef]"
        >
          Send en ny forespørsel
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[18px] border border-[#b9c9c1] bg-white p-6 md:p-10" aria-label="Book en demo">
      <fieldset disabled={status === 'sending' || uncertain}><legend className="sr-only">Demoforespørsel</legend>
      <div className="mb-9">
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#3d5c52]">1 · Kontaktinformasjon</p>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Fullt navn" htmlFor="demo-name" error={fieldErrors.name} required>
            <input id="demo-name" className={inputClass} value={form.name} onChange={event => updateField('name', event.target.value)} autoComplete="name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? 'demo-name-error' : undefined} />
          </FormField>
          <FormField label="Bedriftsnavn" htmlFor="demo-company" error={fieldErrors.company} required>
            <input id="demo-company" className={inputClass} value={form.company} onChange={event => updateField('company', event.target.value)} autoComplete="organization" aria-invalid={Boolean(fieldErrors.company)} aria-describedby={fieldErrors.company ? 'demo-company-error' : undefined} />
          </FormField>
          <FormField label="E-post" htmlFor="demo-email" error={fieldErrors.email} required>
            <input id="demo-email" type="email" className={inputClass} value={form.email} onChange={event => updateField('email', event.target.value)} autoComplete="email" inputMode="email" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? 'demo-email-error' : undefined} />
          </FormField>
          <FormField label="Telefon" htmlFor="demo-phone" error={fieldErrors.phone} hint="Valgfritt">
            <input id="demo-phone" type="tel" className={inputClass} value={form.phone} onChange={event => updateField('phone', event.target.value)} autoComplete="tel" inputMode="tel" aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? 'demo-phone-error' : undefined} />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Hvor mange skal bruke Efero?" htmlFor="demo-team-size" error={fieldErrors.teamSize} required>
              <select id="demo-team-size" className={`${inputClass} cursor-pointer`} value={form.teamSize} onChange={event => updateField('teamSize', event.target.value)} aria-invalid={Boolean(fieldErrors.teamSize)} aria-describedby={fieldErrors.teamSize ? 'demo-team-size-error' : undefined}>
                <option value="">Velg størrelse på teamet</option>
                {TEAM_SIZE_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </FormField>
          </div>
        </div>
      </div>

      <fieldset className="mb-9">
        <legend className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#3d5c52]">2 · Hvilke moduler er aktuelle?</legend>
        <p className="mt-2 text-[14px] leading-6 text-[#2f4a41]">Velg én eller flere. Demoen tilpasses valgene deres.</p>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {DEMO_MODULES.map(module => {
            const selected = form.modules.includes(module.id)
            return (
              <label key={module.id} className={`flex min-h-[96px] cursor-pointer items-start gap-3 rounded-[12px] border p-4 transition ${selected ? 'border-forest bg-[#eef5f1] ring-1 ring-forest' : 'border-[#cfdbd5] hover:border-[#7f9b8f]'}`}>
                <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#004c3a]" checked={selected} onChange={() => toggleModule(module.id)} />
                <span>
                  <span className="block text-[15px] font-semibold text-ink">{module.label}</span>
                  <span className="mt-1 block text-[13px] leading-5 text-[#466158]">{module.description}</span>
                </span>
              </label>
            )
          })}
        </div>
        {fieldErrors.modules && <p id="demo-modules-error" className="mt-3 text-[13px] text-red-700">{fieldErrors.modules}</p>}
      </fieldset>

      <div className="mb-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#3d5c52]">3 · Oppstart og behov</p>
        <div className="mt-5 grid grid-cols-1 gap-5">
          <FormField label="Når ønsker dere å komme i gang?" htmlFor="demo-start" error={fieldErrors.startTimeline} required>
            <select id="demo-start" className={`${inputClass} cursor-pointer`} value={form.startTimeline} onChange={event => updateField('startTimeline', event.target.value)} aria-invalid={Boolean(fieldErrors.startTimeline)} aria-describedby={fieldErrors.startTimeline ? 'demo-start-error' : undefined}>
              <option value="">Velg ønsket oppstart</option>
              {START_TIMELINE_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </FormField>
          <FormField label="Noe vi bør vite før demoen?" htmlFor="demo-message" hint="Valgfritt" error={fieldErrors.message}>
            <textarea id="demo-message" rows={5} maxLength={partnerCode ? 1500 : 2000} className={`${inputClass} resize-y py-3`} value={form.message} onChange={event => updateField('message', event.target.value)} placeholder="Fortell gjerne om dagens arbeidsflyt, utfordringer eller systemer dere bruker." />
          </FormField>
        </div>
      </div>

      <div className="mb-8 space-y-4 rounded-xl border border-mist bg-[#eef5f1] p-5">
        <FormField label="Har noen anbefalt Efero?" htmlFor="demo-partner" hint="Partnerkode er valgfritt">
          <input id="demo-partner" className={inputClass} maxLength={32} value={partnerCode} onChange={event => setPartnerCode(event.target.value.toUpperCase())} />
        </FormField>
        {partnerCode && <>
          <p className="text-sm leading-6">Henvisningen knyttes til partnerkoden. Partneren kan få provisjon hvis dere blir kunde. Efero tar all oppfølging.</p>
          <FormField label="Organisasjonsnummer" htmlFor="demo-org" required><input id="demo-org" className={inputClass} inputMode="numeric" maxLength={9} value={organizationNumber} onChange={event => setOrganizationNumber(event.target.value.replace(/\s/g, ''))} /></FormField>
          <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" className="mt-1 size-5 shrink-0 accent-[#004c3a]" checked={partnerConsent} onChange={event => setPartnerConsent(event.target.checked)} /><span>Jeg samtykker til at Efero lagrer forespørselen med partnerkoden og kontakter meg om demoen.</span></label>
        </>}
      </div>
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="demo-website">Nettside</label>
        <input id="demo-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={event => updateField('website', event.target.value)} />
      </div>
      </fieldset>

      {status === 'error' && (
        <div className="mb-5 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800" role="alert">
          {errorMessage}{' '}
          <a href="mailto:kontakt@efero.no" className="font-semibold underline underline-offset-2">Send e-post i stedet</a>
        </div>
      )}

      <button type="submit" disabled={status === 'sending'} className="flex min-h-[54px] w-full items-center justify-center rounded-full bg-forest px-7 text-[16px] font-semibold text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-60">
        {status === 'sending' ? 'Sender forespørselen…' : uncertain ? 'Prøv samme innsending igjen' : 'Send demoforespørsel'}
      </button>
      <p className="mt-4 text-center text-[12px] leading-5 text-[#466158]">
        Ved å sende inn skjemaet godtar du at Efero kontakter deg om forespørselen. Se vår{' '}
        <Link href="/personvern" className="underline underline-offset-2 hover:text-ink">personvernerklæring</Link>.
      </p>
    </form>
  )
}

function FormField({ label, htmlFor, error, hint, required, children }: {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}{required && <span aria-hidden="true"> *</span>}
        {hint && <span className="ml-2 font-normal text-[#5a7268]">{hint}</span>}
      </label>
      {children}
      {error && <p id={`${htmlFor}-error`} className="text-[13px] text-red-700">{error}</p>}
    </div>
  )
}
