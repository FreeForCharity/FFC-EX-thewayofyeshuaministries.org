/**
 * The helper's view of the blog, published as a static file.
 *
 * Emitted at build time next to `robots.txt` and `sitemap.xml`, and fetched by
 * the site helper when a visitor opens it. Two reasons it is a file rather
 * than an import:
 *
 * 1. **Drafts stay unpublished.** Posts dated in the future are excluded here,
 *    on the server. Were the helper to import the posts directly, every
 *    unfinished teaching would be readable in the page's JavaScript.
 * 2. **The blog stays off every page.** It is the largest thing on the site,
 *    and the helper sits in the root layout.
 *
 * `getPublishedPosts()` is the same call `generateStaticParams` makes for the
 * blog routes, so the helper offers exactly the posts that have pages.
 */

import { getPublishedPosts } from '@/data/blog-posts'
import { buildTeachingPayload } from '@/lib/teachings'

export const dynamic = 'force-static'

export function GET() {
  return Response.json(buildTeachingPayload(getPublishedPosts()))
}
