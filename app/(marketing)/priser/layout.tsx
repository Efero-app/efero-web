import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Priser',
  description:
    'Efero prises etter det bedriften faktisk trenger. Få en tydelig totalpris basert på brukere, arbeidsområder og integrasjoner, og personlig hjelp til oppstart.',
  path: '/priser',
  keywords: ['efero pris', 'håndverker program pris', 'jobbstyring pris norge'],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
