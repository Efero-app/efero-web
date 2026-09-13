# Demoforespørsler

Alle «Book en demo»-knapper peker til `/book-demo`. Skjemaet sender en validert
forespørsel til `/api/demo`. Endepunktet oppretter eller oppdaterer en global
Resend Contact og varsler Efero via e-post. Contacts er den primære leadlisten;
varslingsmailen er en uavhengig operativ sikkerhetskopi. Innsendingen regnes som
bevart når minst én av kanalene lykkes.

Demoforespørselens samtykke gjelder oppfølging av den konkrete forespørselen.
En ny demo-contact lagres derfor som avmeldt fra markedsførings-Broadcasts.
Eksisterende contacts beholder sitt gjeldende abonnementsvalg.

## Konfigurasjon

- `RESEND_API_KEY` er påkrevd for å sende e-post.
- `DEMO_NOTIFICATION_EMAIL` er valgfri og bruker `kontakt@efero.no` som standard.
- `DEMO_FROM_EMAIL` er valgfri og bruker `Efero <noreply@efero.no>` som standard.
- `DEMO_RESEND_SEGMENT_ID` er valgfri. Uten denne vises interessenten fortsatt i
  Audience → Contacts, men legges ikke i et eget demo-segment.
- `RESEND_API_BASE_URL` er valgfri og brukes bare i isolerte Contacts-tester.
- `RESEND_API_ENDPOINT` er valgfri og brukes bare når innsendingen skal testes mot
  en lokal e-postmock. Produksjon bruker Resends offisielle endepunkt som standard.

GitHub-workflowen sender allerede `RESEND_API_KEY` inn i Cloudflare-bygget. Bekreft
at denne GitHub-hemmeligheten er satt før første produksjonsdeploy av skjemaet.

## Lokal kontroll

```bash
npm run typecheck
npm test
npm run build
```

Test både tom innsending, gyldig modulvalg, ønsket oppstart, ny og eksisterende
Contact, valgfritt segment, uavhengige Contacts/e-post-feil og bekreftelsestilstand.
Lokal suksessflyt kan testes med en lokal mock ved å sette `RESEND_API_ENDPOINT`
og `RESEND_API_BASE_URL`; ingen ekte kundeopplysninger eller e-poster skal brukes.
