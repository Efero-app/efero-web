import Link from '@/components/SiteLink'
import { AnimatedSection } from './AnimatedSection'

export function CTASection() {
  return (
    <section id="kom-i-gang" className="py-24 bg-navy">
      <div className="max-w-site mx-auto px-6 text-center">
        <AnimatedSection>
          <h2 className="text-[40px] md:text-[52px] font-bold text-white leading-tight mb-5 tracking-tight">
            Klar til å spare 5 timer<br />i uken?
          </h2>
          <p className="text-[18px] text-white/50 mb-10 max-w-md mx-auto leading-relaxed">
            Bli med hundrevis av norske håndverkere som allerede bruker Efero.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#"
              className="h-[52px] px-8 rounded-btn bg-eblue text-white text-[15px] font-semibold flex items-center hover:bg-blue-500 transition-colors"
            >
              Start gratis prøveperiode
            </Link>
            <Link
              href="#"
              className="h-[52px] px-8 rounded-btn border-2 border-white/30 text-white text-[15px] font-semibold flex items-center hover:border-white transition-colors"
            >
              Last ned appen
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
