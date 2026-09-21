/** Public intake only. The Efero Worker owns validation, D1 storage and partner decisions. */
export async function forwardPartnerIntake(request: Request, kind: 'applications' | 'referrals') {
  const reply = (status: number, error: string) => Response.json({ error }, { status, headers: { 'cache-control': 'no-store' } })
  if (!request.headers.get('content-type')?.includes('application/json')) return reply(415, 'Skjemaet må sendes som JSON.')
  const reader = request.body?.getReader()
  if (!reader) return reply(400, 'Skjemaet mangler.')
  let raw = ''
  let bytes = 0
  const decoder = new TextDecoder()
  try {
    while (true) {
      const chunk = await reader.read()
      if (chunk.done) break
      bytes += chunk.value.byteLength
      if (bytes > 16_384) { await reader.cancel(); return reply(413, 'Forespørselen er for stor.') }
      raw += decoder.decode(chunk.value, { stream: true })
    }
    raw += decoder.decode()
  } catch { return reply(400, 'Kunne ikke lese skjemaet.') }
  let payload: unknown
  try { payload = JSON.parse(raw) } catch { return reply(400, 'Ugyldig skjema.') }
  if (typeof payload !== 'object' || payload === null || !('clientOperationId' in payload)
    || typeof payload.clientOperationId !== 'string'
    || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(payload.clientOperationId))
    return reply(400, 'Innsendingen mangler en gyldig identifikator.')
  const configured = process.env.EFERO_PARTNER_API_URL
    ?? (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8798' : '')
  let origin: URL
  try { origin = new URL(configured) } catch { return reply(503, 'Partnerskjemaet er midlertidig utilgjengelig. Kontakt kontakt@efero.no.') }
  const local = ['127.0.0.1', 'localhost'].includes(origin.hostname) && origin.protocol === 'http:'
  if (origin.username || origin.password || origin.search || origin.hash || origin.pathname !== '/'
    || (!local && origin.origin !== 'https://app.efero.no')) return reply(503, 'Partnerskjemaet er ikke konfigurert.')
  try {
    const response = await fetch(new URL(`/v1/public/partners/${kind}`, origin), {
      method: 'POST', headers: { 'content-type': 'application/json', 'idempotency-key': payload.clientOperationId },
      body: raw, signal: AbortSignal.timeout(15_000), redirect: 'error', cache: 'no-store',
    })
    if (!response.ok) {
      if (response.status === 429) return reply(429, 'For mange forsøk. Vent litt og prøv igjen.')
      if (response.status === 409) return reply(409, 'Innsendingen er endret. Last siden på nytt før et nytt forsøk.')
      if (response.status === 400) return reply(400, 'Kontroller feltene og samtykket. Ved henvisning må partnerkoden være aktiv.')
      return reply(502, 'Vi kunne ikke bekrefte mottak. Prøv samme innsending igjen.')
    }
    const result: unknown = await response.json()
    if (typeof result !== 'object' || result === null || !('ok' in result) || result.ok !== true
      || !('data' in result) || typeof result.data !== 'object' || result.data === null
      || !('accepted' in result.data) || result.data.accepted !== true)
      return reply(502, 'Vi kunne ikke bekrefte mottak. Prøv samme innsending igjen.')
    return Response.json({ ok: true }, { headers: { 'cache-control': 'no-store' } })
  } catch { return reply(502, 'Vi kunne ikke bekrefte mottak. Prøv samme innsending igjen.') }
}
