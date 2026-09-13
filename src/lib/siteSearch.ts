/**
 * Question matching for the site helper.
 *
 * A visitor types a question in plain language -- "how do I donate a car?" --
 * and the helper answers with links to the pages that cover it. All of the
 * matching runs in the browser against `src/data/site-index.ts`. The site is a
 * static export with no server, so there is no API to call and no key to
 * protect, and a visitor's question never leaves their device.
 *
 * The quality of the answers lives in the index, not in this file: when a
 * question does not find the right page, add the words the visitor actually
 * typed to that entry's `keywords`.
 */

/** One thing on the site a visitor can be pointed at. */
export interface SiteIndexEntry {
  /** Stable identifier. Used as the React key and in tests. */
  id: string
  /** Link text -- name the destination the way the page names itself. */
  title: string
  /** Where the link goes. Internal routes start with `/`. */
  href: string
  /** One or two plain sentences saying what is on the other end of the link. */
  summary: string
  /** Group label shown beside the result, e.g. 'Programs'. */
  section: string
  /**
   * Words a visitor might type that are not already in the title or summary.
   * Add the phrasing people actually use, not dictionary synonyms.
   */
  keywords: string[]
  /** True when the link leaves the site, so it opens in a new tab. */
  external?: boolean
}

/** Most results to return for one question. */
export const MAX_RESULTS = 5

/**
 * Function words carry no signal about which page someone wants. They are
 * stripped from the question before matching -- but only when something is
 * left over, so "who are we" still searches rather than returning nothing.
 */
const STOP_WORDS = new Set([
  'a',
  'about',
  'am',
  'an',
  'and',
  'any',
  'anything',
  'are',
  'as',
  'at',
  'be',
  'been',
  'but',
  'by',
  'can',
  'could',
  'did',
  'do',
  'does',
  'for',
  'from',
  'had',
  'has',
  'have',
  'he',
  'her',
  'here',
  'him',
  'how',
  'i',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'like',
  'me',
  'my',
  'need',
  'of',
  'on',
  'or',
  'our',
  'out',
  'please',
  'she',
  'should',
  'so',
  'some',
  'such',
  'than',
  'that',
  'the',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'this',
  'those',
  'to',
  'up',
  'us',
  'want',
  'was',
  'we',
  'were',
  'what',
  'when',
  'where',
  'which',
  'who',
  'whom',
  'why',
  'will',
  'with',
  'would',
  'you',
  'your',
])

/** A match in the title is worth far more than one buried in a summary. */
const FIELD_WEIGHTS = {
  title: 6,
  keywords: 4,
  summary: 1.5,
} as const

/** A partial word match ("dona" for "donation") counts for half. */
const PREFIX_FACTOR = 0.5

/** Shorter fragments than this match too much to be useful. */
const MIN_PREFIX_LENGTH = 4

/** Matching the whole question as a phrase is a strong signal. */
const PHRASE_BONUS = { title: 8, keywords: 5 } as const

/** Below this, a match is a coincidence rather than an answer. */
const MIN_SCORE = 1.5

/** Results this much weaker than the best one are noise, so they are dropped. */
const RELATIVE_CUTOFF = 0.25

/** Lowercase, strip accents and punctuation, collapse whitespace. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/**
 * Crude singularizer so "cars" finds "car" and "ministries" finds "ministry".
 * It only has to be consistent, not linguistically correct -- both the
 * question and the index are put through it before anything is compared.
 */
