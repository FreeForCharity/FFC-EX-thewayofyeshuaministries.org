import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  env: {
    /*
     * The date this build ran, in the ministry's timezone.
     *
     * Blog routes are generated at build time from the posts published then
     * (`generateStaticParams` with `dynamicParams: false`), so a post whose
     * date arrives before the next deploy has no page. The site helper runs in
     * the visitor's browser, where "today" can be later than that, so it uses
     * this to offer only the posts that really have pages.
     */
    NEXT_PUBLIC_BUILD_DATE: new Date().toLocaleDateString('en-CA', {
      timeZone: 'America/Phoenix',
    }),
  },
  // Emit /path/index.html for every route so URLs with and without a trailing
  // slash both resolve on GitHub Pages (which would otherwise 404 /path/).
  trailingSlash: true,
  // Images configuration
  images: {
    // This allows all images, local or external, to load without optimization
    unoptimized: true,
    // Use remotePatterns instead of deprecated domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thewayofyeshuaministries.org',
      },
      {
        protocol: 'https',
        hostname: 'staging.thewayofyeshuaministries.org',
      },
    ],
  },
  // Optional: base path and asset prefix if using a subdirectory deployment
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}

export default nextConfig
