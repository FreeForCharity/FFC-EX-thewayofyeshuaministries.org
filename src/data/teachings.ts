/**
 * The ministry's own teaching, cut into quotable pieces.
 *
 * The helper answers a question of faith by showing what the ministry has
 * already written about it, in its own words, with a link to the full post.
 * Nothing here is generated or paraphrased -- a quote is either the author's
 * sentence or it is not shown.
 *
 * **This module is loaded on demand.** It pulls in every blog post, which is
 * the largest thing on the site by some way, so the helper imports it only
 * when a visitor actually opens the panel. Importing it from anywhere that
 * runs at page load would put the whole blog back into every page's JavaScript.
 */

import type { SiteIndexEntry, Teaching } from '@/lib/siteSearch'
import {
  blogPosts,
  getPublishedPosts,
  getCategory,
  formatDate,
  type BlogPost,
} from '@/data/blog-posts'

/**
 * The posts that actually have pages in this build.
 *
 * `getPublishedPosts()` compares against "today", which is the right question
 * on the server but the wrong one here: this module runs in the visitor's
 * browser, where today can be later than the day the site was built. Blog
 * routes are generated at build time and `dynamicParams` is false, so a post
 * whose date has arrived since the last deploy has no page to link to -- the
 * weekly rebuild is what brings it into existence.
 *
 * Comparing against the build date instead means the helper offers exactly the
 * posts `generateStaticParams` emitted, and never a link that 404s. Falls back
 * to today when the variable is absent, as it is under Jest.
 */
function postsWithPages(): BlogPost[] {
  const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE
  return buildDate ? blogPosts.filter((post) => post.date <= buildDate) : getPublishedPosts()
}

/** The named entities the blog actually uses, in rough order of frequency. */
const ENTITIES: Record<string, string> = {
  '&mdash;': '—',
  '&ndash;': '–',
  '&ldquo;': '“',
  '&rdquo;': '”',
  '&lsquo;': '‘',
  '&rsquo;': '’',
  '&hellip;': '…',
  '&nbsp;': ' ',
  '&bull;': '•',
  '&eacute;': 'é',
  '&amp;': '&',
  '&quot;': '"',
  '&#39;': "'",
}

/** Turn one stored paragraph of blog HTML into readable plain text. */
function toPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;|&#\d+;/gi, (entity) => ENTITIES[entity.toLowerCase()] ?? ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * The bold run a paragraph opens with, which the blog uses as a section
 * heading ("The Touch That Heals: Tzitzit on the Fringe"). Undefined for the
 * paragraphs written as continuous prose.
 *
 * Most headings are followed by a line break, but a dozen -- the Rosh Hashanah
 * how-to among them -- simply run on into the text. Both forms count: every
 * bold run that opens a paragraph in this blog is a heading.
 */
function leadingHeading(html: string): string | undefined {
  const match = /^<strong>(.+?)<\/strong>(?:\s*<br\s*\/?>|\s)/i.exec(html)
  return match ? toPlainText(match[1]) : undefined
}

/** Shortest paragraph worth quoting. Below this it is a sign-off, not a teaching. */
const MIN_TEACHING_LENGTH = 100

/**
 * Every post opens and closes with the same greeting. They are blessings
 * rather than teaching, and repeating them 36 times would also flatten the
 * word statistics the matching depends on.
 *
 * Matched without their punctuation: the sign-off is usually "Shabbat Shalom."
 * but runs to "Shabbat Shalom and Chanukah Sameach!" on the feast posts.
 */
const BOILERPLATE_PREFIXES = [/^Shalom and blessings/, /^Shabbat Shalom\b/]

function isQuotable(html: string, text: string): boolean {
  // The contact block at the foot of every post.
  if (/mailto:|tel:/i.test(html)) return false
  if (text.length < MIN_TEACHING_LENGTH) return false
  return !BOILERPLATE_PREFIXES.some((prefix) => prefix.test(text))
}

function teachingsFromPost(post: BlogPost): Teaching[] {
  return post.body
    .map((paragraph, position) => ({ paragraph, position }))
    .filter(({ paragraph }) => isQuotable(paragraph, toPlainText(paragraph)))
    .map(({ paragraph, position }) => {
      const heading = leadingHeading(paragraph)
      const full = toPlainText(paragraph)
      return {
        id: `${post.slug}-${position}`,
        slug: post.slug,
        postTitle: post.title,
        postDate: formatDate(post.date),
        heading,
        // Drop the heading from the body so it is not read twice.
        text: heading && full.startsWith(heading) ? full.slice(heading.length).trim() : full,
      }
    })
}

/** Every quotable paragraph the ministry has published. */
export function getTeachings(): Teaching[] {
  return postsWithPages().flatMap(teachingsFromPost)
}

/**
 * Blog posts as destinations the helper can link to, same shape as the pages
 * in `site-index.ts`. Kept here rather than there so that nothing at page load
 * has a reason to import the posts.
 */
export function getBlogEntries(): SiteIndexEntry[] {
  return postsWithPages().map((post) => ({
    id: `blog-${post.slug}`,
    title: post.title,
    href: `/blog/${post.slug}`,
    section: getCategory(post.slug),
    summary: post.excerpt,
    keywords: [getCategory(post.slug), 'blog', 'teaching', 'post'],
  }))
}