function stem(word: string): string {
  if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`
  if (word.length > 4 && /(?:ch|sh|s|x|z)es$/.test(word)) return word.slice(0, -2)
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1)
  return word
}

/** Split text into normalized words, before stemming. */
function rawWords(text: string): string[] {
  const normalized = normalize(text)
  return normalized ? normalized.split(' ') : []
}

/** Split text into normalized, stemmed words. */
function words(text: string): string[] {
  return rawWords(text).map(stem)
}

/**
 * Turn a visitor's question into the words worth matching on.
 * Exported so tests can pin the behavior that shapes every result.
 */
export function tokenize(query: string): string[] {
  // Stop words are removed before stemming, or "this" would arrive here as
  // "thi" and no longer look like a stop word.
  const all = rawWords(query)
  const meaningful = all.filter((word) => !STOP_WORDS.has(word))
  return (meaningful.length > 0 ? meaningful : all).map(stem)
}

/** The searchable shape of an entry, computed once per entry. */
interface EntryWords {
  title: string[]
  keywords: string[]
  summary: string[]
  titlePhrase: string
  keywordPhrases: string[]
}

const entryWordCache = new WeakMap<SiteIndexEntry, EntryWords>()

function getEntryWords(entry: SiteIndexEntry): EntryWords {
  const cached = entryWordCache.get(entry)
  if (cached) return cached

  const title = words(entry.title)
  const keywordPhrases = entry.keywords.map((keyword) => words(keyword).join(' '))
  const computed: EntryWords = {
    title,
    keywords: entry.keywords.flatMap((keyword) => words(keyword)),
    summary: words(entry.summary),
    titlePhrase: title.join(' '),
    keywordPhrases,
  }
  entryWordCache.set(entry, computed)
  return computed
}

/**
 * Score every token against one field, recording which tokens matched so a
 * result that covers more of the question can be ranked above one that
 * matches a single word very well.
 */
function scoreField(
  tokens: string[],
  fieldWords: string[],
  weight: number,
  matched: boolean[]
): number {
  let score = 0
  tokens.forEach((token, index) => {
    let best = 0
    for (const word of fieldWords) {
      if (word === token) {
        best = weight
        break
      }
      const longEnough = token.length >= MIN_PREFIX_LENGTH && word.length >= MIN_PREFIX_LENGTH
      if (longEnough && (word.startsWith(token) || token.startsWith(word))) {
        best = Math.max(best, weight * PREFIX_FACTOR)
      }
    }
    if (best > 0) {
      score += best
      matched[index] = true
    }
  })
  return score
}

function scoreEntry(tokens: string[], entry: SiteIndexEntry): number {
  const fields = getEntryWords(entry)
  const matched = new Array<boolean>(tokens.length).fill(false)

  let score = scoreField(tokens, fields.title, FIELD_WEIGHTS.title, matched)
  score += scoreField(tokens, fields.keywords, FIELD_WEIGHTS.keywords, matched)
  score += scoreField(tokens, fields.summary, FIELD_WEIGHTS.summary, matched)

  if (tokens.length > 1) {
    const phrase = tokens.join(' ')
    if (fields.titlePhrase.includes(phrase)) score += PHRASE_BONUS.title
    if (fields.keywordPhrases.some((keyword) => keyword.includes(phrase))) {
      score += PHRASE_BONUS.keywords
    }
  }

  const matchedCount = matched.filter(Boolean).length
  if (matchedCount === 0) return 0

  // Favor entries that answer more of the question over ones that match a
  // single word emphatically.
  return score * (0.5 + (0.5 * matchedCount) / tokens.length)
}

/**
 * Rank the index against a visitor's question, best answer first.
 *
 * Returns an empty array when nothing matches well enough -- the caller is
 * expected to offer a human to talk to instead of a bad guess.
 */
export function searchSite(
  query: string,
  entries: SiteIndexEntry[],
  limit: number = MAX_RESULTS
): SiteIndexEntry[] {
  const tokens = tokenize(query)
  if (tokens.length === 0) return []

  const scored = entries
    .map((entry) => ({ entry, score: scoreEntry(tokens, entry) }))
    .filter(({ score }) => score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))

  if (scored.length === 0) return []

  const cutoff = scored[0].score * RELATIVE_CUTOFF
  return scored
    .filter(({ score }) => score >= cutoff)
    .slice(0, limit)
    .map(({ entry }) => entry)
}
