'use client'
import { useEffect, useRef } from 'react'

export function AnimatedSection({ children, className = '', eager = false }: {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Innhold over folden: rendres synlig fra server, så LCP ikke venter på hydrering. */
  eager?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (eager) return

    const el = ref.current
    if (!el) return

    // Scroll-reveal adds no value on narrow screens and can make already-rendered
    // copy look as if it is still loading during a fast touch scroll.
    if (window.matchMedia('(max-width: 767px)').matches) return

    const show = () => el.classList.add('visible')

    // Already in (or near) viewport on mount — show immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 1.08) {
      show()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px 12% 0px', threshold: 0.01 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [eager])

  if (eager) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={`in-view ${className}`}>
      {children}
    </div>
  )
}
