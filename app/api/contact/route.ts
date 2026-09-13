import { NextRequest, NextResponse } from 'next/server'
import { buildContactEmail, validateContactRequest } from '@/lib/contact-request'
import { syncContactRequest } from '@/lib/resend-contacts'

const MAX_BODY_BYTES = 16_384

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Forespørselen er for stor.' }, { status: 413 })
  }

  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return NextResponse.json({ error: 'Kunne ikke lese skjemaet.' }, { status: 400 })
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Forespørselen er for stor.' }, { status: 413 })
  }

  let body: unknown
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Kunne ikke lese skjemaet.' }, { status: 400 })
  }

  const validation = validateContactRequest(body)
  if (!validation.ok) {
    return NextResponse.json(
      { error: 'Kontroller feltene og prøv igjen.', fields: validation.errors },
      { status: 400 },
    )
  }

  if (validation.data.website) {
    return NextResponse.json({ ok: true })
  }

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.error('Contact request failed: RESEND_API_KEY is missing')
    return NextResponse.json(
      { error: 'Kontaktskjemaet er midlertidig utilgjengelig. Send oss gjerne en e-post.' },
      { status: 503 },
    )
  }

  let contactSaved = false
  try {
    contactSaved = await syncContactRequest(validation.data, {
      apiKey: resendKey,
      segmentId: process.env.CONTACT_RESEND_SEGMENT_ID,
      baseUrl: process.env.RESEND_API_BASE_URL,
    })
  } catch (error) {
    console.error('Contact sync failed', error instanceof Error ? error.message : error)
  }

  const email = buildContactEmail(validation.data)
  let emailSent = false
  try {
    const response = await fetch(process.env.RESEND_API_ENDPOINT || 'https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || process.env.DEMO_FROM_EMAIL || 'Efero <noreply@efero.no>',
        to: [process.env.CONTACT_NOTIFICATION_EMAIL || process.env.DEMO_NOTIFICATION_EMAIL || 'kontakt@efero.no'],
        reply_to: validation.data.email,
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
      signal: AbortSignal.timeout(10_000),
    })
    emailSent = response.ok
    if (!response.ok) console.error('Contact email rejected by Resend', response.status)
  } catch (error) {
    console.error('Contact email request failed', error instanceof Error ? error.message : error)
  }

  // Resend Contacts er hovedlisten. Varselmailen er en uavhengig reserve, slik at
  // henvendelsen ikke går tapt dersom én av Resend-operasjonene feiler.
  if (!contactSaved && !emailSent) {
    return NextResponse.json({ error: 'Kunne ikke sende meldingen. Prøv igjen.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, saved: contactSaved })
}
