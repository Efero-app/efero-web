export const CONTACT_TEAM_OPTIONS = [
  'Kun meg selv',
  '2-3 teknikere',
  '4-8 teknikere',
  '9–15 teknikere',
  '16+ teknikere',
] as const

export const CONTACT_START_OPTIONS = [
  'Så snart som mulig',
  'Innen 1 måned',
  'Bare utforsker',
] as const

export type ContactRequest = {
  name: string
  email: string
  company: string
  team: string
  start: string
  message: string
  website: string
  source: 'contact' | 'jobbsjekk'
}

export type ContactRequestValidation =
  | { ok: true; data: ContactRequest }
  | { ok: false; errors: Record<string, string> }

const teamOptions = new Set<string>(CONTACT_TEAM_OPTIONS)
const startOptions = new Set<string>(CONTACT_START_OPTIONS)

function cleanString(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export function validateContactRequest(input: unknown): ContactRequestValidation {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, errors: { form: 'Ugyldig skjema.' } }
  }

  const raw = input as Record<string, unknown>
  const data: ContactRequest = {
    name: cleanString(raw.name, 100),
    email: cleanString(raw.email, 254).toLowerCase(),
    company: cleanString(raw.company, 140),
    team: cleanString(raw.team, 40),
    start: cleanString(raw.start, 60),
    message: cleanString(raw.message, 2_000),
    website: cleanString(raw.website, 200),
    source: cleanString(raw.source, 30) === 'jobbsjekk' ? 'jobbsjekk' : 'contact',
  }

  const errors: Record<string, string> = {}
  if (data.name.length < 2) errors.name = 'Skriv inn fullt navn.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Skriv inn en gyldig e-postadresse.'
  if (data.team && !teamOptions.has(data.team)) errors.team = 'Velg et gyldig antall teknikere.'
  if (data.start && !startOptions.has(data.start)) errors.start = 'Velg et gyldig tidspunkt.'

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character)
}

export function buildContactEmail(data: ContactRequest) {
  const rows = [
    ['Navn', data.name],
    ['E-post', data.email],
    ['Bedrift', data.company || 'Ikke oppgitt'],
    ['Antall teknikere', data.team || 'Ikke oppgitt'],
    ['Ønsket oppstart', data.start || 'Ikke oppgitt'],
    ['Kilde', data.source === 'jobbsjekk' ? 'Jobbsjekken' : 'Kontaktskjema'],
  ]
  const message = data.message || 'Ingen melding oppgitt.'
  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:8px 16px 8px 0;color:#5a7268;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:8px 0;color:#00281f;font-weight:600">${escapeHtml(value)}</td>
    </tr>`).join('')

  return {
    subject: `${data.source === 'jobbsjekk' ? 'Nytt Jobbsjekk-lead' : 'Ny henvendelse'}: ${data.company || data.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;color:#00281f">
        <h1 style="font-size:24px;margin:0 0 20px">${data.source === 'jobbsjekk' ? 'Nytt lead fra Jobbsjekken' : 'Ny henvendelse fra efero.no'}</h1>
        <table style="border-collapse:collapse;width:100%;margin-bottom:24px">${htmlRows}</table>
        <h2 style="font-size:17px;margin:0 0 10px">Melding</h2>
        <p style="margin:0;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
      </div>`,
    text: [
      data.source === 'jobbsjekk' ? 'Nytt lead fra Jobbsjekken' : 'Ny henvendelse fra efero.no',
      '',
      ...rows.map(([label, value]) => `${label}: ${value}`),
      '',
      'Melding:',
      message,
    ].join('\n'),
  }
}
