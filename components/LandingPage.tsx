import Link from '@/components/SiteLink'
import type { LandingPage as LandingPageContent } from '@/lib/landing-pages'
import { DEMO_LINK } from '@/lib/links'
import { breadcrumbSchema, webPageSchema } from '@/lib/seo'

export function LandingPage({ page }: { page: LandingPageContent }) {
  const parent = page.section === 'funksjoner' ? 'Funksjoner' : 'Bransjer'
  const path = `/${page.section}/${page.slug}`
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        breadcrumbSchema([{ name: 'Hjem', path: '/' }, { name: parent, path: `/${page.section}` }, { name: page.label, path }]),
        webPageSchema({ name: page.title, description: page.description, path }),
      ]).replace(/</g, '\\u003c') }} />
      <section className="relative overflow-hidden border-b border-mist">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,76,58,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-site px-6 pb-16 pt-10 md:px-10 md:pb-20">
          <nav aria-label="Brødsmuler" className="mb-12 flex flex-wrap gap-2 text-[14px] text-[#3d5c52]">
            <Link href="/" className="underline underline-offset-4">Hjem</Link><span aria-hidden="true">/</span>
            <Link href={`/${page.section}`} className="underline underline-offset-4">{parent}</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{page.label}</span>
          </nav>
          <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.14em] text-[#3d5c52]">Efero · {page.label}</p>
          <h1 className="hero-lcp m-0 max-w-[22ch] text-[clamp(36px,5.4vw,72px)] font-medium leading-[1.06] tracking-[-0.035em] text-ink">{page.heading}</h1>
          <p className="mb-8 mt-8 max-w-[62ch] text-[18px] leading-relaxed text-[#2f4a41]">{page.intro}</p>
          <div className="flex flex-wrap gap-4">
            <Link href={DEMO_LINK} className="inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-7 py-3 font-medium text-white hover:bg-ink">Book en demo</Link>
            <a href="#slik-fungerer-det" className="inline-flex min-h-12 items-center rounded-full border border-[#b9c9c1] px-7 py-3 text-forest hover:border-forest">Se arbeidsflyten <span aria-hidden="true" className="ml-2">↓</span></a>
          </div>
          <p className="mb-0 mt-5 text-[14px] text-[#52675f]">Nettløsning for mobil og PC. Vi gjennomgår behovene deres før oppstart.</p>
        </div>
      </section>
      <section id="slik-fungerer-det" className="mx-auto max-w-site scroll-mt-24 px-6 py-16 md:px-10 md:py-24">
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#3d5c52]">Slik fungerer det</p>
        <h2 className="mb-10 max-w-[28ch] text-[clamp(28px,3.5vw,44px)] font-medium leading-tight tracking-tight">{page.outcome}</h2>
        <ol className="grid list-none gap-8 p-0 md:grid-cols-2">
          {page.steps.map((step, index) => (
            <li key={step.title} className="border-t border-mist pt-6">
              <span aria-hidden="true" className="font-mono text-[13px] text-forest">0{index + 1}</span>
              <h3 className="mb-3 mt-4 text-[23px] font-medium leading-tight">{step.title}</h3>
              <p className="m-0 max-w-[55ch] text-[17px] leading-relaxed text-[#2f4a41]">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      {page.section === 'funksjoner' && page.slug === 'tilbud' && (
        <section className="mx-auto max-w-site px-6 pb-16 md:px-10">
          <h2 className="mb-5 text-[30px] font-medium tracking-tight">Se et tilbud i Efero</h2>
          <figure className="m-0 max-w-[960px]">
            <a href="/images/product/tilbud-demo.png" aria-label="Åpne skjermbildet av tilbudet i full størrelse" className="block rounded-2xl border border-mist bg-white p-2">
              <img src="/images/product/tilbud-demo.png" alt="Tilbudsvisning i Eferos testmiljø med beskrivelse, tilbudslinje, MVA, totalbeløp og sendeknapp." width={1440} height={960} loading="lazy" decoding="async" className="h-auto w-full rounded-xl" />
            </a>
            <figcaption className="mt-4 text-[14px] leading-relaxed text-[#52675f]">Eksempel fra Eferos testmiljø. Kunde og beløp er testdata. Visningen kan variere med rolle og versjon. Trykk på bildet for full størrelse.</figcaption>
          </figure>
        </section>
      )}
      <section className="border-y border-mist bg-[#eef2ef]">
        <div className="mx-auto grid max-w-site gap-10 px-6 py-16 md:px-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#3d5c52]">Et eksempel fra arbeidsdagen</p>
            <h2 className="mb-5 text-[32px] font-medium leading-tight tracking-tight">{page.example.title}</h2>
            <p className="text-[17px] leading-relaxed text-[#2f4a41]">{page.example.intro}</p>
          </div>
          <ul className="m-0 list-disc space-y-6 pl-5 text-[17px] leading-relaxed text-[#2f4a41]">
            {page.example.items.map(item => <li key={item} className="pl-2">{item}</li>)}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-site px-6 py-16 md:px-10">
        <div className="max-w-[800px]">
          <h2 className="mb-4 text-[28px] font-medium tracking-tight">Dette er viktig å vite</h2>
          <p className="text-[17px] leading-relaxed text-[#2f4a41]">{page.boundaries}</p>
          <Link href="/priser" className="inline-flex min-h-11 items-center text-forest underline underline-offset-4">Se hvordan Efero prises</Link>
        </div>
      </section>
      <section className="mx-auto max-w-site px-6 pb-16 md:px-10">
        <h2 className="mb-8 text-[32px] font-medium tracking-tight">Vanlige spørsmål</h2>
        <div className="max-w-[850px] divide-y divide-mist border-y border-mist">
          {page.faq.map(item => (
            <details key={item.q} className="group py-1">
              <summary className="cursor-pointer py-5 text-[18px] font-medium text-ink marker:text-forest">{item.q}</summary>
              <p className="mb-5 mt-0 pl-5 text-[17px] leading-relaxed text-[#2f4a41]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-site px-6 pb-20 md:px-10">
        <h2 className="mb-8 text-[28px] font-medium tracking-tight">Dette henger sammen</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {page.related.map(link => (
            <Link key={link.href} href={link.href} className="rounded-2xl border border-mist p-6 hover:border-forest">
              <h3 className="m-0 text-[19px] font-medium text-forest underline underline-offset-4">{link.label}</h3>
              <p className="mb-0 mt-4 text-[16px] leading-relaxed text-[#2f4a41]">{link.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-site px-6 py-16 md:px-10">
          <h2 className="m-0 max-w-[25ch] text-[clamp(30px,4vw,48px)] font-medium leading-tight tracking-tight">Se hvordan det passer i deres arbeidsdag.</h2>
          <p className="mb-8 mt-5 max-w-[55ch] text-[18px] leading-relaxed text-[#e4ece8]">Ta med et eksempel på en jobb dere gjør ofte. Vi viser arbeidsflyten og avklarer funksjoner, tilganger og oppsett sammen.</p>
          <Link href={DEMO_LINK} className="inline-flex min-h-12 items-center rounded-full bg-white px-7 py-3 font-medium text-forest hover:bg-[#eef2ef]">Book en demo</Link>
        </div>
      </section>
    </>
  )
}
