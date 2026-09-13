import { notFound } from 'next/navigation'
import { LandingPage } from '@/components/LandingPage'
import { featurePages, landingPage } from '@/lib/landing-pages'
import { pageMeta } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return featurePages.map(page => ({ slug: page.slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const page = landingPage('funksjoner', (await params).slug)
  if (!page) notFound()
  return pageMeta({ title: page.title, description: page.description, path: `/funksjoner/${page.slug}` })
}
export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const page = landingPage('funksjoner', (await params).slug)
  if (!page) notFound()
  return <LandingPage page={page} />
}
