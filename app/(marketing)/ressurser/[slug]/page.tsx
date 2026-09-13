import Link from '@/components/SiteLink'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { resourceArticles, resourceBySlug } from '@/lib/resources'
import { breadcrumbSchema, pageMeta, SITE_URL, webPageSchema } from '@/lib/seo'

export function generateStaticParams() { return resourceArticles.map(article => ({ slug: article.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = resourceBySlug((await params).slug)
  if (!article) return {}
  return pageMeta({ title: article.title, description: article.description, path: `/ressurser/${article.slug}` })
}

export default async function ResourceArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = resourceBySlug((await params).slug)
  if (!article) notFound()
  const path = `/ressurser/${article.slug}`
  const productLink = article.slug === 'prosjektokonomi-i-efero'
    ? { href: '/funksjoner/ordrestyring', label: 'Ordrestyring og prosjektoppfølging i Efero' }
    : article.slug === 'fra-tilbud-til-faktura'
      ? { href: '/funksjoner/timeforing', label: 'Timeføring på riktig oppdrag' }
      : { href: '/funksjoner/tilbud', label: 'Tilbudsprogram for håndverkere' }
  const structured = {
    '@context': 'https://schema.org', '@type': 'HowTo', name: article.title, description: article.description,
    inLanguage: 'nb-NO', url: `${SITE_URL}${path}`, dateModified: article.updatedAt,
    mainEntityOfPage: `${SITE_URL}${path}`, publisher: { '@id': `${SITE_URL}/#organization` },
    step: article.steps.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, name: step.title, text: step.text })),
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
      structured,
      breadcrumbSchema([{ name: 'Hjem', path: '/' }, { name: 'Ressurser', path: '/ressurser' }, { name: article.title, path }]),
      webPageSchema({
        name: article.title,
        description: article.description,
        path,
        dateModified: article.updatedAt,
      }),
    ]) }} />
    <article className="max-w-[840px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <nav aria-label="Brødsmuler" className="font-mono text-[12px] tracking-[0.08em] text-[#3d5c52] mb-10"><Link href="/">Hjem</Link><span className="mx-2">/</span><Link href="/ressurser">Ressurser</Link><span className="mx-2">/</span><span>{article.title}</span></nav>
      <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[#3d5c52]">{article.eyebrow}</p>
      <h1 className="mt-5 text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-[-0.04em] font-medium text-ink">{article.title}</h1>
      <p className="mt-7 text-[19px] leading-[1.65] text-[#2f4a41] max-w-[60ch]">{article.intro}</p>
      <div className="mt-16 border-t border-mist">{article.steps.map((step, index) => <section className="grid gap-4 border-b border-mist py-9 md:grid-cols-[64px_1fr]" key={step.title}><span className="font-mono text-[13px] text-forest">0{index + 1}</span><div><h2 className="text-[25px] font-medium text-ink">{step.title}</h2><p className="mt-3 text-[16px] leading-[1.7] text-[#2f4a41]">{step.text}</p></div></section>)}</div>
      <aside className="mt-12 bg-[#eef2ef] p-7 md:p-9"><h2 className="text-[22px] font-medium text-ink">Husk dette</h2><ul className="mt-5 space-y-3">{article.tips.map(tip => <li className="flex gap-3 text-[15px] leading-[1.6] text-[#2f4a41]" key={tip}><span aria-hidden className="text-forest">✓</span>{tip}</li>)}</ul></aside>
      <div className="mt-14 flex flex-wrap gap-3"><Link href="/book-demo" className="h-12 px-6 rounded-full bg-forest text-white inline-flex items-center font-medium">Book en demo</Link><Link href="/ressurser" className="h-12 px-6 rounded-full border border-mist inline-flex items-center text-forest">Se alle guider</Link></div>
      <section className="mt-10 border-t border-mist pt-8">
        <h2 className="mb-4 text-[24px] font-medium">Se løsningen i praksis</h2>
        <Link href={productLink.href} className="inline-flex min-h-11 items-center text-forest underline underline-offset-4">{productLink.label}</Link>
      </section>
    </article>
  </>
}
