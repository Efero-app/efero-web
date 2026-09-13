import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { LandingPage } from '@/components/LandingPage'
import { LandingCards } from '@/components/LandingCards'
import sitemap from '@/app/sitemap'
import { featurePages, industryPages, landingPage, landingPages } from './landing-pages'
import { pageMeta } from './seo'

describe('SEO-landingssider', () => {
  it('dekker de fem avtalte behovene og avviser ukjente ruter', () => {
    expect(featurePages.map(page => page.slug)).toEqual(['ordrestyring', 'timeforing', 'tilbud'])
    expect(industryPages.map(page => page.slug)).toEqual(['elektriker', 'rorlegger'])
    expect(landingPage('funksjoner', 'elektriker')).toBeUndefined()
    expect(landingPage('bransjer', 'ukjent')).toBeUndefined()
  })

  it('har unike titler, beskrivelser og gyldige interne mål', () => {
    const urls = new Set(sitemap().map(page => page.url))
    expect(new Set(landingPages.map(page => page.title)).size).toBe(5)
    expect(new Set(landingPages.map(page => page.description)).size).toBe(5)
    for (const page of landingPages) {
      const path = `/${page.section}/${page.slug}`
      const meta = pageMeta({ title: page.title, description: page.description, path })
      expect(meta.alternates.canonical).toBe(`https://efero.no${path}`)
      expect(meta.robots.index).toBe(true)
      expect(urls.has(meta.alternates.canonical)).toBe(true)
      for (const related of page.related) expect(urls.has(`https://efero.no${related.href}`)).toBe(true)
    }
  })

  it('serverrendrer innhold, brødsmuler, lesbare spørsmål og demo uten klientscript', () => {
    for (const page of landingPages) {
      const html = renderToStaticMarkup(createElement(LandingPage, { page }))
      expect(html.match(/<h1\b/g)).toHaveLength(1)
      expect(html).toContain(page.heading)
      expect(html).toContain('BreadcrumbList')
      expect(html).toContain('https://efero.no/#software')
      expect(html).toContain('href="/book-demo"')
      expect(html.match(/<details\b/g)).toHaveLength(page.faq.length)
      expect(html).toContain(page.boundaries)
      expect(html).not.toContain('AggregateRating')
    }
  })

  it('kobler oversiktskort direkte til alle fem sider', () => {
    const html = renderToStaticMarkup(createElement(LandingCards, { pages: landingPages }))
    for (const page of landingPages) expect(html).toContain(`href="/${page.section}/${page.slug}"`)
  })

  it('lover ikke lansert mobilapp eller full regnskapsmargin', () => {
    expect(landingPage('funksjoner', 'timeforing')?.boundaries).toContain('ikke lansert')
    expect(landingPage('funksjoner', 'ordrestyring')?.boundaries).toContain('ikke det samme som et ferdig regnskapsresultat')
    expect(landingPage('funksjoner', 'tilbud')?.boundaries).toContain('manuelle linjer')
  })
})
