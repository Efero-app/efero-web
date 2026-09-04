/** Produksjonsdomenet. Canonical og structured data peker alltid hit. */
export const SITE_URL = 'https://efero.no'

/**
 * Opphavet dette bygget faktisk kjører på. På previews og lokale tunneler må
 * absolutte URL-er (som og:image) peke hit, ellers henter Facebook, LinkedIn og
 * Telegram delingsbildet fra produksjon i stedet for fra versjonen du tester.
 */
function resolveDeploymentUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, '')
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return SITE_URL
}

export const DEPLOYMENT_URL = resolveDeploymentUrl()
export const SITE_NAME = 'Efero'
export const SITE_EMAIL = 'kontakt@efero.no'
export const SITE_LOCALE = 'nb_NO'

export const DEFAULT_OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Efero — Ett enkelt system for hele arbeidsdagen',
}

type MetaInput = {
  title: string
  description: string
  path?: string
  keywords?: string[]
  noIndex?: boolean
}

function socialImage(title: string, description: string) {
  const params = new URLSearchParams({
    title,
    description,
    // Endres når designet oppdateres, slik at WhatsApp m.fl. ikke bruker gammelt cachet bilde.
    v: '3',
  })

  return {
    url: `/api/og?${params.toString()}`,
    width: 1200,
    height: 630,
    alt: `${title} | ${SITE_NAME}`,
  }
}

export function pageMeta({ title, description, path = '', keywords, noIndex }: MetaInput) {
  const isHome = !path || path === '/'
  const url = isHome
    ? SITE_URL
    : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
  const ogTitle = isHome ? title : `${title} | ${SITE_NAME}`
  const imageTitle = title
    .replace(/^Efero\s+(?:—|\|)\s+/, '')
    .replace(/\s+(?:—|\|)\s+Efero.*$/, '')
  const image = socialImage(imageTitle, description)
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: { 'nb-NO': url, 'x-default': url },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: 'website' as const,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: ogTitle,
      description,
      images: [image.url],
    },
  }
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-icon.png`,
  description: 'Norsk programvare for jobbstyring, tilbud, dokumentasjon og fakturaflyt i håndverksbedrifter.',
  email: SITE_EMAIL,
  areaServed: 'NO',
  knowsAbout: [
    'Jobbstyring for håndverksbedrifter',
    'Tilbud og kundeoppfølging',
    'Timeføring og materialregistrering',
    'HMS og kvalitetsdokumentasjon',
    'Fakturagrunnlag for norske håndverksbedrifter',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: SITE_EMAIL,
    contactType: 'customer service',
    availableLanguage: ['Norwegian', 'nb'],
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: 'Efero er et modulbasert ordre- og timesystem for norske håndverksbedrifter.',
  inLanguage: 'nb-NO',
  publisher: { '@id': `${SITE_URL}/#organization` },
}

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#software`,
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  inLanguage: 'nb-NO',
  description:
    'Efero samler kunder, oppdrag, tilbud, timer, materialer, HMS og fakturagrunnlag for norske håndverksbedrifter – i ett enkelt system.',
  offers: {
    '@type': 'Offer',
    url: `${SITE_URL}/priser`,
    description: 'Behovsbasert månedsabonnement med skriftlig totalpris før oppstart, uten binding eller etableringsavgift',
  },
  featureList: [
    'Kunder, jobber, ansatte og timeplaner',
    'Tilbud, godkjenninger, endringer og faktura',
    'Timer, materialer, innkjøp og lønnsomhet per jobb',
    'Periodisk vedlikehold og utstyr hos kunden',
    'Sjekklister, risikovurderinger og servicerapporter',
    'Timeføring, bilder og rapporter fra mobil',
  ],
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  isPartOf: { '@id': `${SITE_URL}/#website` },
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Norske håndverksbedrifter',
  },
  mainEntityOfPage: SITE_URL,
}

type WebPageSchemaInput = {
  name: string
  description: string
  path: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
  dateModified?: string
}

/** Felles entitetskoblinger gjør hver side tydelig for søke- og AI-systemer. */
export function webPageSchema({
  name,
  description,
  path,
  type = 'WebPage',
  dateModified,
}: WebPageSchemaInput) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}/#webpage`,
    url,
    name,
    description,
    inLanguage: 'nb-NO',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#software` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    ...(dateModified ? { dateModified } : {}),
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
