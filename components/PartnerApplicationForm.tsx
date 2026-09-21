'use client'

import { useRef, useState } from 'react'
import Link from '@/components/SiteLink'
import { isConfirmedIntake, shouldRetrySameIntake } from '@/lib/intake-response'

const inputClass = 'w-full min-h-12 rounded-[10px] border border-[#b9c9c1] bg-white px-4 text-[16px] text-ink outline-none focus:border-forest focus:ring-2 focus:ring-forest/15'
export function PartnerApplicationForm() {
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [uncertain, setUncertain] = useState(false)
  const [message, setMessage] = useState('')
  const pending = useRef<string | null>(null)
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    if (!pending.current) {
      const form = new FormData(event.currentTarget)
      pending.current = JSON.stringify({ clientOperationId: crypto.randomUUID(),
        name: form.get('name'), email: form.get('email'), phone: form.get('phone'),
        company: form.get('company'), organizationNumber: String(form.get('organizationNumber') ?? '').trim() || null,
        channelUrl: form.get('channelUrl'), motivation: form.get('motivation'),
        consent: form.get('consent') === 'on', website: form.get('website') ?? '' })
    }
    setSending(true); setMessage('')
    try {
      const response = await fetch('/api/partners/applications', { method: 'POST',
        headers: { 'content-type': 'application/json' }, body: pending.current })
      const result: unknown = await response.json().catch(() => null)
      if (response.ok && isConfirmedIntake(result)) { setDone(true); pending.current = null; return }
      setMessage(typeof result === 'object' && result !== null && 'error' in result && typeof result.error === 'string'
        ? result.error : 'Kunne ikke bekrefte mottak. Prøv igjen.')
      const retrySame = shouldRetrySameIntake(response.status)
      setUncertain(retrySame)
      if (!retrySame) pending.current = null
    } catch { setUncertain(true); setMessage('Mottak er ikke bekreftet. Prøv samme innsending igjen.') }
    finally { setSending(false) }
  }
  if (done) return <div role="status" className="rounded-2xl border border-mist bg-white p-8"><h2 className="text-2xl font-medium">Takk for interessen!</h2><p className="mt-3">Vi har mottatt søknaden og tar kontakt. En søknad gir ikke automatisk en partneravtale.</p></div>
  return <form aria-label="Søk om å bli Efero-partner" onSubmit={event => void submit(event)} className="rounded-2xl border border-mist bg-white p-6 md:p-9">
    <h2 className="mb-6 text-2xl font-medium">Fortell litt om deg selv</h2>
    <fieldset disabled={sending || uncertain} className="space-y-5"><legend className="sr-only">Partnersøknad</legend>
      {[
        { name: 'name', label: 'Navn', type: 'text', max: 120, required: true },
        { name: 'email', label: 'E-post', type: 'email', max: 254, required: true },
        { name: 'phone', label: 'Telefon (valgfritt)', type: 'tel', max: 40, required: false },
        { name: 'company', label: 'Firma eller profilnavn', type: 'text', max: 160, required: true },
        { name: 'organizationNumber', label: 'Organisasjonsnummer (valgfritt)', type: 'text', max: 9, required: false },
        { name: 'channelUrl', label: 'Lenke til kanalen eller nettsiden din', type: 'url', max: 500, required: true },
      ].map(field => <label key={field.name} className="block text-sm font-medium"><span className="mb-2 block">{field.label}</span><input className={inputClass} name={field.name} type={field.type} required={field.required} maxLength={field.max} /></label>)}
      <label className="block text-sm font-medium"><span className="mb-2 block">Hvem når du, og hvordan vil du vise Efero?</span><textarea name="motivation" required maxLength={2000} rows={4} className={`${inputClass} py-3`} /></label>
      <label className="flex items-start gap-3 text-sm leading-6"><input name="consent" type="checkbox" required className="mt-1 size-5 shrink-0 accent-[#004c3a]" /><span>Jeg samtykker til at Efero lagrer søknaden og kontakter meg om partnersamarbeid. <Link href="/personvern" className="underline">Les om personvern</Link>.</span></label>
      <div aria-hidden="true" className="absolute -left-[10000px]"><label>Nettside<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    </fieldset>
    {message && <p className="mt-5 text-sm text-red-800" role="alert">{message}</p>}
    <button disabled={sending} className="mt-6 min-h-12 w-full rounded-full bg-forest px-6 font-semibold text-white disabled:opacity-60" type="submit">{sending ? 'Sender …' : uncertain ? 'Prøv samme innsending igjen' : 'Send søknad'}</button>
    <p className="mt-4 text-xs leading-5 text-[#466158]">Vi vurderer alle søknader. Sats, vilkår og eventuell bruk av innhold i annonser avtales separat.</p>
  </form>
}
