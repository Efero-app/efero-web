import Link from 'next/link'
import type { ComponentProps } from 'react'

/** Keep initial page bandwidth for the page the visitor actually opened. */
export default function SiteLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />
}
