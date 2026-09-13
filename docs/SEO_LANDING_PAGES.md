# SEO landing pages

Scope: efero.no marketing site only. No changes to admin, superadmin or native app.

## Content and routes

`lib/landing-pages.ts` is the shared content inventory for three feature pages
(`ordrestyring`, `timeforing`, `tilbud`) and two industry pages (`elektriker`,
`rorlegger`). The routes use `generateStaticParams` and reject unknown slugs.
`components/LandingPage.tsx` is a server-rendered template. Native `details`
elements keep FAQs usable without JavaScript. Each page has its own title,
description, canonical URL, WebPage and BreadcrumbList structured data.

The homepage, feature/industry hubs, footer and existing guides link into these
pages. The sitemap includes all five routes, without changing private offer or
API exclusions. Existing Jobbsjekk and contact-form changes are preserved.

## Product accuracy

- Mobile browser access is distinguished from the unreleased native app.
- Time entries are not represented as automatically billable or payroll-ready.
- Quotes use manual lines; no unverified EDI, material database, BankID or
  advanced tender-calculation claims are introduced.
- Project turnover tracking is not presented as accounting profit.
- Electrical/VVS copy does not promise complete legal compliance or specific
  documentation integrations.
- Worked examples are labelled examples, not customer testimonials.

The offer illustration at `public/images/product/tilbud-demo.png` is an unchanged
copy of the existing `handverker-app/artifacts/phase-4/native-quotes/desktop-detail.png`
test artifact (1440×960). The customer name matches the quote fixtures. It is
captioned as test data, with an explicit notice that role/version may change the
view; it is not a claim that the separate native app is released.

## Verification

Shared website performance changes keep metadata in the initial HTML head for
all visitors (`htmlLimitedBots: /.*/`), preload the body font, and leave the
below-fold editorial image lazy-loaded. `SiteLink` retains Next navigation and
click handlers but disables automatic route prefetch, avoiding speculative page
downloads on a visitor's first load. Normal navigation still fetches the chosen
destination. No user-agent-specific scores or audit exclusions are introduced.

CSS uses Next's normal external, cacheable stylesheet. Experimental inlineCss
duplicated the stylesheet into the initial HTML/React payload: on timeføring,
HTML fell from 149,211 to 54,517 bytes, and initial HTML + CSS transfer from
31,267 to 20,155 bytes in controlled local Lighthouse runs. This reduces transfer
size without substituting fonts or changing the visual design; it does not by
itself prove a perfect performance score.

Run `npm run typecheck`, `npm test`, and `npm run build` before handoff. The
landing-page tests verify the route inventory, server-rendered headings, FAQ
content, demo links, schema and matching sitemap/canonical entries.

Run Lighthouse against the production build, not `next dev`. Audit every public
HTML page from its sitemap on mobile and desktop using the normal Lighthouse
profiles for performance, accessibility, best practices and SEO. Save raw HTML
and JSON reports, versions, origins and timestamps. A local score is not proof
of the deployed site's score; report the tested origin explicitly. Do not change
scoring, omit failing audits, or choose only a best run to report a perfect score.

After an authorized production deployment, verify the new URLs, title/canonical
output, sitemap and live Lighthouse scores. Search Console inspection requires
access to the site's property; sitemap inclusion alone does not prove indexing.
