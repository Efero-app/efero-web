export const PRICING_FACTORS = [
  {
    name: 'Behov og arbeidsflyt',
    description: 'Vi ser på hvordan dere jobber i dag og hvilke deler av Efero som faktisk vil spare tid.',
  },
  {
    name: 'Antall brukere',
    description: 'Løsningen dimensjoneres for medarbeiderne som skal bruke Efero på kontoret og ute i felt.',
  },
  {
    name: 'Moduler og integrasjoner',
    description: 'Dere velger relevante arbeidsområder og eventuelle koblinger til systemene dere allerede bruker.',
  },
] as const

export const CORE_PACKAGE_FEATURES = [
  'Kunder og kundehistorikk',
  'Oppdrag, prosjekter og planlegger',
  'Timer, ansatte og fravær',
  'Tilbud med sanntidsvisning',
  'Fakturagrunnlag og PDF-eksport',
  'Mobilapp, bilder og jobbarkiv',
] as const

export const OPTIONAL_MODULES = [
  { name: 'HMS og kvalitet', description: 'Sjekklister, risiko, SJA, RUH og dokumentasjon.' },
  { name: 'Materialer og innkjøp', description: 'Innkjøp, forbruk og kostnader på riktig oppdrag.' },
  { name: 'Service og vedlikehold', description: 'Serviceavtaler, utstyr og periodiske oppdrag.' },
  { name: 'Prosjektøkonomi og rapporter', description: 'Utvidet økonomioversikt, nøkkeltall og rapportering.' },
  { name: 'Integrasjoner og tilpasning', description: 'Regnskap, eksterne systemer og særskilte arbeidsflyter.' },
] as const

export const PRICING_TERMS = {
  trial: '30 dager gratis uten betalingskort',
  setup: 'Personlig hjelp til oppstart',
  support: 'E-postsupport med svar innen én virkedag',
} as const

export const PRICING_PROMISES = [
  'Dere betaler bare for løsningen dere faktisk trenger',
  'Totalpris og omfang bekreftes skriftlig før oppstart',
  'Løsningen kan utvides når bedriften vokser',
] as const
