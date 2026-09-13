# EFERO – plan for kontrakt på SMS med PDF og BankID

Dato: 10. september 2026. Leveranse: implementeringsplan, ikke en aktiv signeringstjeneste.

## Anbefalt løsning

Bygg et internt kontraktpanel på Efero.no. EFERO oppretter kontrakten, laster opp en ferdig PDF og sender kunden en personlig SMS-lenke. Kunden åpner EFEROs kontraktside, leser PDF-en og går videre til leverandørens BankID-signering. Etter bekreftet signering lagres den signerte PDF-en hos EFERO, og status oppdateres automatisk.

Bruk en signeringsleverandørs dokument-API. En separat BankID-innlogging er ikke den foreslåtte løsningen: signeringen skal knyttes til den konkrete PDF-en og levere et etterprøvbart signert dokument.

Arbeidsantakelse: Dette gjelder EFEROs egne kundeavtaler, med én kundesignatur som standard. Antall signatarer skal likevel kunne konfigureres. Det er ikke en beslutning om at alle avtaler juridisk bare trenger én signatur.

## Hva prosjektet har i dag

- `efero-web/package.json`: Next.js 15, React 19 og Supabase-klient.
- `efero-web/wrangler.jsonc`: OpenNext/Cloudflare Worker med ruting for efero.no og www.efero.no.
- `app/tilbud/[id]/page.tsx`: dynamisk tilbudsside med token i lenken.
- `app/actions/quote.ts`: RPC-kall for å hente tilbud og godta/avslå. Denne koden viser ingen BankID-integrasjon.
- `middleware.ts`: domeneomdirigering, ikke en intern administratorkontroll.

Dette er funn i lokal kode. Live database, produksjonshemmeligheter og publisert versjon er ikke verifisert. Nettleserverktøyet fikk ikke hentet efero.no i denne undersøkelsen.

Opprett egne kontraktruter og tabeller. Eksisterende tilbudsgodkjenning skal ikke kunne registrere en BankID-kontrakt som signert.

## Leverandørvalg og kostnad

