export type ResourceArticle = {
  slug: string
  title: string
  description: string
  updatedAt: string
  eyebrow: string
  intro: string
  steps: Array<{ title: string; text: string }>
  tips: string[]
}

export const resourceArticles: ResourceArticle[] = [
  {
    slug: 'lag-enkelt-pristilbud',
    title: 'Lag et enkelt pristilbud',
    description: 'Slik lager du et oversiktlig pristilbud med manuelle linjer, sanntidsvisning, riktig MVA og en trygg kundelenke i Efero.',
    updatedAt: '2026-08-18',
    eyebrow: 'Tilbud',
    intro: 'Et godt tilbud skal være enkelt å skrive og enkelt å forstå. I Efero fyller du inn hver tilbudslinje manuelt og ser samtidig nøyaktig hva kunden får se.',
    steps: [
      { title: 'Velg kunde og skriv en tydelig tittel', text: 'Start med kunden tilbudet gjelder. Knytt det gjerne til et oppdrag, legg inn en kort tittel og velg svarfrist hvis kunden må svare innen en bestemt dato.' },
      { title: 'Legg til manuelle linjer', text: 'Skriv beskrivelse, mengde, enhet, pris og MVA for hver del av arbeidet. Materialer og arbeidstimer legges inn på samme enkle måte.' },
      { title: 'Kontroller sanntidsvisningen', text: 'Forhåndsvisningen oppdateres mens du skriver. Kontroller at beskrivelsene er forståelige og at sum ekskl. MVA, MVA og totalbeløp ser riktig ut.' },
      { title: 'Lagre og send til kunden', text: 'Lagre tilbudet når alt er klart. Derfra kan du forhåndsvise dokumentet, laste ned PDF og sende en sikker kundelenke.' },
    ],
    tips: ['Bruk korte beskrivelser uten interne faguttrykk.', 'Skill arbeid og materialer i egne linjer når det gjør tilbudet lettere å lese.', 'Kontroller svarfristen før utsending.'],
  },
  {
    slug: 'fra-tilbud-til-faktura',
    title: 'Fra akseptert tilbud til faktura',
    description: 'Slik følger Efero et akseptert tilbud videre til oppdrag, kalender og faktura uten at du må registrere det samme arbeidet på nytt.',
    updatedAt: '2026-08-18',
    eyebrow: 'Tilbud, oppdrag og faktura',
    intro: 'Når kunden godkjenner tilbudet, skal resten av arbeidsflyten være enkel. Efero lar deg planlegge oppdraget og bruke det aksepterte tilbudet som grunnlag når jobben er ferdig.',
    steps: [
      { title: 'Kunden aksepterer tilbudet', text: 'Godkjenningen registreres på tilbudet. Det avtalte innholdet og beløpet beholdes som grunnlag for videre arbeid.' },
      { title: 'Planlegg oppdraget', text: 'Oppdraget legges på riktig dato og vises i kalenderen med status og arbeidsadresse. Derfra kan du åpne oppdraget direkte.' },
      { title: 'Marker jobben som ferdig', text: 'Når arbeidet er fullført, kontrollerer du timer, materialer, utlegg og eventuelle endringer før fakturering.' },
      { title: 'Opprett faktura fra oppdraget', text: 'Start med det aksepterte tilbudet. Legg bare til dokumenterte ekstrakostnader, kontroller forhåndsvisningen og utsted når alt stemmer.' },
    ],
    tips: ['Sett dato og arbeidsadresse før oppdraget planlegges.', 'Registrer tillegg mens jobben pågår.', 'Kontroller fakturakladden før den utstedes.'],
  },
  {
    slug: 'folg-opp-sendte-tilbud',
    title: 'Følg opp sendte tilbud',
    description: 'Se når kunden åpner tilbudet, motta spørsmål og få godkjenning eller avslag direkte i Efero.',
    updatedAt: '2026-08-18',
    eyebrow: 'Kundeoppfølging',
    intro: 'Et sendt tilbud bør ikke forsvinne i innboksen. Den sikre kundelenken samler åpning, spørsmål og endelig svar i samme tilbudstidslinje.',
    steps: [
      { title: 'Send til riktig kontakt', text: 'Velg kundens kontaktperson og kontroller emne og melding. Utsendingen låser riktig tilbudsversjon.' },
      { title: 'Kunden åpner lenken', text: 'Kunden får et mobilvennlig tilbud med linjer, MVA og totalsum. Åpningen registreres i kundeaktiviteten.' },
      { title: 'Svar og spørsmål', text: 'Kunden kan sende et spørsmål, godkjenne eller avslå. Kommentar og navn følger hendelsen.' },
      { title: 'Følg opp fra kontoret', text: 'Tilbudsstatus og tidslinje oppdateres i Efero. Svarfrister som nærmer seg vises også i oversikten.' },
    ],
    tips: ['Bruk en konkret emnelinje.', 'Sett alltid en realistisk svarfrist.', 'Svar raskt når kunden stiller spørsmål.'],
  },
  {
    slug: 'prosjektokonomi-i-efero',
    title: 'Prosjektøkonomi uten falsk margin',
    description: 'Sammenlign godkjente tilbud med netto fakturert og se hva som gjenstår, uten å blande omsetning med lønnskost eller regnskapsresultat.',
    updatedAt: '2026-08-18',
    eyebrow: 'Prosjektkontroll',
    intro: 'Efero viser tall det faktisk har belegg for: godkjente tilbud, utstedte fakturaer, kreditert beløp og registrerte timer. Det kalles omsetningskontroll – ikke regnskapsmargin.',
    steps: [
      { title: 'Knytt oppdrag til prosjektet', text: 'Prosjektet samler oppdrag for samme kunde og eventuelt samme arbeidssted.' },
      { title: 'Bruk godkjente tilbud som grunnlag', text: 'Nettoverdien av godkjente, jobbknyttede tilbud blir prosjektets kommersielle grunnlag.' },
      { title: 'Følg faktureringen', text: 'Utstedte fakturaer og kreditnotaer summeres mot de samme oppdragene. Efero viser gjenstående eller overfakturert beløp.' },
      { title: 'Se timer separat', text: 'Estimerte og registrerte timer vises ved siden av økonomien. Lønnskost og regnskapsmargin krever egne, autoritative data.' },
    ],
    tips: ['Knytt tilbudet til riktig oppdrag.', 'Kontroller at alle prosjektjobber er koblet.', 'Bruk regnskapet som fasit for endelig resultat.'],
  },
]

export function resourceBySlug(slug: string) {
  return resourceArticles.find(article => article.slug === slug)
}
