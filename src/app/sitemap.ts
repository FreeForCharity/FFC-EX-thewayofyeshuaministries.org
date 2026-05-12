import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thewayofyeshuaministries.org'
  const now = new Date()
  const routes = [
    '/',
    '/prison-program',
    '/build-the-church',
    '/sponsor-a-tiny-home',
    '/automobile-program',
    '/support-this-ministry',
    '/privacy-policy',
    '/cookie-policy',
    '/terms-of-service',
  ]
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
