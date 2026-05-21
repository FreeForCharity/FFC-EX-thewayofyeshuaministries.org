import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
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
