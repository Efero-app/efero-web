export const DEMO_MODULES = [
  {
    id: 'customers',
    label: 'Kunder og CRM',
    description: 'Kunderegister, kontaktpersoner, adresser og historikk.',
  },
  {
    id: 'planning',
    label: 'Jobber og planlegger',
    description: 'Oppdrag, bemanning, kalender og løpende oversikt.',
  },
  {
    id: 'quotes',
    label: 'Tilbud og godkjenning',
    description: 'Enkle pristilbud, sanntidsvisning og digital godkjenning.',
  },
  {
    id: 'time',
    label: 'Timer og ansatte',
    description: 'Timeføring, fravær og oversikt over medarbeidere.',
  },
  {
    id: 'materials',
    label: 'Materialer og innkjøp',
    description: 'Materialforbruk, kostnader og innkjøp på riktig jobb.',
  },
  {
    id: 'invoicing',
    label: 'Faktura og økonomi',
    description: 'Fakturagrunnlag, lønnsomhet og kontroll før utsending.',
  },
  {
    id: 'quality',
    label: 'HMS og kvalitet',
    description: 'Sjekklister, risikovurderinger, avvik og dokumentasjon.',
  },
  {
    id: 'service',
    label: 'Service og vedlikehold',
    description: 'Serviceavtaler, utstyr og periodiske oppdrag.',
  },
  {
    id: 'unsure',
    label: 'Usikker – hjelp meg å velge',
    description: 'Vi finner sammen modulene som passer arbeidsflyten deres.',
  },
] as const

export const TEAM_SIZE_OPTIONS = [
  'Kun meg selv',
  '2–3 personer',
  '4–8 personer',
  '9–20 personer',
  '21+ personer',
] as const

export const START_TIMELINE_OPTIONS = [
  'Så snart som mulig',
  'Innen 1 måned',
  'Om 1–3 måneder',
  'Om 3–6 måneder',
  'Senere enn 6 måneder',
  'Bare utforsker mulighetene',
] as const

