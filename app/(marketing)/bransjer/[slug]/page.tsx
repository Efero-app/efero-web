import { notFound } from 'next/navigation'
import { LandingPage } from '@/components/LandingPage'
import { industryPages, landingPage } from '@/lib/landing-pages'
import { pageMeta } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return industryPages.map(page => ({ slug: page.slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const page = landingPage('bransjer', (await params).slug)
  if (!page) notFound()
  return pageMeta({ title: page.title, description: page.description, path: `/bransjer/${page.slug}` })
}
export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = landingPage('bransjer', (await params).slug)
  if (!page) notFound()
  return <LandingPage page={page} />
}
