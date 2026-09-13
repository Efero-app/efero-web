import type { Metadata } from 'next'
import Link from '@/components/SiteLink'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Personvernerklæring',
  description: 'Les om hvordan Efero samler inn, bruker og beskytter dine personopplysninger.',
  path: '/personvern',
})

export default function PersonvernPage() {
  return (
    <article style={{ backgroundColor: '#ffffff', padding: '96px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <h1 style={{ color: '#00281f', fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 8 }}>
          Personvernerklæring
        </h1>
        <p style={{ color: '#3d5c52', fontSize: 15, marginBottom: 56 }}>
          Sist oppdatert: August 2026
        </p>

        <Section heading="1. Hvem vi er">
          <p>
            Efero er en norsk programvaretjeneste for håndverkerbedrifter. Tjenesten leveres av:
          </p>
          <div style={{ margin: '16px 0', padding: '20px 24px', backgroundColor: '#f5f7f5', borderRadius: 10, borderLeft: '3px solid #004c3a' }}>
            <p style={{ fontWeight: 600, color: '#00281f', marginBottom: 6 }}>Efero</p>
            <p>E-post: <a href="mailto:kontakt@efero.no" style={{ color: '#004c3a', textDecoration: 'underline', textUnderlineOffset: 2 }}>kontakt@efero.no</a></p>
            <p>Nettside: <a href="https://efero.no" style={{ color: '#004c3a', textDecoration: 'underline', textUnderlineOffset: 2 }}>efero.no</a></p>
          </div>
          <p>
            Vi er databehandler for dataene som lagres i tjenesten. Du som bedriftseier er behandlingsansvarlig for dine kunders og ansattes personopplysninger.
          </p>
        </Section>

        <Section heading="2. Hvilke personopplysninger vi samler inn">
          <SubHeading>Om deg som bruker (admin):</SubHeading>
          <List items={[
            'Navn og e-postadresse',
            'Telefonnummer',
            'Bedriftsnavn og organisasjonsnummer',
            'Betalingsinformasjon (håndteres av Stripe — vi lagrer ikke kortdetaljer)',
          ]} />
          <SubHeading>Om deg som står på ventelisten:</SubHeading>
          <List items={[
            'Navn, jobb-e-post og bedriftsnavn',
            'Telefonnummer dersom du velger å oppgi det',
            'Fagområde og antall ansatte',
          ]} />
          <SubHeading>Om dine kunder:</SubHeading>
          <List items={[
            'Navn, adresse og telefonnummer',
            'Jobbhistorikk og fakturaer',
          ]} />
          <SubHeading>Om dine teknikere:</SubHeading>
          <List items={[
            'Navn og telefonnummer',
            'Jobber utført og tidspunkter',
          ]} />
          <SubHeading>Tekniske data:</SubHeading>
          <List items={[
            'IP-adresse ved innlogging',
            'Nettleser og enhetsinformasjon',
            'Tidspunkter for innlogging og bruk av tjenesten',
          ]} />
        </Section>

        <Section heading="3. Hvorfor vi samler inn data">
          <p style={{ marginBottom: 16 }}>Vi bruker personopplysningene for å:</p>
          <List items={[
            'Levere og drifte tjenesten Efero',
            'Sende fakturaer og tilbud på dine vegne til dine kunder',
            'Sende deg viktige varsler om tjenesten',
            'Kontakte deg om tidlig tilgang når du har meldt deg på ventelisten',
            'Forbedre tjenesten over tid',
            'Overholde norsk bokføringslov (fakturaer oppbevares i 5 år)',
          ]} />
          <p style={{ marginTop: 16, fontWeight: 600, color: '#00281f' }}>
            Vi selger aldri personopplysninger til tredjepart.
          </p>
        </Section>

        <Section heading="4. Hvem vi deler data med">
          <p style={{ marginBottom: 20 }}>Vi deler data med følgende underleverandører:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: 'Supabase', desc: 'databaselagring (servere i EU, Frankfurt)' },
              { name: 'Stripe', desc: 'betalingsbehandling (PCI DSS-sertifisert)' },
              { name: 'Resend', desc: 'e-postutsending (servere i EU)' },
            ].map(p => (
              <div key={p.name} style={{ padding: '14px 18px', backgroundColor: '#f5f7f5', borderRadius: 10, display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span style={{ color: '#00281f', fontWeight: 600, minWidth: 90 }}>{p.name}</span>
                <span style={{ color: '#3d5c52', fontSize: 14 }}>{p.desc}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16 }}>
            Alle underleverandører er bundet av databehandleravtaler og behandler data kun på våre vegne.
          </p>
        </Section>

        <Section heading="5. Hvor lenge vi lagrer data">
          <List items={[
            'Kontodata: så lenge kontoen er aktiv + 30 dager etter sletting',
            'Fakturaer: 5 år (påkrevd av bokføringsloven)',
            'Tekniske logger: 90 dager',
            'Ventelistedata: til du ber om sletting, trekker samtykket eller blir kunde',
          ]} />
        </Section>

        <Section heading="6. Dine rettigheter">
          <p style={{ marginBottom: 16 }}>Etter GDPR har du rett til å:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { right: 'Innsyn', desc: 'Få en kopi av alle opplysninger vi har om deg' },
              { right: 'Retting', desc: 'Korrigere feilaktige opplysninger' },
              { right: 'Sletting', desc: 'Be om at opplysninger slettes (der loven tillater det)' },
              { right: 'Dataportabilitet', desc: 'Motta dine data i et maskinlesbart format' },
              { right: 'Klage', desc: 'Til Datatilsynet på datatilsynet.no' },
            ].map(r => (
              <div key={r.right} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span style={{ color: '#00281f', fontWeight: 600, minWidth: 140 }}>{r.right}</span>
                <span style={{ color: '#3d5c52', fontSize: 15 }}>{r.desc}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            For å bruke rettighetene dine, kontakt oss på{' '}
            <a href="mailto:kontakt@efero.no" style={{ color: '#004c3a', textDecoration: 'underline', textUnderlineOffset: 2 }}>kontakt@efero.no</a>.{' '}
            Vi svarer innen 30 dager.
          </p>
        </Section>

        <Section heading="7. Informasjonskapsler (cookies)">
          <p>
            Efero bruker kun nødvendige cookies for innlogging og sesjonshåndtering. Vi bruker ikke sporings- eller markedsføringscookies.
          </p>
        </Section>

        <Section heading="8. Sikkerhet">
          <p style={{ marginBottom: 16 }}>Vi beskytter dine data med:</p>
          <List items={[
            'Kryptering i overføring (HTTPS/TLS)',
            'Kryptering i lagring',
            'Tilgangskontroll per bedrift (multi-tenancy med RLS)',
            'Regelmessige sikkerhetsvurderinger',
          ]} />
        </Section>

        <Section heading="9. Endringer i denne erklæringen">
          <p>
            Vi kan oppdatere denne erklæringen. Ved vesentlige endringer varsler vi deg på e-post minst 30 dager før endringen trer i kraft.
          </p>
        </Section>

        <Section heading="10. Kontakt oss" last>
          <p>
            Spørsmål om personvern? Kontakt oss på{' '}
            <a href="mailto:kontakt@efero.no" style={{ color: '#004c3a', textDecoration: 'underline', textUnderlineOffset: 2 }}>kontakt@efero.no</a>
          </p>
          <p style={{ marginTop: 8 }}>Vi behandler henvendelser innen 30 dager.</p>
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

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: '#00281f', fontWeight: 600, fontSize: 15, marginTop: 8, marginBottom: 4 }}>
      {children}
    </p>
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
