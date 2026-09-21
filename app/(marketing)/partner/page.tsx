import type { Metadata } from 'next'
import Link from '@/components/SiteLink'
import { PartnerApplicationForm } from '@/components/PartnerApplicationForm'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({ title: 'Bli Efero-partner',
  description: 'Kjenner du håndverksbransjen? Anbefal Efero til relevante bedrifter. Vi tar demoen, salget og kundeoppfølgingen.', path: '/partner' })

export default function PartnerPage() {
  return <>
    <section className="border-b border-mist bg-[#e8efeb]"><div className="mx-auto max-w-site px-6 py-16 md:px-10 md:py-24">
      <p className="mb-5 font-mono text-xs uppercase tracking-[.16em] text-forest">Efero Partner</p>
      <h1 className="max-w-[16ch] text-[clamp(40px,6vw,76px)] font-medium leading-[1.04] tracking-tight text-ink">Du kjenner faget.<br />Vi tar oppfølgingen.</h1>
      <p className="mt-7 max-w-[55ch] text-lg leading-8 text-[#2f4a41]">Vis håndverksbedrifter en enklere arbeidsdag med Efero. Du skaper interessen – vi tar demoen, salget og hjelper kunden i gang.</p>
      <a href="#soknad" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-forest px-7 font-semibold text-white">Bli partner</a>
    </div></section>
    <section className="mx-auto max-w-site px-6 py-16 md:px-10"><h2 className="text-3xl font-medium tracking-tight">Relevant erfaring slår store følgertall</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[#2f4a41]">Vi ser etter håndverkere, innholdsskapere og fornøyde kunder som når folk som driver håndverksbedrifter. Rør, elektro, bygg og service – det viktigste er tilliten du har hos målgruppen.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{[
        ['01', 'Bli kjent med Efero', 'Vi vurderer søknaden sammen og gir deg noe ekte å vise frem. Sats og vilkår avtales før du starter.'],
        ['02', 'Del din lenke eller kode', 'Vis Efero i arbeidshverdagen. Bedriften bestiller en demo med din personlige partnerkode.'],
        ['03', 'Velg provisjonsmodell per kunde', 'Vi følger opp interessen og oppretter kunden. Du velger månedlig provisjon eller engangsprovisjon før første utbetaling. Når du bekrefter valget, låses det.'],
      ].map(([number, title, text]) => <article key={number} className="rounded-2xl border border-mist bg-white p-7"><span className="font-mono text-sm text-forest">{number}</span><h3 className="mt-5 text-xl font-medium">{title}</h3><p className="mt-3 leading-7 text-[#466158]">{text}</p></article>)}</div>
    </section>
    <section className="bg-forest text-white">
      <div className="mx-auto grid max-w-site gap-10 px-6 py-14 md:grid-cols-2 md:px-10">
        <div>
          <h2 className="text-3xl font-medium">To modeller. Samme tak.</h2>
          <p className="mt-5 leading-7 text-white/85">Du kan få maksimalt 3 000 kr i samlet provisjon per kunde, uansett modell. Satsen avtales individuelt og fryses for kunden.</p>
          <h3 className="mt-6 text-xl font-medium">Månedlig provisjon</h3>
          <p className="mt-4 leading-7 text-white/85">Beregnes av faktisk innbetalt abonnement uten mva. de første 12 månedene. Refusjoner reduserer grunnlaget.</p>
          <h3 className="mt-6 text-xl font-medium">Engangsprovisjon</h3>
          <p className="mt-4 leading-7 text-white/85">Avtalt månedspris uten mva. × din avtalte sats for kunden × 12, maks 3 000 kr. Opptjenes først når første abonnementsbetaling og hele etableringsgebyret er bekreftet innbetalt. Etableringsgebyret inngår ikke i beregningen. Opptjent engangsprovisjon beholdes ved refusjon, uten automatisk tilbakekreving.</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Du anbefaler. Vi tar ansvaret for kunden.</h3>
          <p className="mt-4 leading-7 text-white/85">Du trenger ikke administratortilgang eller å drive kundestøtte. Vi hjelper med produktforståelse og innholdsideer. Betalt samarbeid og provisjonslenker skal merkes tydelig som reklame. Bruk av videoene dine i våre annonser avtales separat.</p>
          <p className="mt-4 leading-7 text-white/85">Eksisterende kunder og egenverving gir ikke provisjon. Første gyldige henvisning får registrert kunden. Utbetalinger håndteres manuelt etter avstemming.</p>
        </div>
      </div>
    </section>
    <section id="soknad" className="mx-auto grid max-w-site scroll-mt-24 gap-10 px-6 py-16 md:px-10 lg:grid-cols-2"><div><h2 className="text-3xl font-medium">Vil du være med?</h2><p className="mt-5 max-w-md text-lg leading-8 text-[#466158]">Vi starter med et lite utvalg partnere og følger opp hver enkelt. Fortell hvem du når, og hvordan du vil dele Efero.</p><p className="mt-6">Spørsmål? <Link href="/kontakt" className="font-medium text-forest underline">Ta kontakt med oss</Link>.</p></div><PartnerApplicationForm /></section>
  </>
}
