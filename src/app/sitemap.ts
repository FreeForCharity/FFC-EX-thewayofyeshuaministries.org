import type { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'

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
    '/blog',
    '/privacy-policy',
    '/cookie-policy',
    '/terms-of-service',
  ]
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' || route === '/blog' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date + 'T00:00:00Z'),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))
  return [...staticRoutes, ...blogRoutes]
}
