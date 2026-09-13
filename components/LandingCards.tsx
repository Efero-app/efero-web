import Link from '@/components/SiteLink'
import type { LandingPage } from '@/lib/landing-pages'

export function LandingCards({ pages }: { pages: LandingPage[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {pages.map(page => (
        <Link key={page.slug} href={`/${page.section}/${page.slug}`} className="group rounded-2xl border border-mist bg-white p-7 transition-colors hover:border-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest">
          <h3 className="m-0 text-[23px] font-medium leading-tight text-ink">{page.label}</h3>
          <p className="mb-6 mt-4 text-[16px] leading-relaxed text-[#2f4a41]">{page.description}</p>
          <span className="text-[15px] font-medium text-forest underline underline-offset-4">Se {page.label.toLocaleLowerCase('nb-NO')} <span aria-hidden="true">→</span></span>
        </Link>
      ))}
    </div>
  )
}
