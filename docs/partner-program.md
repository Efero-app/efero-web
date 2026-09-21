# Efero Partner — lokal nettsideintegrasjon

Dette er en lokal implementasjon. Ingen publisering er godkjent.

## Flyt og eierskap

- `/partner` forklarer samarbeidet og tar imot søknader. Footer og sitemap peker hit.
- `/book-demo?partner=KODE` viser partnerkoden i skjemaet. Koden kan også skrives inn manuelt.
- `/api/partners/applications` og `/api/partners/referrals` videresender bare offentlig
  inntak til Efero Worker. De har ingen administratornøkkel eller databaseforbindelse.
- Worker validerer samtykke, aktiv kode, organisasjonsnummer, første henvisning,
  duplikater, hastighetsgrenser og gjentatte innsendinger. D1 er autoritativ.
- Søknadsbehandling, satser, kundeopprettelse, betalinger, provisjon og avregning
  styres i appens **Superadmin → Efero Partner**, ikke i denne nettsiden.
- Demo uten partnerkode beholder den eksisterende vanlige demoflyten.
- Demo med partnerkode oppretter nå også et internt e-postvarsel i Worker til
  `kontakt@efero.no`. E-posten viser partnernavn/kode, kunden, mottakstid og ønsker,
  med lenke til superadmin og kundens e-post som svaradresse. Dette bruker Workers
  bekreftede Resend-oppsett, ikke nettsidens `DEMO_NOTIFICATION_EMAIL`.
  Lokalt fanges varselet i databasen uten ekte utsending. Kunden og partneren får
  ikke denne e-posten. Det er fortsatt en forespørsel, ikke et kalenderbooket møte.

Skjemaene beholder den opprinnelige innsendingen ved usikkert svar, slik at et nytt
forsøk bruker samme operasjons-ID. En bekreftelse betyr mottatt søknad/henvisning,
ikke godkjent samarbeid, salg eller utbetaling. Det settes ingen sporingscookie
for partnerattribusjon.

Ved usikre svar, inkludert HTTP 408/425/429, beholdes samme operasjon i det åpne
skjemaet. HTTP 200 alene regnes ikke som mottaksbekreftelse; svaret må inneholde
`ok: true`. Dette gir ikke gjenoppretting etter at fanen lukkes eller lastes på nytt.
Nye partnerhenvisninger bruker norske modulnavn. Meldinger med partnerkode er
begrenset til 1500 tegn, med synlig feil hvis koden legges inn etter en lengre melding.

## Offentlig provisjonsbeskrivelse

Partnersiden følger appens `docs/product/PARTNER_SETTLEMENT_HANDOFF.md` og
`packages/domain/src/partner-settlement.ts` / `partners.ts` (lokal kandidat).
Nettsiden forklarer modellen, men beregner ikke provisjon og lagrer ikke modellvalg.

- Partneren velger månedlig eller engangsprovisjon per kunde før første utbetaling.
  Et bekreftet valg låses. Historiske utbetalinger blokkerer nytt valg.
- Begge modeller har et samlet tak på 3 000 kr per kunde. Tidligere opptjening og
  utbetaling bruker av taket; historiske beløp skrives ikke om.
- Månedlig: faktisk innbetalt netto abonnementsinntekt i de første 12 månedene,
  med fradrag for refusjoner og kundens frosne sats.
- Engangs: månedlig abonnementspris uten mva. × frossen sats × 12, avrundet til øre
  og begrenset av taket. Første abonnementsbetaling og hele det separate
  etableringsgebyret må være bekreftet innbetalt. Gebyret er ikke provisjonsgrunnlag.
- Opptjent engangsprovisjon har ingen automatisk tilbakekreving ved refusjon eller
  tidlig stopp. Nye engangsutbetalinger avregner hele beløpet én gang.
- Ingen offentlige faste satser, kundepriser eller løfter om automatiske overføringer.
  Utbetalinger håndteres manuelt etter avstemming.

## Lokal kjøring og konfigurasjon

