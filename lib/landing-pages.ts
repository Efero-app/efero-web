export type LandingPage = {
  slug: string
  section: 'funksjoner' | 'bransjer'
  label: string
  title: string
  description: string
  heading: string
  intro: string
  outcome: string
  steps: { title: string; text: string }[]
  example: { title: string; intro: string; items: string[] }
  boundaries: string
  faq: { q: string; a: string }[]
  related: { href: string; label: string; text: string }[]
}

export const featurePages: LandingPage[] = [
  {
    slug: 'ordrestyring', section: 'funksjoner', label: 'Ordrestyring',
    title: 'Ordresystem for håndverkere',
    description: 'Samle kunder, oppdrag, timer og dokumentasjon i Efero. Et ordresystem for håndverkere med oversikt fra planlegging til fakturagrunnlag.',
    heading: 'Ordresystem for håndverkere. Hele jobben på ett sted.',
    intro: 'Adresse i en SMS. Bilder på en telefon. Avtalen i innboksen. Efero samler oppdraget, slik at kontoret og montøren kan finne det de trenger uten å lete flere steder.',
    outcome: 'Fra avtalt jobb til ferdig oppdrag',
    steps: [
      { title: 'Samle det som er avtalt', text: 'Opprett oppdraget med kunde, arbeidssted og en beskrivelse av arbeidet. Knytt tilbudet til jobben, så det avtalte innholdet kan følges videre.' },
      { title: 'Planlegg hvem som gjør hva', text: 'Fordel oppdrag og planlegg arbeidsdagen. Montøren finner informasjonen om sin jobb, mens kontoret beholder oversikten over oppdragene.' },
      { title: 'Registrer mens jobben er fersk', text: 'Før timer og materialer på riktig oppdrag. Legg til bilder, notater og dokumentasjon underveis, i stedet for å samle alt på slutten av uka.' },
      { title: 'Kontroller før fakturering', text: 'Når jobben er ferdig, gå gjennom registreringene og eventuelt ekstraarbeid. Oppdraget gir et samlet utgangspunkt for fakturaen.' },
    ],
    example: {
      title: 'Én kunde, flere oppdrag – fortsatt oversikt',
      intro: 'Eksempel: En kunde bestiller vedlikehold på flere arbeidssteder. Hvert besøk trenger sin egen plan og dokumentasjon.',
      items: ['Kontoret oppretter oppdrag for de ulike besøkene med riktig arbeidssted.', 'Montøren registrerer arbeidet på besøket det gjelder, ikke i en felles huskeliste.', 'Oppdrag kan knyttes til et prosjekt når dere trenger samlet oppfølging av tilbud, fakturering og timer.'],
    },
    boundaries: 'Prosjektoppfølgingen viser tilbud, fakturering og registrerte timer. Dette er ikke det samme som et ferdig regnskapsresultat eller en automatisk beregning av lønnskostnader.',
    faq: [
      { q: 'Hva er et ordresystem for håndverkere?', a: 'Det er et system som samler kunde, arbeidssted, avtale og registreringer rundt oppdraget. I Efero følger du jobben fra planlegging til dokumentasjon og fakturagrunnlag.' },
      { q: 'Kan vi samle flere oppdrag i ett prosjekt?', a: 'Ja. Et prosjekt kan samle oppdrag for samme kunde. Da kan dere følge opp godkjente tilbud, fakturerte beløp og timer på tvers av de tilknyttede jobbene.' },
      { q: 'Må alle ansatte ha samme tilgang?', a: 'Nei. Tilgangen styres etter rolle og oppsett i bedriften. I en demo viser vi forskjellen på arbeidsflaten for kontoret og for montøren.' },
    ],
    related: [
      { href: '/funksjoner/timeforing', label: 'Timeføring på oppdrag', text: 'Få arbeidstimene inn på jobben de tilhører.' },
      { href: '/funksjoner/tilbud', label: 'Fra tilbud til oppdrag', text: 'Ta med avtalen videre når kunden sier ja.' },
      { href: '/ressurser/prosjektokonomi-i-efero', label: 'Forstå prosjektoppfølgingen', text: 'Se forskjellen på fakturert beløp og regnskapsmargin.' },
    ],
  },
  {
    slug: 'timeforing', section: 'funksjoner', label: 'Timeføring',
    title: 'Timeregistrering for håndverkere',
    description: 'Før timer på riktig oppdrag i Efero. Timeregistrering for håndverkere med oversikt over registrert arbeid og grunnlaget for videre oppfølging.',
    heading: 'Timeregistrering for håndverkere. Få med timene mens du husker dem.',
    intro: 'En halvtime her og en ekstra tur der er lett å glemme. Med timeføring i Efero knytter du arbeidet til oppdraget mens du fortsatt husker hva du gjorde.',
    outcome: 'Fra utført arbeid til registrerte timer',
    steps: [
      { title: 'Velg riktig jobb', text: 'Finn oppdraget du har jobbet på. Da blir tiden knyttet til kunden og arbeidet den faktisk gjelder, i stedet for å ligge i et separat regneark.' },
      { title: 'Registrer arbeidet', text: 'Legg inn tiden og en tydelig beskrivelse. Registrer underveis eller når arbeidsøkten er ferdig, før små oppgaver forsvinner fra hukommelsen.' },
      { title: 'Gå gjennom dine timer', text: 'Se registreringene samlet og kontroller at dato, oppdrag og tidsbruk stemmer. Følg bedriftens rutiner for korrigering og godkjenning.' },
      { title: 'Følg opp fra kontoret', text: 'Kontoret får registrerte timer på oppdraget. Sammen med materialer og avtalt arbeid gir det et bedre grunnlag for kontroll før fakturering.' },
    ],
    example: {
      title: 'Tre servicejobber på én dag',
      intro: 'Eksempel: En montør er innom tre kunder. På den siste jobben ber kunden om en ekstra oppgave.',
      items: ['Tiden registreres på hvert oppdrag, slik at kundene ikke blandes sammen.', 'Ekstraarbeidet beskrives på jobben. Timeregistrering alene erstatter ikke en avtale med kunden.', 'Før dagen avsluttes, går montøren gjennom registreringene. Kontoret kan følge opp mangler før fakturaen lages.'],
    },
    boundaries: 'Registrerte timer er ikke automatisk lik fakturerbare timer eller ferdig lønn. Avtaler, godkjenninger og bedriftens rutiner avgjør videre behandling. Nettløsningen krever nettilgang; den separate mobilappen er ikke lansert.',
    faq: [
      { q: 'Kan jeg føre timer fra mobilen?', a: 'Eferos nettløsning fungerer i nettleseren på mobil og PC. Den separate appen for iOS og Android kommer senere. Du trenger nettilgang for å bruke løsningen.' },
      { q: 'Er timeføring og timeregistrering det samme?', a: 'Begrepene brukes om å registrere arbeidstid. I Efero knyttes oppdragstimene til en bestemt jobb, slik at dere kan følge opp tiden i riktig sammenheng.' },
      { q: 'Blir alle registrerte timer automatisk fakturert?', a: 'Nei. Registreringene må vurderes opp mot avtalen og kontrolleres før fakturering. Det er særlig viktig ved fastpris, ekstraarbeid eller registreringer som skal korrigeres.' },
    ],
    related: [
      { href: '/funksjoner/ordrestyring', label: 'Hold orden på oppdragene', text: 'Samle plan, timer og dokumentasjon på samme jobb.' },
      { href: '/ressurser/fra-tilbud-til-faktura', label: 'Fra tilbud til faktura', text: 'Kontroller arbeid og registreringer før fakturering.' },
      { href: '/jobbsjekk', label: 'Er jobben klar for faktura?', text: 'Sjekk timer, materialer og dokumentasjon med fem spørsmål.' },
    ],
  },
  {
    slug: 'tilbud', section: 'funksjoner', label: 'Tilbud',
    title: 'Tilbudsprogram for håndverkere',
    description: 'Lag oversiktlige pristilbud med arbeid, materialer og MVA i Efero. Send kundelenke, følg svaret og ta avtalen videre til oppdrag og faktura.',
    heading: 'Tilbudsprogram for håndverkere. Gjør det enkelt å si ja til jobben.',
    intro: 'Et godt pristilbud gjør det tydelig hva kunden får. I Efero legger du inn arbeidet og materialene, kontrollerer summen og sender et tilbud kunden kan svare på.',
    outcome: 'Fra befaring til sendt pristilbud',
    steps: [
      { title: 'Velg kunde og beskriv oppdraget', text: 'Gi tilbudet en tydelig tittel og beskriv hva som inngår. Knytt det gjerne til et oppdrag, og legg inn svarfrist når det er relevant.' },
      { title: 'Legg inn arbeid og materialer', text: 'Bruk manuelle linjer med beskrivelse, mengde, enhet, pris og MVA. Kontroller forhåndsvisningen og skill tydelig mellom inkludert arbeid og mulige tillegg.' },
      { title: 'Send tilbudet og følg svaret', text: 'Last ned PDF eller send en sikker kundelenke. Kunden kan stille spørsmål, godkjenne eller avslå. Status og hendelser følger tilbudet.' },
      { title: 'Ta avtalen videre', text: 'Når kunden aksepterer, bruker dere avtalen som grunnlag for oppdraget. Kontroller registrert arbeid og dokumenterte endringer før fakturaen opprettes.' },
    ],
    example: {
      title: 'Et tydelig tilbud på en servicejobb',
      intro: 'Eksempel: Du har vært på befaring og skal sende pris på utskifting av utstyr.',
      items: ['Beskriv hvilket utstyr og arbeid tilbudet omfatter, og hva kunden må gjøre klart.', 'Legg inn arbeid og materialer på forståelige linjer. Kontroller mengder, priser og avgiftsbehandling.', 'Send kunden tilbudet. Hvis omfanget endres, avklar og dokumenter endringen før dere går videre.'],
    },
    boundaries: 'Denne tilbudsflyten bygger på manuelle linjer. Den innebærer ikke automatisk anbudskalkulasjon, et komplett materialbibliotek eller ferdig EDI-kobling til grossister. Kundens godkjenning omtales ikke som BankID-signering.',
    faq: [
      { q: 'Kan kunden svare på tilbudet uten å bruke kontorløsningen?', a: 'Ja. Kunden får en egen lenke for å se tilbudet og kan sende spørsmål, godkjenne eller avslå. Svaret registreres på tilbudet i Efero.' },
      { q: 'Kan jeg laste ned tilbudet som PDF?', a: 'Ja. Du kan forhåndsvise tilbudet og laste ned PDF. Kontroller alltid innhold og beløp før du sender det til kunden.' },
      { q: 'Er dette et kalkulasjonsprogram for bygg?', a: 'Denne siden beskriver tilbud med manuelle prislinjer. Hvis dere trenger avansert kalkulasjon, prisbiblioteker eller bestemte integrasjoner, avklar behovet med oss før dere velger løsning.' },
    ],
    related: [
      { href: '/ressurser/lag-enkelt-pristilbud', label: 'Slik lager du et pristilbud', text: 'En praktisk guide til manuelle linjer og forhåndsvisning.' },
      { href: '/ressurser/folg-opp-sendte-tilbud', label: 'Følg opp sendte tilbud', text: 'Hold oversikt over spørsmål og svar fra kunden.' },
      { href: '/funksjoner/ordrestyring', label: 'Planlegg jobben når kunden sier ja', text: 'Samle avtale og utførelse på riktig oppdrag.' },
    ],
  },
]

