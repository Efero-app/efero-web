import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(path)
    return /\.(ts|tsx)$/.test(path) && !/\.test\./.test(path) ? [path] : []
  })
}

describe('offentlig kommersiell tekst', () => {
  it('har ingen gamle nummererte kildekopier i nettsiden', () => {
    expect([...sourceFiles('app'), ...sourceFiles('components'), ...sourceFiles('lib')]
      .filter(path => / \d+\.(ts|tsx)$/.test(path))).toEqual([])
  })
  it('omtaler ikke binding, oppsigelsesvilkår eller gratis etablering i sider, metadata og AI-tekster', () => {
    const paths = [
      ...sourceFiles('app'), ...sourceFiles('components'), ...sourceFiles('lib'),
      'public/llms.txt', 'public/llms-full.txt',
    ]
    for (const path of paths) {
      const text = readFileSync(path, 'utf8')
      expect(text, path).not.toMatch(/bindingstid|oppsigelse|si(?:es)? opp|lock-in|no standard setup fee/i)
      expect(text, path).not.toMatch(/(?:ingen|uten) etablerings(?:gebyr|avgift)|gratis personlig oppstart|personlig oppstart inkludert/i)
    }
  })

  it('forklarer begge partnermodeller og skiller refusjonsreglene', () => {
    const text = readFileSync('app/(marketing)/partner/page.tsx', 'utf8')
    expect(text).toContain('Månedlig provisjon')
    expect(text).toContain('Engangsprovisjon')
    expect(text).toContain('før første utbetaling')
    expect(text).toContain('Når du bekrefter valget, låses det')
    expect(text).toContain('3 000 kr i samlet provisjon per kunde')
    expect(text).toContain('første abonnementsbetaling og hele etableringsgebyret')
    expect(text).toContain('Etableringsgebyret inngår ikke i beregningen')
    expect(text).toContain('Opptjent engangsprovisjon beholdes ved refusjon')
    expect(text).toContain('Utbetalinger håndteres manuelt')
  })
})
