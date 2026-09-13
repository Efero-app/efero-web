import { describe, expect, it } from 'vitest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { softwareApplicationSchema } from '@/lib/seo'

describe('offentlig oppdagbarhet', () => {
  it('publiserer alle offentlige markedssider i sitemap uten private tilbud', () => {
    const entries = sitemap()
    const urls = entries.map(entry => entry.url)

    expect(entries).toHaveLength(24)
    expect(urls).toContain('https://efero.no')
    expect(urls).toContain('https://efero.no/book-demo')
    expect(urls).toContain('https://efero.no/jobbsjekk')
    expect(urls).toContain('https://efero.no/venteliste')
    expect(urls).toContain('https://efero.no/ressurser')
    expect(urls).toContain('https://efero.no/ressurser/lag-enkelt-pristilbud')
    expect(urls).toContain('https://efero.no/ressurser/fra-tilbud-til-faktura')
    expect(urls).not.toContain('https://efero.no/ressurser/oppdater-grossistpriser')
    expect(urls.some(url => url.includes('/tilbud/'))).toBe(false)
    expect(entries.find(entry => entry.url === 'https://efero.no')?.lastModified).toBeUndefined()
    expect(entries.filter(entry => entry.url.includes('/ressurser/')).every(entry => entry.lastModified instanceof Date)).toBe(true)
  })

  it('slipper søke- og AI-hentere inn, men beskytter tilbud og API-ruter', () => {
    const config = robots()
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules]
    const aiRule = rules.find(rule => Array.isArray(rule.userAgent))

    expect(config.sitemap).toBe('https://efero.no/sitemap.xml')
    expect(config.host).toBe('efero.no')
    expect(aiRule?.userAgent).toContain('OAI-SearchBot')
    expect(aiRule?.userAgent).toContain('Claude-SearchBot')
    expect(aiRule?.userAgent).toContain('PerplexityBot')
    expect(aiRule?.disallow).toEqual(['/tilbud/', '/api/'])
  })

  it('forklarer behovsbasert prising uten å publisere et utdatert beløp', () => {
    expect(softwareApplicationSchema.offers).toMatchObject({
      '@type': 'Offer',
      url: 'https://efero.no/priser',
    })
    expect(softwareApplicationSchema.offers).not.toHaveProperty('price')
    expect(softwareApplicationSchema.offers.description).toContain('skriftlig totalpris')
    expect(softwareApplicationSchema.offers.description).toContain('uten binding')
  })
})
