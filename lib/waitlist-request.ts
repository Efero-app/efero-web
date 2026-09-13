import { EMPTY_ATTRIBUTION, MarketingAttribution, normalizeAttribution } from '@/lib/marketing-attribution'

export const WAITLIST_TEAM_OPTIONS = [
  'Kun meg',
  '2–5 ansatte',
  '6–15 ansatte',
  '16–30 ansatte',
  '31+ ansatte',
] as const

export const WAITLIST_TRADE_OPTIONS = [
  'Elektro',
  'Rør / VVS',
  'Bygg og tømrer',
  'Ventilasjon',
  'Service og vedlikehold',
  'Annet håndverksfag',
] as const

export type WaitlistRequest = {
  name: string
  email: string
  phone: string
  company: string
  trade: string
  teamSize: string
  consent: boolean
  website: string
  attribution: MarketingAttribution
}

export type WaitlistValidation =
  | { ok: true; data: WaitlistRequest }
  | { ok: false; errors: Record<string, string> }

const trades = new Set<string>(WAITLIST_TRADE_OPTIONS)
const teamSizes = new Set<string>(WAITLIST_TEAM_OPTIONS)

function cleanString(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export function validateWaitlistRequest(input: unknown): WaitlistValidation {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, errors: { form: 'Ugyldig skjema.' } }
  }

  const raw = input as Record<string, unknown>
  const data: WaitlistRequest = {
    name: cleanString(raw.name, 100),
    email: cleanString(raw.email, 254).toLowerCase(),
    phone: cleanString(raw.phone, 30),
    company: cleanString(raw.company, 140),
    trade: cleanString(raw.trade, 60),
    teamSize: cleanString(raw.teamSize, 40),
    consent: raw.consent === true,
    website: cleanString(raw.website, 200),
    attribution: raw.attribution && typeof raw.attribution === 'object' && !Array.isArray(raw.attribution)
      ? normalizeAttribution(raw.attribution as Record<string, unknown>)
      : EMPTY_ATTRIBUTION,
  }

  const errors: Record<string, string> = {}
  if (data.name.length < 2) errors.name = 'Skriv inn fullt navn.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Skriv inn en gyldig e-postadresse.'
  if (data.company.length < 2) errors.company = 'Skriv inn bedriftsnavnet.'
  if (!trades.has(data.trade)) errors.trade = 'Velg fagområde.'
  if (!teamSizes.has(data.teamSize)) errors.teamSize = 'Velg bedriftsstørrelse.'
  if (data.phone && !/^[+\d][\d\s()-]{6,29}$/.test(data.phone)) errors.phone = 'Skriv inn et gyldig telefonnummer.'
  if (!data.consent) errors.consent = 'Du må godta at Efero kan kontakte deg.'

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character] ?? character)
}

export function buildWaitlistEmail(data: WaitlistRequest) {
  const rows = [
    ['Navn', data.name], ['E-post', data.email], ['Telefon', data.phone || 'Ikke oppgitt'],
    ['Bedrift', data.company], ['Fagområde', data.trade], ['Bedriftsstørrelse', data.teamSize],
    ['Kampanjeproblem', data.attribution.problem || 'Ikke oppgitt'],
    ['UTM-kilde', data.attribution.utmSource || 'Ikke oppgitt'],
    ['UTM-medium', data.attribution.utmMedium || 'Ikke oppgitt'],
    ['UTM-kampanje', data.attribution.utmCampaign || 'Ikke oppgitt'],
    ['UTM-innhold', data.attribution.utmContent || 'Ikke oppgitt'],
    ['Landingsside', data.attribution.landingPath || 'Ikke oppgitt'],
  ]
  const htmlRows = rows.map(([label, value]) => `
    <tr><td style="padding:8px 16px 8px 0;color:#5a7268;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:8px 0;color:#00281f;font-weight:600">${escapeHtml(value)}</td></tr>`).join('')

  return {
    subject: `Ny på ventelisten: ${data.company}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:640px;color:#00281f">
      <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#5a7268">Efero venteliste</p>
      <h1 style="font-size:24px;margin:0 0 20px">Ny interessent</h1>
      <table style="border-collapse:collapse;width:100%">${htmlRows}</table></div>`,
    text: ['Ny interessent på Efero-ventelisten', '', ...rows.map(([label, value]) => `${label}: ${value}`)].join('\n'),
  }
}
