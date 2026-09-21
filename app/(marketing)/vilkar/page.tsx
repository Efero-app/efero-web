import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Vilkår og betingelser',
  description: 'Les vilkår og betingelser for bruk av Efero — programvaretjeneste for norske håndverkerbedrifter.',
  path: '/vilkar',
})

export default function VilkarPage() {
  return (
    <article style={{ backgroundColor: '#ffffff', padding: '96px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <h1 style={{ color: '#00281f', fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 8 }}>
          Vilkår og betingelser
        </h1>
        <p style={{ color: '#3d5c52', fontSize: 15, marginBottom: 56 }}>
          Sist oppdatert: August 2026
        </p>

        <Section heading="1. Om tjenesten">
          <p>
            Efero er en programvaretjeneste (SaaS) for håndverkerbedrifter i Norge. Tjenesten gir tilgang til jobbstyring, fakturering, tilbudsmodul og teamadministrasjon.
          </p>
          <div style={{ margin: '4px 0', padding: '20px 24px', backgroundColor: '#f5f7f5', borderRadius: 10, borderLeft: '3px solid #004c3a' }}>
            <p style={{ fontWeight: 600, color: '#00281f', marginBottom: 6 }}>Efero</p>
            <p><a href="mailto:kontakt@efero.no" style={{ color: '#004c3a', textDecoration: 'underline', textUnderlineOffset: 2 }}>kontakt@efero.no</a></p>
            <p><a href="https://efero.no" style={{ color: '#004c3a', textDecoration: 'underline', textUnderlineOffset: 2 }}>efero.no</a></p>
          </div>
        </Section>

        <Section heading="2. Hvem kan bruke Efero">
          <p>Efero er forbeholdt næringsdrivende. Ved å opprette konto bekrefter du at:</p>
          <List items={[
            'Du representerer en registrert norsk virksomhet',
            'Du er myndig og har fullmakt til å inngå avtaler på virksomhetens vegne',
            'Opplysningene du oppgir er korrekte',
          ]} />
        </Section>

        <Section heading="3. Pris og betaling">
          <p>Gjeldende grunnpriser publiseres på efero.no/priser. Valgfrie moduler og øvrige tillegg avtales skriftlig før aktivering.</p>
          <p>
            Fakturering skjer månedlig eller årlig etter avtale. Betalingsfrist er 14 dager fra fakturadato.
          </p>
          <p>
            Ved forsinket betaling påløper forsinkelsesrente i henhold til forsinkelsesrenteloven.
          </p>
          <p>
            Vi forbeholder oss retten til å justere priser med{' '}
            <strong style={{ color: '#00281f' }}>30 dagers skriftlig varsel.</strong>
          </p>
        </Section>

        <Section heading="4. Oppstart">
          <p>
            Vi hjelper deg personlig med oppsett og å komme i gang med Efero.
          </p>
        </Section>

        <Section heading="5. Prøveperiode">
          <p>
            Nye kunder får 30 dagers gratis prøveperiode uten betalingskort. Tilgjengelige funksjoner i prøveperioden følger avtalt prøveoppsett.
          </p>
          <p>
            Prøveperioden avsluttes automatisk etter 30 dager. Ønsker du å fortsette må du aktivere et betalt abonnement.
          </p>
        </Section>

        <Section heading="6. Tilgjengelighet">
          <p>
            Vi tilstreber høy tilgjengelighet for tjenesten, men garanterer ikke 100% tilgjengelighet.
          </p>
          <p>
            Planlagt vedlikehold varsles i god tid. Vi er ikke ansvarlige for tap som følge av nedetid.
          </p>
        </Section>

        <Section heading="7. Dine data">
          <p>
            Du eier alle data du legger inn i Efero — kundedata, fakturaer, jobber og bilder.
          </p>
          <p>
            Fakturaer oppbevares i 5 år i henhold til bokføringsloven.
          </p>
        </Section>

        <Section heading="8. Brukerbegrensninger">
          <p>Du forplikter deg til å ikke:</p>
          <List items={[
            'Dele innloggingsdetaljer med uautoriserte personer',
            'Bruke tjenesten til ulovlige formål',
            'Forsøke å få uautorisert tilgang til andres data',
            'Reverse-engineere eller kopiere tjenesten',
          ]} />
        </Section>

        <Section heading="9. Ansvarsbegrensning">
          <p>Efero er ikke ansvarlig for:</p>
          <List items={[
            'Indirekte tap eller følgeskader',
            'Tap som følge av feil i data du selv har lagt inn',
            'Tap som følge av at du ikke overholder norsk bokførings- eller skattelovgivning',
          ]} />
          <p>
            Vårt totale ansvar er begrenset til beløpet du har betalt for tjenesten de siste 3 månedene.
          </p>
        </Section>

        <Section heading="10. Immaterielle rettigheter">
          <p>
            Efero og alt innhold i tjenesten — programvare, design, logo og varemerker — eies av Efero.
          </p>
          <p>
            Du gis en begrenset, ikke-eksklusiv lisens til å bruke tjenesten i henhold til disse vilkårene.
          </p>
        </Section>

        <Section heading="11. Endringer i vilkårene">
          <p>
            Vi kan oppdatere disse vilkårene. Ved vesentlige endringer varsler vi deg på e-post minst 30 dager før endringen trer i kraft.
          </p>
          <p>
            Fortsatt bruk av tjenesten etter varselet anses som aksept av de nye vilkårene.
          </p>
        </Section>

        <Section heading="12. Gjeldende lov og verneting">
          <p>Denne avtalen er underlagt norsk rett.</p>
          <p>
            Tvister søkes løst i minnelighet. Dersom dette ikke lykkes, er Kristiansand tingrett avtalt verneting.
          </p>
        </Section>

        <Section heading="13. Kontakt" last>
          <p>
            Spørsmål om vilkårene?{' '}
            <a href="mailto:kontakt@efero.no" style={{ color: '#004c3a', textDecoration: 'underline', textUnderlineOffset: 2 }}>kontakt@efero.no</a>
          </p>
          <p>Vi behandler henvendelser innen 5 virkedager.</p>
        </Section>

      </div>
    </article>
  )
}

function Section({ heading, children, last = false }: { heading: string; children: React.ReactNode; last?: boolean }) {
  return (
    <section style={{ marginBottom: last ? 0 : 48, paddingBottom: last ? 0 : 48, borderBottom: last ? 'none' : '1px solid #d3ded8' }}>
      <h2 style={{ color: '#00281f', fontSize: 22, fontWeight: 600, marginBottom: 20, letterSpacing: '-0.01em' }}>
        {heading}
      </h2>
      <div style={{ color: '#3d5c52', fontSize: 16, lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {children}
      </div>
    </section>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map(item => (
        <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ color: '#004c3a', marginTop: 4, flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