export type DemoBooking = {
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

export type DemoBookingValidation =
  | { ok: true; data: DemoBooking }
  | { ok: false; errors: Record<string, string> }

const moduleIds = new Set<string>(DEMO_MODULES.map(module => module.id))
const teamSizes = new Set<string>(TEAM_SIZE_OPTIONS)
const startTimelines = new Set<string>(START_TIMELINE_OPTIONS)

function cleanString(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export function validateDemoBooking(input: unknown): DemoBookingValidation {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, errors: { form: 'Ugyldig skjema.' } }
  }

  const raw = input as Record<string, unknown>
  const data: DemoBooking = {
    name: cleanString(raw.name, 100),
    company: cleanString(raw.company, 140),
    email: cleanString(raw.email, 254).toLowerCase(),
    phone: cleanString(raw.phone, 40),
    teamSize: cleanString(raw.teamSize, 40),
    modules: Array.isArray(raw.modules)
      ? [...new Set(raw.modules.filter((item): item is string => typeof item === 'string' && moduleIds.has(item)))].slice(0, DEMO_MODULES.length)
      : [],
    startTimeline: cleanString(raw.startTimeline, 60),
    message: cleanString(raw.message, 2_000),
    website: cleanString(raw.website, 200),
  }

  const errors: Record<string, string> = {}
  if (data.name.length < 2) errors.name = 'Skriv inn fullt navn.'
  if (data.company.length < 2) errors.company = 'Skriv inn bedriftsnavn.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Skriv inn en gyldig e-postadresse.'
  if (data.phone && !/^[+\d][\d\s().-]{5,}$/.test(data.phone)) errors.phone = 'Skriv inn et gyldig telefonnummer.'
  if (!teamSizes.has(data.teamSize)) errors.teamSize = 'Velg størrelse på teamet.'
  if (data.modules.length === 0) errors.modules = 'Velg minst én modul, eller velg at du ønsker hjelp.'
  if (!startTimelines.has(data.startTimeline)) errors.startTimeline = 'Velg når dere ønsker å starte.'

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

function moduleLabels(moduleIdsToFormat: string[]) {
  return moduleIdsToFormat.map(id => DEMO_MODULES.find(module => module.id === id)?.label ?? id)
}

export function buildPartnerDemoMessage(data: DemoBooking) {
  return `Team: ${data.teamSize}\nOppstart: ${data.startTimeline}\nModuler: ${moduleLabels(data.modules).join(', ')}\n${data.message}`
}

export function buildDemoEmail(data: DemoBooking) {
  const modules = moduleLabels(data.modules)
  const phone = data.phone || 'Ikke oppgitt'
  const message = data.message || 'Ingen tilleggsinformasjon.'
  const rows = [
    ['Navn', data.name],
    ['Bedrift', data.company],
    ['E-post', data.email],
    ['Telefon', phone],
    ['Størrelse på team', data.teamSize],
    ['Ønsket oppstart', data.startTimeline],
  ]

  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <th scope="row" style="padding:10px 16px 10px 0;border-bottom:1px solid #e3ece7;color:#5a7268;vertical-align:top;text-align:left;font-size:14px;font-weight:400;width:38%">${escapeHtml(label)}</th>
      <td style="padding:10px 0;border-bottom:1px solid #e3ece7;color:#00281f;font-size:14px;font-weight:600;overflow-wrap:anywhere">${escapeHtml(value)}</td>
    </tr>`).join('')

  return {
    subject: `Ny demoforespørsel: ${data.company.replace(/[\r\n]+/g, ' ')}`,
    html: `<!doctype html>
<html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ny demoforespørsel</title></head>
<body style="margin:0;padding:0;background:#f4f8f6;color:#00281f;font-family:Segoe UI,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f8f6;padding:32px 12px"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #d5e0db;border-radius:16px;overflow:hidden">
      <tr><td style="background:#004c3a;padding:24px 28px">
        <p style="margin:0 0 10px;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:2px">EFERO</p>
        <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.3;font-weight:600">Ny demoforespørsel</h1>
        <p style="margin:10px 0 0;color:#d8eee6;font-size:14px;line-height:1.5">En bedrift ønsker å bli bedre kjent med Efero.</p>
      </td></tr>
      <tr><td style="padding:28px">
        <h2 style="font-size:17px;margin:0 0 12px;font-weight:600">Kontaktinformasjon</h2>
        <table aria-label="Kontaktinformasjon" style="border-collapse:collapse;width:100%;margin-bottom:28px">${htmlRows}</table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#edf5f0;border:1px solid #d5e5dc;border-radius:12px"><tr><td style="padding:20px">
          <h2 style="font-size:17px;margin:0 0 10px;font-weight:600">Ønskede moduler</h2>
          <ul style="margin:0;padding-left:20px;font-size:15px;line-height:1.6">${modules.map(module => `<li style="margin:6px 0">${escapeHtml(module)}</li>`).join('')}</ul>
        </td></tr></table>
        <h2 style="font-size:17px;margin:0 0 10px;font-weight:600">Tilleggsinformasjon</h2>
        <p style="margin:0 0 24px;white-space:pre-wrap;overflow-wrap:anywhere;font-size:15px;line-height:1.6">${escapeHtml(message)}</p>
        <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#5a7268">Kontakt kunden for å avtale møtet. Ingen møtetid er bestilt i kalenderen.</p>
        <table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="#004c3a" style="border-radius:10px;text-align:center">
          <a href="mailto:${escapeHtml(encodeURIComponent(data.email))}" style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600">Svar kunden</a>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding:18px 28px;border-top:1px solid #d5e0db;background:#f4f8f6">
        <p style="margin:0;font-size:12px;line-height:1.6;color:#5a7268">Internt varsel til Efero. Du kan også svare direkte på denne e-posten for å kontakte kunden.</p>
        <p style="margin:10px 0 0;font-size:12px;font-weight:600;color:#004c3a">Efero · Ett enkelt system for hele arbeidsdagen.</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`,
    text: [
      'Ny demoforespørsel',
      '',
      ...rows.map(([label, value]) => `${label}: ${value}`),
      `Ønskede moduler: ${modules.join(', ')}`,
      '',
      'Tilleggsinformasjon:',
      message,
    ].join('\n'),
  }
}
