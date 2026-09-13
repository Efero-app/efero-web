import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache'

// Offentlige sider forhåndsbygges og oppdateres ved deploy, ikke med ISR.
// Cloudflare må kunne lese disse sidene også når dynamicParams er false.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
})
