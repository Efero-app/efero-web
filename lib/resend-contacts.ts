import type { WaitlistRequest } from '@/lib/waitlist-request'
import type { DemoBooking } from '@/lib/demo-booking'
import type { ContactRequest } from '@/lib/contact-request'

// Segment-ID er ikke en hemmelighet. Standardverdien gjør at deployen virker
// med Eferos Resend-konto uten en ekstra produksjonsvariabel.
export const EFERO_WAITLIST_SEGMENT_ID = 'a210d618-7703-423c-829e-2762ee2003c8'

type ResendContactOptions = {
  apiKey: string
  segmentId?: string
  baseUrl?: string
}

type ResendContactPayload = {
  email: string
  first_name: string
  last_name: string
  unsubscribed?: boolean
  properties: Record<string, string>
}

function splitName(name: string) {
  const [firstName, ...lastNameParts] = name.trim().split(/\s+/)
  return { firstName, lastName: lastNameParts.join(' ') }
}

function contactPayload(data: WaitlistRequest) {
  const { firstName, lastName } = splitName(data.name)
  return {
    email: data.email,
    first_name: firstName,
    last_name: lastName,
    unsubscribed: false,
    properties: {
      company_name: data.company,
      phone: data.phone,
      trade: data.trade,
      team_size: data.teamSize,
    },
  }
}

function demoContactPayload(data: DemoBooking): ResendContactPayload {
  const { firstName, lastName } = splitName(data.name)
  return {
    email: data.email,
    first_name: firstName,
    last_name: lastName,
    // Demo-samtykket gjelder oppfølging av forespørselen, ikke markedsføringsutsendelser.
    unsubscribed: true,
    properties: {
      company_name: data.company,
      phone: data.phone,
      team_size: data.teamSize,
    },
  }
}

function contactRequestPayload(data: ContactRequest): ResendContactPayload {
  const { firstName, lastName } = splitName(data.name)
  return {
    email: data.email,
    first_name: firstName,
    last_name: lastName,
    // Kontaktskjemaet gir samtykke til oppfølging av henvendelsen, ikke nyhetsbrev.
    unsubscribed: true,
    properties: {
      company_name: data.company,
      team_size: data.team,
    },
  }
}

async function resendRequest(
  url: string,
  apiKey: string,
  method: 'POST' | 'PATCH',
  body?: Record<string, unknown>,
) {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(10_000),
  })
}

async function syncContact(
  payload: ResendContactPayload,
  options: ResendContactOptions,
  segmentId?: string,
  updateSubscriptionState = false,
) {
  const baseUrl = (options.baseUrl || 'https://api.resend.com').replace(/\/+$/, '')
  const createResponse = await resendRequest(`${baseUrl}/contacts`, options.apiKey, 'POST', {
    ...payload,
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
  })

  if (createResponse.ok) return true
  if (createResponse.status !== 409) {
    console.error('Resend contact creation failed', createResponse.status)
    return false
  }

  const contactKey = encodeURIComponent(payload.email)
  const { unsubscribed: _subscriptionState, ...payloadWithoutSubscription } = payload
  const safeUpdate = updateSubscriptionState ? payload : payloadWithoutSubscription
  const updateResponse = await resendRequest(
    `${baseUrl}/contacts/${contactKey}`,
    options.apiKey,
    'PATCH',
    safeUpdate,
  )
  if (!updateResponse.ok) {
    console.error('Resend contact update failed', updateResponse.status)
    return false
  }

  if (!segmentId) return true
  const segmentResponse = await resendRequest(
    `${baseUrl}/contacts/${contactKey}/segments/${encodeURIComponent(segmentId)}`,
    options.apiKey,
    'POST',
  )
  if (!segmentResponse.ok && segmentResponse.status !== 409) {
    console.error('Adding Resend contact to segment failed', segmentResponse.status)
    return false
  }
  return true
}

/**
 * Oppretter en global Resend Contact og legger den i Efero-segmentet.
 * Eksisterende e-postadresser oppdateres og legges tilbake i segmentet.
 */
export async function syncWaitlistContact(data: WaitlistRequest, options: ResendContactOptions) {
  const segmentId = options.segmentId || EFERO_WAITLIST_SEGMENT_ID
  const payload = contactPayload(data)
  return syncContact(payload, options, segmentId, true)
}

/**
 * Bevarer demoforespørselen som en global Resend Contact. Segment er valgfritt fordi
 * Audience > Contacts er den autoritative leadlisten, mens segmentet bare organiserer den.
 */
export async function syncDemoContact(data: DemoBooking, options: ResendContactOptions) {
  return syncContact(demoContactPayload(data), options, options.segmentId)
}

/**
 * Bevarer en vanlig kontakthenvendelse i den globale Resend-listen. Ved gjentatt
 * innsending oppdateres kontaktdataene uten å endre et eksisterende markedsføringsvalg.
 */
export async function syncContactRequest(data: ContactRequest, options: ResendContactOptions) {
  return syncContact(contactRequestPayload(data), options, options.segmentId)
}
