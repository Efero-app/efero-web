import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { resourceArticles } from '@/lib/resources'
import { landingPages } from '@/lib/landing-pages'

const pages: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/funksjoner', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/jobbsjekk', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/bransjer', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/book-demo', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/partner', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/venteliste', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/om-oss', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kontakt', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kom-i-gang', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/priser', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/ressurser', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/personvern', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/vilkar', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/databehandleravtale', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = pages.map(page => ({
    url: `${SITE_URL}${page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
  const resourceEntries = resourceArticles.map(article => ({
    url: `${SITE_URL}/ressurser/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const landingEntries = landingPages.map(page => ({
    url: `${SITE_URL}/${page.section}/${page.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))
  return [...staticEntries, ...resourceEntries, ...landingEntries]
}