SignIt er første kandidat ut fra de publiserte prisene. Leverandøren bekrefter at de tilbyr API, men offentlig teknisk dokumentasjon for den norske/danske tjenesten ble ikke funnet. Dokumentasjon for signit.sa gjelder en annen tjeneste og skal ikke brukes her. [SignIt om API](https://www.signit.com/faq/).

Den norske prislisten oppgir Business Plus til 69 kr per bruker/måned, 250 signaturer til 3 kr stykket og SMS-varsling til 1,95 kr stykket. Den lister også nettjenestebruker for integrasjon med eksterne systemer til 299 kr/måned. [SignIt-priser](https://www.signit.no/priser/).

Foreløpig scenario for én intern bruker, 250 kundesignaturer og 250 SMS:

| Post | NOK/måned |
| --- | ---: |
| Business Plus | 69,00 |
| 250 BankID-signaturer | 750,00 |
| 250 SMS | 487,50 |
| Mulig integrasjonstillegg | 299,00 |
| Sum dersom tilleggene gjelder slik | 1 605,50 |

Dette er en beregning, ikke et leverandørtilbud. Mva., API-pakkens vilkår, eventuelle etableringskostnader, SMS-avsender og hva som belastes ved avbrutt signering må bekreftes. Ekstra SMS/påminnelser og flere signatarer gir flere transaksjoner. Databaselagring, drift og utvikling kommer i tillegg. Ved egen SMS-leverandør erstattes SMS-posten med dennes pris. Månedspakken kan innebære betaling for ubrukt kapasitet; avklar overføring og overforbruk.

Scrive er alternativet dersom SignIt ikke kan levere kravene. Der finnes offentlig dokument-API med PDF, signeringslenker, SMS-tekst, callbacks og norsk BankID QES (`no_bankid_qes`). API-pris må innhentes separat; tidligere portalpris på 490 kr er ikke et API-tilbud. [Dokument-API](https://apidocs.scrive.com/), [API-priser](https://www.scrive.com/no/priser/esign-api), [norsk BankID QES](https://tech.scrive.com/esign-002-2025/).

Valgregel: Velg SignIt hvis de bekrefter hele flyten, gir testtilgang og et konkurransedyktig totaltilbud. Ellers bruk Scrive. Ikke kjøp en volumavtale før API-kravene er bekreftet.

## Kundeopplevelsen

1. Du åpner `/admin/kontrakter`, velger «Ny kontrakt» og fyller inn bedrift, org.nr., signatar, rolle/fullmakt, mobilnummer, e-post og frist.
2. Du laster opp ferdig kontrakt-PDF med pris, leveranse og vilkår. Systemet viser dokument og SMS til gjennomlesning.
3. Du trykker «Send på SMS». Systemet fryser dokumentversjonen, oppretter signeringssaken og sender lenken én gang.
4. Kunden mottar eksempelvis: «EFERO har sendt deg en avtale: EFERO x BEDRIFT. Les og signer med BankID: https://efero.no/s/[personlig-kode]». Dette er foreslått URL-struktur, ikke en aktiv lenke.
5. Lenken åpner en mobiltilpasset side med EFERO-logo, avsender, avtaletittel, frist, PDF-visning/nedlasting og «Signer med BankID».
6. Knappen åpner leverandørens sikre signeringsside, der kunden får dokumentet og gjennomfører BankID-signeringen. BankID kan åpne egen app. Hele signeringen trenger ikke foregå på efero.no.
7. Kunden kommer tilbake til en kvitteringsside. EFERO viser «Kontrollerer signering» til serveren har bekreftet resultatet. Deretter får kunden tilgang til signert PDF.
8. I admin ser du signeringsstatus og kan laste ned signert PDF og signeringsbevis. Automatisk onboarding kobles på etter at denne kjeden er verifisert.

Avsendernavnet EFERO i telefonens SMS-innboks, EFERO i meldingsteksten og et efero.no-domene i lenken er tre separate funksjoner. Alle tre skal testes. Leverandørens standard-SMS kan inneholde deres egen lenke.

## Teknisk oppdeling

**Nettside:** Nye Next.js-sider for intern administrasjon og offentlig kontraktvisning. Admin får Supabase Auth og eksplisitt EFERO-medlemskap/rolle som kontrolleres på serveren for alle handlinger. Ingen offentlig registrering skal gi senderrettigheter.

**Data:** Bruk eksisterende Supabase dersom produksjonsoppsettet er egnet etter kontroll. Opprett separate tabeller for `sales_contracts`, `sales_contract_versions`, `sales_contract_signers`, `sales_contract_events` og `sales_contract_dispatches`. Lagre leverandørens saks-ID, låst PDF-versjon og hash, signatarer, frist, tidsstempler, status og filreferanser. Skill signeringsstatus, SMS-levering og arkiveringsstatus.

**Filer:** Original PDF, endelig signert PDF og bevis lagres i privat filområde med tilgangskontroll. Opprett kortvarige nedlastingslenker etter tilgangssjekk. Første versjon bruker PDF-opplasting; malbasert PDF-generering kan legges til etterpå. En endring i sendt PDF krever ny versjon og tilbakekalling av den gamle signeringssaken.

**Integrasjon:** Lag et servermodulgrensesnitt for opprettelse, signeringslenke, status, nedlasting og kansellering. Implementer én leverandør først. API-nøkler holdes på serveren og skilles mellom test og produksjon.

**SMS:** Bruk leverandørens utsendelse hvis den kan sende ønsket EFERO-lenke og avsender. Hvis den bare sender egen signeringslenke, bruk et separat SMS-API som sender EFEROs lenke og skru av automatisk leverandørinvitasjon. SignIt må bekrefte at signeringslenken kan hentes og automatisk invitasjon kan undertrykkes. Én utsendelsesmotor skal eie invitasjonen.

**Bakgrunnsarbeid:** En Cloudflare-kø/Worker med planlagt statuskontroll foreslås for opprettelse, sending, gjentakelser og arkivering. Dette krever nye bindings og utrulling; det finnes ikke i den inspiserte web-konfigurasjonen. Lagre hvert arbeidssteg før neste eksterne kall. Ved timeout etter opprettelse må saken avstemmes mot leverandøren før ny opprettelse, slik at dobbeltklikk og nettverksfeil ikke gir doble saker eller kostnader.

Foreslåtte EFERO-endepunkter, ikke leverandørens API-adresser:

| Endepunkt | Formål |
| --- | --- |
| `POST /api/admin/contracts` | Opprett kladd og PDF-versjon |
| `POST /api/admin/contracts/:id/send` | Valider og legg signeringssak/SMS i kø |
| `GET /api/admin/contracts/:id` | Status, hendelser og private filreferanser |
| `POST /api/admin/contracts/:id/cancel` | Tilbakekall saken og lenken |
| `POST /api/admin/contracts/:id/remind` | Send kontrollert påminnelse |
| `POST /api/contracts/sign` | Valider kundens tilgang og hent signeringslenke |
| `POST /api/integrations/signing/callback` | Ta imot leverandørhendelse og kølegg verifisering |

Callback-behandleren skal følge leverandørens dokumenterte autentisering. Ikke anta at SignIt har signerte webhooks. Hent uansett oppdatert status gjennom autentisert server-API før lokal signeringsstatus endres. Dedupliser hendelser og hent status periodisk for å fange opp tapte callbacks. En retur fra nettleseren er aldri tilstrekkelig signeringsbevis.

Statusmodell: kladd → klargjøres → venter på signering → signert. Avvist, utløpt og kansellert er egne utfall. Signert registreres først når alle påkrevde signatarer er bekreftet. Vis separat varsel hvis arkivering av signert PDF fortsatt pågår eller feiler.

## Tilgang og dokumentintegritet

- Kontraktlenker bruker tilfeldig, uforutsigbar kode med frist og tilbakekalling; lagre hash av koden. Koden skal ikke inneholde navn eller org.nr.
- Bytt kode til en begrenset sesjon og omdiriger til ren URL. Ingen analysepiksler på kontraktsidene; bruk `no-store`, `noindex` og `Referrer-Policy: no-referrer`, og maskér tokens i logger.
- GET på en SMS-lenke må ikke starte signering, endre avtalen eller bruke opp lenken: automatiske lenkeskannere åpner også URL-er.
- Signeringsknappen skal alltid bruke den låste PDF-versjonen som ble sendt. Ingen endringer i pris eller vedlegg etter utsendelse uten ny sak.
- Bruk RLS og serverkontroll for EFEROs interne data. Linktilgang gir bare tilgang til den aktuelle kontrakten. Vurder ekstra verifisering før PDF-visning hvis dokumentet har sensitivt innhold.
- Identifisert signatar og eventuell fullmakt håndteres eksplisitt; dokumenter avvik fra forventet signatar. Ikke samle inn BankID-hemmeligheter eller fødselsnummer i EFERO-skjema uten et konkret dokumentert behov.
- Avklar databehandleravtale, lagringstid og sletting med valgt leverandør før produksjon.

## Gjennomføring og ferdigkriterier

1. **Leverandøravklaring:** Innhent API-dokumentasjon, testkonto, samlet pris og bekreftelse på EFERO-lenke/SMS. Ferdig når kravene nedenfor kan demonstreres i test. Eier: EFERO og leverandør.
2. **Intern kontraktmodul:** Bygg innlogging/roller, kundeopplysninger, privat PDF-opplasting, låsing og forhåndsvisning. Ferdig når bare godkjent EFERO-bruker kan opprette og sende.
3. **API og SMS:** Bygg leverandørmodul, kø, personlig lenke og utsendelse. Ferdig når én send-handling oppretter én sak og sender én SMS med korrekt PDF.
4. **BankID og arkiv:** Koble signeringsknapp, serververifisering, avbrudd, kansellering og nedlasting av signert dokument. Ferdig når en testkunde kan lese, signere og hente PDF på mobil.
5. **Produksjonspilot:** Konfigurer produksjonstilgang og gjennomfør en avtalt intern prøvesignering før kundeutsendelse. Kontroller regning/transaksjonslogg og at signert PDF lar seg validere med leverandørens valideringsmetode.

Test særlig: iPhone/Android, feil/utløpt lenke, avbrutt BankID, avvist avtale, dobbel send, leverandør-timeout, SMS-feil, doble/tapte callbacks, falsk nettleserretur, uautorisert admin og feil ved PDF-arkivering. Ikke send ny SMS eller opprett ny sak automatisk bare fordi kvitteringen mangler.

Planen er ferdig når flyt, systemendringer, leverandøravhengigheter, kostnader og akseptansetester er beskrevet. Implementeringen er en senere leveranse; ingen konto er opprettet, SMS sendt eller produksjonskode endret gjennom denne planleggingen.

## Klar forespørsel til SignIt – ikke sendt

Hei! EFERO ønsker å sende egne kundeavtaler fra Efero.no gjennom deres API. Vi vil laste opp en PDF, opprette en signeringssak med norsk BankID, sende SMS fra EFERO med lenke til vår egen kontraktside og hente den signerte PDF-en automatisk etterpå.

Kan dere sende API-dokumentasjon og testtilgang, og bekrefte:

- Hvordan opprette sak, hente personlig signeringslenke og deaktivere standardinvitasjon?
- Støttes egen SMS-tekst, EFERO som avsender og vår efero.no-lenke? Hva koster dette?
- Hvordan får vi status/callback, og hvordan autentiseres callbacks? Kan vi kansellere, sette frist og laste ned signert PDF med signeringsbevis?
- Hvilken norsk BankID-signering og hvilket dokumentformat/signaturbevis leveres? Hvordan kontrolleres forventet signatar?
- Gjelder 69 kr/mnd. for Business Plus, 299 kr/mnd. for integrasjon, 3 kr per signatur ved 250/mnd. og 1,95 kr per SMS samlet for denne bruken?
- Hvilke etableringskostnader, minstebeløp, mva.-vilkår og priser for overforbruk, avbrutte signeringer og ekstra SMS gjelder? Kan ubrukte signaturer overføres?
- Hvilke avtaler gjelder for databehandling, arkivering, eksport og sletting?

Vi ønsker totalpris for én intern bruker og henholdsvis 25 og 250 kundesignaturer per måned.
