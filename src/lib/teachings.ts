/**
 * Cutting the ministry's blog into quotable pieces.
 *
 * The helper answers a question of faith by showing what the ministry has
 * already written about it, in its own words, with a link to the full post.
 * Nothing here is generated or paraphrased -- a quote is either the author's
 * sentence or it is not shown.
 *
 * **This runs at build time, never in the browser.** It reads every post,
 * drafts included, and `src/app/teachings.json/route.ts` publishes only the
 * finished result. Importing this from a client component would ship the whole
 * blog -- unpublished posts among it -- to every visitor.
 */

import type { SiteIndexEntry, Teaching } from '@/lib/siteSearch'
import { getCategory, formatDate, type BlogPost } from '@/data/blog-posts'

/** Everything the helper needs about the blog, ready to search. */
export interface TeachingPayload {
  entries: SiteIndexEntry[]
  teachings: Teaching[]
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
export function toPlainText(html: string): string {
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
 * The greetings every post opens and closes with. They are blessings rather
 * than teaching, and repeating them across 36 posts would also flatten the
 * word statistics the matching depends on.
 *
 * Taken from the corpus rather than guessed at: the openings run "Shalom and
 * blessings", "Shalom, beloved" and "Blessings and Shalom", and the closings
 * from a plain "Shabbat Shalom." through "Shabbat Shalom and Chanukah
 * Sameach!" to a bare "Chag Shavuot Sameach!" on the feast posts.
 *
 * Deliberately anchored and narrow: "Blessings to everyone. Today I want to
 * talk about ..." opens a real teaching and must not be caught.
 */
const BOILERPLATE_PREFIXES = [
  /^Shalom\b/,
  /^Shabbat Shalom\b/,
  /^Blessings and Shalom\b/,
  /^Chag [A-Za-z]+ Sameach/,
]

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

/** Every quotable paragraph in the given posts. */
export function extractTeachings(posts: BlogPost[]): Teaching[] {
  return posts.flatMap(teachingsFromPost)
}

/**
 * The given posts as destinations the helper can link to, the same shape as
 * the pages in `site-index.ts`.
 */
export function toBlogEntries(posts: BlogPost[]): SiteIndexEntry[] {
  return posts.map((post) => ({
    id: `blog-${post.slug}`,
    title: post.title,
    href: `/blog/${post.slug}`,
    section: getCategory(post.slug),
    summary: post.excerpt,
    keywords: [getCategory(post.slug), 'blog', 'teaching', 'post'],
  }))
}

/** Both halves of what the helper needs, from one pass over the posts. */
export function buildTeachingPayload(posts: BlogPost[]): TeachingPayload {
  return { entries: toBlogEntries(posts), teachings: extractTeachings(posts) }
}
