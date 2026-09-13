import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Send komplett metadata i <head> også på sider med søkeparametre.
  // Gjelder alle besøkende, slik at deling og indeksering ikke avhenger av JS.
  htmlLimitedBots: /.*/,
  async redirects() {
    return [
      {
        source: '/coming-soon',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/admin-access',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ressurser/lag-tilbud-med-kalkulasjon',
        destination: '/ressurser/lag-enkelt-pristilbud',
        permanent: true,
      },
      {
        source: '/ressurser/oppdater-grossistpriser',
        destination: '/ressurser/fra-tilbud-til-faktura',
        permanent: true,
      },
    ]
  },
}

initOpenNextCloudflareForDev()

export default nextConfig
