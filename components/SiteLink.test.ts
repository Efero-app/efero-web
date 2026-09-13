import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Link from 'next/link'
import SiteLink from './SiteLink'

vi.mock('next/link', () => ({
  default: vi.fn(({ prefetch: _prefetch, ...props }) => createElement('a', props)),
}))

describe('nettsidelenker', () => {
  beforeEach(() => vi.clearAllMocks())

  it('beholder mål, innhold og klikkoppførsel uten automatisk forhåndslasting', () => {
    const onClick = vi.fn()
    const html = renderToStaticMarkup(createElement(SiteLink, {
      href: '/funksjoner/tilbud', className: 'demo-link', onClick,
      'aria-label': 'Les om tilbud', children: 'Tilbud',
    }))
    expect(html).toContain('href="/funksjoner/tilbud"')
    expect(html).toContain('aria-label="Les om tilbud"')
    expect(html).toContain('Tilbud</a>')
    expect(vi.mocked(Link).mock.calls[0][0]).toEqual(expect.objectContaining({ prefetch: false, onClick }))
  })

  it('tillater en eksplisitt prioritering når en konkret lenke trenger det', () => {
    renderToStaticMarkup(createElement(SiteLink, { href: '/', prefetch: true, children: 'Hjem' }))
    expect(vi.mocked(Link).mock.calls[0][0]).toEqual(expect.objectContaining({ prefetch: true }))
  })
})