export const industryPages: LandingPage[] = [
  {
    slug: 'elektriker', section: 'bransjer', label: 'For elektrikere',
    title: 'System for elektrikere – ordre og timeføring',
    description: 'Efero samler tilbud, oppdrag, timer, materiell og dokumentasjon for elektrikerbedrifter. Se arbeidsflyten fra serviceoppdrag til fakturagrunnlag.',
    heading: 'Et system for elektrikere. Fra serviceoppdrag til fakturagrunnlag.',
    intro: 'Montøren trenger å vite hvor jobben er og hva som er avtalt. Kontoret trenger å vite hva som er gjort. Efero samler oppdrag, timer, materiell og dokumentasjon rundt den samme elektrojobben.',
    outcome: 'Én arbeidsflyt for elektrobedriften',
    steps: [
      { title: 'Før montøren kjører ut', text: 'Legg kunde, adresse, beskrivelse og avtalt arbeid på oppdraget. Planlegg hvem som skal utføre jobben, slik at informasjonen følger med ut.' },
      { title: 'Mens arbeidet utføres', text: 'Registrer timer og brukt materiell på jobben. Ta vare på bilder og notater som forklarer hva som er gjort og hva som må følges opp.' },
      { title: 'Når kunden ønsker mer', text: 'Avklar ekstraarbeid og dokumenter endringen. Et nytt ønske skal ikke bare ende i en SMS som kontoret aldri ser.' },
      { title: 'Tilbake på kontoret', text: 'Kontroller avtale, timer, materiell og dokumentasjon før fakturering. Da er det lettere å oppdage mangler mens montøren fortsatt husker jobben.' },
    ],
    example: {
      title: 'Eksempel: et avtalt servicebesøk',
      intro: 'En kunde har meldt feil på en installasjon. Under besøket kommer det fram et ønske om mer arbeid.',
      items: ['Montøren finner arbeidsbeskrivelse og kundens kontaktinformasjon på oppdraget.', 'Utført arbeid, tid og materiell registreres. Det nye ønsket beskrives og avklares separat.', 'Kontoret følger opp det avtalte omfanget og kontrollerer fakturagrunnlaget. Faglig kontroll og påkrevd dokumentasjon håndteres etter bedriftens rutiner.'],
    },
    boundaries: 'Efero erstatter ikke elektrikerens faglige ansvar eller kontroll av lovpålagt dokumentasjon. Denne siden lover ikke automatisk samsvarserklæring, innsending til Boligmappa eller tilkobling til en bestemt grossist. Avklar slike behov i demoen.',
    faq: [
      { q: 'Passer Efero for en liten elektrikerbedrift?', a: 'Arbeidsflyten er laget for håndverksbedrifter som vil samle oppdrag, tilbud og registreringer. I demoen går vi gjennom deres bemanning og oppdragstyper for å se om løsningen passer.' },
      { q: 'Kan kontoret og montørene jobbe i samme system?', a: 'Ja. Informasjonen samles i Efero, mens det den enkelte kan se og gjøre styres av rolle og bedriftens oppsett.' },
      { q: 'Får vi automatisk grossistkobling og all elektrodokumentasjon?', a: 'Ikke legg dette til grunn uten avklaring. Fortell hvilke grossister, skjemaer og integrasjoner dere trenger, så gjennomgår vi hva som støttes og hva som krever andre løsninger.' },
    ],
    related: featurePages.map(page => ({ href: `/funksjoner/${page.slug}`, label: page.label, text: page.description })),
  },
  {
    slug: 'rorlegger', section: 'bransjer', label: 'For rørleggere',
    title: 'System for rørleggere og VVS-bedrifter',
    description: 'Samle serviceoppdrag, tilbud, timer, materialer og dokumentasjon i Efero. Et system for rørleggere med oversikt for både kontoret og folk ute på jobb.',
    heading: 'Et system for rørleggere. Hold orden på servicejobbene.',
    intro: 'En lekkasje, et planlagt bytte og et nytt vedlikeholdsbesøk. Når dagen endrer seg, trenger både rørleggeren og kontoret ett sted å finne avtalen, arbeidsstedet og det som er gjort.',
    outcome: 'Fra kundehenvendelse til ferdig servicejobb',
    steps: [
      { title: 'Beskriv behovet før besøket', text: 'Samle kundens opplysninger, arbeidssted og hva dere skal undersøke eller utføre. Lag et tilbud når omfanget er avklart.' },
      { title: 'Planlegg besøket', text: 'Fordel oppdraget og legg inn informasjon som gjør det lettere å møte forberedt. Hold planlagte besøk og endringer samlet i arbeidsoversikten.' },
      { title: 'Få med forbruk og dokumentasjon', text: 'Før timer, materialer, bilder og notater på servicejobben. Beskriv hva som er skiftet eller kontrollert, så neste oppfølging får et bedre utgangspunkt.' },
      { title: 'Gjør klart for videre oppfølging', text: 'Kontroller at registreringene stemmer med avtalen. Følg opp gjenstående arbeid og fakturagrunnlag uten å samle informasjon fra flere telefoner.' },
    ],
    example: {
      title: 'Eksempel: utskifting hos en eksisterende kunde',
      intro: 'Et planlagt utstyrsbytte skal gjennomføres, og kunden ønsker samtidig at dere ser på et annet problem.',
      items: ['Tilbud og beskrivelse av det planlagte byttet ligger på jobben.', 'Rørleggeren registrerer medgått tid, deler og bilder fra arbeidet.', 'Det andre problemet noteres og avklares som videre arbeid. Kontoret kan skille den opprinnelige avtalen fra et nytt oppdrag.'],
    },
    boundaries: 'Registreringer og servicerapporter erstatter ikke faglig vurdering eller påkrevd dokumentasjon for den enkelte installasjonen. Støtte for spesifikke grossister, prisfiler og regnskapssystemer må avklares før oppstart.',
    faq: [
      { q: 'Kan vi samle flere besøk hos samme kunde?', a: 'Dere kan ha flere oppdrag knyttet til en kunde og bruke prosjekter når jobbene skal følges opp samlet. Vi viser hvordan dette passer deres service- og vedlikeholdsarbeid i demoen.' },
      { q: 'Hvordan unngår vi at smådeler blir glemt?', a: 'Registrer materialene på oppdraget mens arbeidet er ferskt. Gå gjennom materialer og timer før fakturering. Systemet gir et sted å samle forbruket, men rutinen må følges av dem som gjør jobben.' },
      { q: 'Trenger vi en egen mobilapp for å komme i gang?', a: 'Nei. Nettløsningen fungerer i nettleseren på mobil og PC med nettilgang. Den separate mobilappen er fortsatt under arbeid.' },
    ],
    related: [
      { href: '/funksjoner/ordrestyring', label: 'Samle serviceoppdragene', text: 'Plan, arbeidssted og utført arbeid følger samme jobb.' },
      { href: '/funksjoner/timeforing', label: 'Registrer timer underveis', text: 'Få med tiden på hvert besøk.' },
      { href: '/funksjoner/tilbud', label: 'Send et tydelig pristilbud', text: 'Avklar arbeid og materialer før jobben starter.' },
    ],
  },
]

export const landingPages = [...featurePages, ...industryPages]

export function landingPage(section: LandingPage['section'], slug: string) {
  return landingPages.find(page => page.section === section && page.slug === slug)
}
