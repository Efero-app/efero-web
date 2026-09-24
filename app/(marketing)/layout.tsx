import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleAnalytics />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  )
}