Start først appens vanlige lokale Vite/Worker på `http://127.0.0.1:8798`, med
migrasjonene 0174–0179 (etter leverandørmigrasjonene 0172/0173). Start denne nettsiden med:

```sh
npm run dev -- --hostname 127.0.0.1 --port 3015
```

I utviklingsmodus brukes `http://127.0.0.1:8798` automatisk når
`EFERO_PARTNER_API_URL` ikke er satt. Variabelen er serverkonfigurasjon, ikke en
hemmelighet og ikke en `NEXT_PUBLIC_*`-variabel. Tillatte mål er en HTTP-loopback-
origin eller nøyaktig `https://app.efero.no`; bruk bare loopback under lokal testing.
Stier, URL-passord, søkeparametre, fragmenter og omdirigeringer tillates ikke.

En ferdig bygget lokal nettside (`npm run start`) kjører ikke i utviklingsmodus.
Den trenger derfor eksplisitt lokal adresse, også når nettleseren viser localhost:

```sh
EFERO_PARTNER_API_URL=http://127.0.0.1:8798 npm run start -- --hostname 127.0.0.1 --port 3015
```

Partnerdashboardets lokale delingslenker bruker port **3015**. En ekstra visuell
preview på 3016 erstatter ikke denne adressen; behold 3015 tilgjengelig når hele
partnerreisen skal testes. Produksjonslenkene bruker `https://efero.no`.

Dette kobler bare partnerskjemaene lokalt. Før testing av demo **uten** partnerkode
må også e-post og kontaktlagring peke til et lokalt testmottak: sett
`RESEND_API_ENDPOINT` og `RESEND_API_BASE_URL` til loopback-mottaket og bruk en
fiktiv `RESEND_API_KEY`. Ikke bruk produksjonsnøkkel eller ekte Resend-endepunkt
for lokale testsøknader. Uten testmottak skal slik innsending ikke gjennomføres.

Ved en senere, særskilt godkjent publisering må `EFERO_PARTNER_API_URL` settes til
`https://app.efero.no` i nettsidens servermiljø, og Worker-rutene/migrasjonene må være
publisert først. Uten gyldig konfigurasjon utenfor utviklingsmodus svarer skjemaet
503 og hevder ikke at innsendingen er mottatt. Ikke legg en superadmin-token her.

## Lokal kontroll

```sh
npx vitest run lib/partner-intake.test.ts
npm run typecheck
```

Test både partnersøknaden og demo med synlig partnerkode i nettleseren. Bruk bare
fiktive adresser under `example.test`. Hele kundereisen, lokale testkontoer og det
repeterbare `scripts/local-partner-verify.mts`-verktøyet er dokumentert i apprepoets
`docs/product/PARTNER_PROGRAM.md` og `scripts/README.md`.

Det finnes ingen betalingsleverandørkobling i denne integrasjonen. Innbetalinger
og allerede utførte utbetalinger registreres manuelt av superadmin med kontrollert
bilagsreferanse. Nettsiden skal aldri love automatisk utbetaling eller kundegodkjenning.

## Lokal tekstkontroll 2026-09-21

Offentlige sider, metadata og `llms`-filer er ryddet for løfter om gratis etablering
og omtale av binding/oppsigelse. Partnersiden forklarer både månedlig og engangs
provisjon, låsing av valg, grensen på 3 000 kr og de forskjellige refusjonsreglene.
`lib/public-commercial-copy.test.ts` beskytter disse tekstkravene.

Tre gamle nummererte kildekopier ble flyttet ut av repoet til
`../output/duplicate-backup-2026-09-21/` som gjenopprettbare `.txt`-filer. Unntakene
for slike filer i TypeScript-konfigurasjonen er fjernet.

Verifisert lokalt: 76 tester i 19 filer, TypeScript og produksjonsbuild består.
Den bygde partnersiden og vilkårssiden ble også kontrollert i nettleseren på
`http://127.0.0.1:3016`. Ingen push eller publisering er utført.
