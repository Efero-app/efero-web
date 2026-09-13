import Link from '@/components/SiteLink'
import type { Metadata } from 'next'
import { resourceArticles } from '@/lib/resources'
import { breadcrumbSchema, pageMeta, webPageSchema } from '@/lib/seo'

const description = 'Praktiske Efero-guider for pristilbud, oppdragsplanlegging, fakturering, kundeoppfølging og prosjektkontroll i håndverksbedrifter.'

export const metadata: Metadata = pageMeta({
  title: 'Guider for tilbud, oppdrag og fakturering',
  description,
  path: '/ressurser',
  keywords: ['pristilbud håndverker', 'oppdragsplanlegging', 'fakturering håndverker', 'tilbudsoppfølging', 'prosjektøkonomi håndverker'],
})

export default function ResourcesPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
      breadcrumbSchema([{ name: 'Hjem', path: '/' }, { name: 'Ressurser', path: '/ressurser' }]),
      webPageSchema({
        name: 'Guider for tilbud, oppdrag og fakturering',
        description,
        path: '/ressurser',
        type: 'CollectionPage',
      }),
    ]) }} />
    <section className="max-w-site mx-auto px-6 md:px-10 py-20 md:py-24">
      <nav aria-label="Brødsmuler" className="font-mono text-[12px] tracking-[0.08em] text-[#3d5c52] mb-8"><Link href="/">Hjem</Link><span className="mx-2">/</span><span>Ressurser</span></nav>
      <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[#3d5c52] mb-5">Efero hjelpesenter</p>
      <h1 className="text-[clamp(38px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-medium text-ink max-w-[16ch]">Konkrete guider for arbeidsdagen</h1>
      <p className="mt-6 text-[18px] leading-[1.6] text-[#2f4a41] max-w-[52ch]">Se hvordan Efero gjør flyten fra pristilbud og kundesvar til planlagt oppdrag, faktura og prosjektkontroll enklere.</p>
      <div className="mt-14 grid gap-px bg-mist md:grid-cols-2 border border-mist">{resourceArticles.map((article, index) => <Link className="group bg-lgray p-7 md:p-9 hover:bg-white transition-colors" href={`/ressurser/${article.slug}`} key={article.slug}><span className="font-mono text-[12px] text-[#3d5c52]">0{index + 1} · {article.eyebrow}</span><h2 className="mt-5 text-[25px] leading-tight font-medium text-ink group-hover:text-forest">{article.title}</h2><p className="mt-4 text-[15px] leading-[1.65] text-[#2f4a41]">{article.description}</p><span className="mt-7 inline-block text-[14px] font-medium text-forest">Les guiden →</span></Link>)}</div>
    </section>
  </>
}
