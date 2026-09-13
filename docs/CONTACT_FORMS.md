# Kontakter fra nettsideskjemaer

Alle offentlige leadskjemaer lagrer e-postadressen som en global kontakt i Resend:

- Kontaktskjema (`/api/contact`)
- Book en demo (`/api/demo`)
- Venteliste (`/api/waitlist`)

Hvert endepunkt forsøker både å opprette eller oppdatere kontakten og å sende en
varslingsmail til Efero. Innsendingen regnes som bevart dersom minst én av disse
kanalene lykkes. Dermed går ikke henvendelsen tapt ved en enkeltstående feil i
Resend Contacts eller e-postutsendingen.

Kontaktskjema og demo gir bare samtykke til oppfølging av henvendelsen. Nye
kontakter fra disse skjemaene lagres derfor som avmeldt fra markedsføringsutsendelser.
Hvis kontakten finnes fra før, beholdes eksisterende abonnementsvalg. Ventelisten
har eksplisitt produktsamtykke og registrerer kontakten som abonnert.

## Konfigurasjon

- `RESEND_API_KEY` er påkrevd.
- `CONTACT_RESEND_SEGMENT_ID` og `DEMO_RESEND_SEGMENT_ID` er valgfrie segmenter.
- `WAITLIST_RESEND_SEGMENT_ID` kan overstyre standardsegmentet for ventelisten.
- `RESEND_API_BASE_URL` og `RESEND_API_ENDPOINT` brukes bare i isolerte tester.

Uten et valgfritt segment finnes kontakten fortsatt under **Audience → Contacts**.
