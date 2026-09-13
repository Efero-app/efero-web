import type { Metadata } from 'next'
import Link from '@/components/SiteLink'
import { WaitlistForm } from '@/components/WaitlistForm'
import { breadcrumbSchema, pageMeta, webPageSchema } from '@/lib/seo'
import { attributionFromSearchParams } from '@/lib/marketing-attribution'

const description = 'Bli blant de første håndverksbedriftene som får tilgang til Efero. Reserver plass, påvirk produktet og få personlig oppstart.'

export const metadata: Metadata = pageMeta({
  title: 'Bli med på ventelisten', description, path: '/venteliste',
  keywords: ['Efero venteliste', 'jobbstyring håndverker', 'håndverker app tidlig tilgang'],
})

const benefits = [
  { number: '01', title: 'Tidlig tilgang', text: 'Vær blant de første bedriftene som får teste Efero i praksis.' },
  { number: '02', title: 'Påvirk produktet', text: 'Fortell oss hva som stjeler tid i dag, så prioriterer vi det som betyr mest.' },
  { number: '03', title: 'Personlig oppstart', text: 'Vi hjelper deg i gang og tilpasser oppsettet til måten dere jobber på.' },
]

export default async function VentelistePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const attribution = attributionFromSearchParams(await searchParams)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        webPageSchema({ name: 'Bli med på ventelisten', description, path: '/venteliste' }),
        breadcrumbSchema([{ name: 'Hjem', path: '/' }, { name: 'Venteliste', path: '/venteliste' }]),
      ]) }} />

      <section className="relative overflow-hidden border-b border-mist">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(0,76,58,0.13),transparent_28%),radial-gradient(circle_at_12%_84%,rgba(0,76,58,0.07),transparent_24%)]" />
        <div className="relative mx-auto grid max-w-site grid-cols-1 gap-14 px-6 pb-20 pt-14 md:px-10 md:pb-24 md:pt-20 lg:grid-cols-[1.05fr_0.82fr] lg:items-center lg:gap-20">
          <div>
            <nav aria-label="Brødsmuler" className="mb-10 font-mono text-[12px] tracking-[0.08em] text-[#52675f]">
              <Link href="/" className="hover:text-ink">Hjem</Link><span className="mx-2" aria-hidden="true">/</span><span className="text-ink">Venteliste</span>
            </nav>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#b9c9c1] bg-white/70 px-3.5 py-2 text-[12px] font-medium text-forest backdrop-blur-sm">
              <span className="relative flex h-2 w-2" aria-hidden="true"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-35" /><span className="relative inline-flex h-2 w-2 rounded-full bg-forest" /></span>
              Vi inviterer de første bedriftene nå
            </div>
            <h1 className="hero-lcp m-0 max-w-[13ch] text-[clamp(46px,6.4vw,82px)] font-medium leading-[0.98] tracking-[-0.04em] text-ink">
              Bli med og form <em className="font-serif font-normal italic text-forest">Efero.</em>
            </h1>
            <p className="mt-7 max-w-[48ch] text-[19px] leading-[1.6] text-[#2f4a41]">
              Vi bygger et enklere system for norske håndverksbedrifter. Bli med på ventelisten for tidlig tilgang, personlig oppstart og en direkte stemme i hva vi lager først.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[14px] text-[#3d5c52]">
              {['Uforpliktende', 'Ingen betalingskort', 'Norsk support'].map(item => <span key={item} className="flex items-center gap-2"><svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-forest" fill="none" stroke="currentColor" strokeWidth="2"><path d="m4 10 4 4 8-8" /></svg>{item}</span>)}
            </div>
          </div>
          <WaitlistForm initialAttribution={attribution} />
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-20 md:px-10 md:py-24" aria-labelledby="fordeler-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div><p className="font-mono text-[12px] uppercase tracking-[0.15em] text-[#52675f]">For de første brukerne</p><h2 id="fordeler-title" className="mt-4 max-w-[12ch] text-[38px] font-medium leading-[1.05] tracking-[-0.03em] text-ink md:text-[46px]">Mer enn bare en plass i køen.</h2></div>
          <div>{benefits.map(benefit => <article key={benefit.number} className="grid grid-cols-[44px_1fr] gap-4 border-t border-mist py-7 first:border-t-0 first:pt-0 sm:grid-cols-[70px_0.7fr_1fr] sm:gap-6"><span className="font-mono text-[12px] text-[#52675f]">{benefit.number}</span><h3 className="m-0 text-[20px] font-medium text-ink">{benefit.title}</h3><p className="col-start-2 m-0 text-[15px] leading-[1.6] text-[#52675f] sm:col-start-3">{benefit.text}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-forest text-white"><div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-6 py-16 md:px-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/65">Laget for arbeidsdagen deres</p><h2 className="mt-3 max-w-[22ch] text-[34px] font-medium leading-[1.08] tracking-[-0.025em]">Tilbud, jobber, timer, dokumentasjon og faktura — samlet.</h2></div><Link href="/funksjoner" className="inline-flex h-12 w-fit items-center rounded-full border border-white/35 px-6 text-[14px] font-medium transition hover:bg-white hover:text-forest">Utforsk funksjonene →</Link></div></section>
    </>
  )
}
