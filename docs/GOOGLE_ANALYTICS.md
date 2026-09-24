# Google Analytics — consent-gated website measurement

Measurement ID: `G-2WHM8Z62QJ` (public configuration, not a secret).

Only the marketing layout mounts the tag. Production build + exact hostname
`efero.no` or `www.efero.no` + new explicit analytics consent are all required.
Local development, preview hosts and `app.efero.no` do not contact Google.
Tests use a mocked browser/document and never send events to the real property.

## Consent / privacy

- Basic consent mode: no Google script or requests before acceptance; no rejected
  visitor event queue or later replay. The old necessary-only cookie acceptance is ignored.
- A versioned localStorage choice lasts 180 days. Settings are available in the
  footer; withdrawal sets GA's disable flag, removes `_ga*` cookies and reloads to
  remove executed-script timers/listeners. Cross-tab changes are observed.
- Advertising consent stays denied; Google signals and ad personalization disabled.
- GA receives page paths without arbitrary query strings, fragments, form contents
  or partner codes; referrer reduced to origin. Constrained `utm_source`,
  `utm_medium`, `utm_campaign` labels are permitted. Do not put personal data in campaign labels.
- Consent is not a complete legal review of the existing privacy policy. Existing
  references to other suppliers/hosting remain outside this change and need review
  before publication. Confirm the controller details and Google processing terms.

## Required account settings before publishing

1. In GA4 → Admin → Data streams → the efero.no web stream: **disable Enhanced
   measurement**. This code owns manual `page_view` events for Next.js navigation
   and `generate_lead` only after a confirmed demo response. Leaving automatic
   history/form events enabled risks double counts and unsanitized URLs. Verify this
   setting in the Google account. Verified OFF in the Efero web stream on
   2026-09-24 before release; no account setting was changed by this implementation.
2. Keep Google signals/advertising features off. Review data sharing and retention
   (recommend the minimum needed, e.g. two months of event/user-level retention).
   Account-level settings have not been inspected or modified.
3. Mark `generate_lead` as a key event; this is a demo enquiry, not a booked/held
   meeting or paying customer. No value/revenue is invented.
4. Configure internal traffic exclusion for the team's stable addresses if relevant.
   Test filters before activation. Ad blockers and declined consent mean GA is not
   a complete census of visitors.
5. Publish only after user approval. Use Tag Assistant / GA realtime to verify one
   page_view per navigation and one lead per successful form submission. A failed
   request, form start or click alone must not count as a lead. Use an isolated test
   stream if a pre-release network integration test is needed.

No Google Ads, GTM container, Search Console verification, account-setting changes,
production deployment or changes to the Efero application are included here.

## Validation evidence — 2026-09-24

21 focused tests passed using exact copies of the new source/test files in an
isolated temporary directory with Vitest 4.1.10 and TypeScript 5.9.3. A focused
strict typecheck of the consent/analytics modules and test also passed. No events
were sent to Google; browser, script loading and consent storage were mocked.

Release validation used a clean checkout of `6ebf34f` outside iCloud with exact
copies of the eleven analytics-related files and the repository's locked
dependencies (`npm ci`). All file contents were compared before validation.
Full TypeScript checking, all 97 tests across 20 files, `next build` and the
OpenNext Cloudflare build passed. The production build was opened on localhost:
declining analytics, persistence after reload, reopening preferences, accepting
analytics and withdrawing consent all worked. No Google script loaded on
localhost, including after consent.

The original iCloud-managed checkout still stalls during dependency reads; its
test process was stopped. No original dependencies were replaced or removed.
Browser interactions on localhost did not submit a demo or send customer email.
