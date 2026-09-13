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

/** One quotable paragraph of the ministry's published teaching. */
export interface Teaching {
  /** Stable identifier: the post's slug and the paragraph's position in it. */
  id: string
  /** Slug of the post it comes from, for the link. */
  slug: string
  /** Title of the post it comes from, shown as the attribution. */
  postTitle: string
  /** Human-readable publication date of that post. */
  postDate: string
  /** The paragraph's own section heading, where it has one. */
  heading?: string
  /** The paragraph as plain text, heading removed. */
  text: string
}

/** A teaching worth showing, and the part of it worth showing. */
export interface TeachingQuote {
  teaching: Teaching
  /** The sentences that actually answer the question. */
  snippet: string
}

/** Most results to return for one question. */
export const MAX_RESULTS = 5

/** Most teaching quotes to show. Two is plenty to read inside a panel. */
export const MAX_QUOTES = 2

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
  // "get" is a filler verb in almost every question ("how do I get ...") and
  // was matching page titles on its own, e.g. sending "how do I get saved" to
  // a Shavuot get-together.
  'get',
  'getting',
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
  // Question scaffolding: "what does the Bible say about ...". Left in, "say"
  // matched a heading ("When God Says No") and quoted a teaching on something
  // else entirely.
  'said',
  'say',
  'says',
  'she',
  'should',
  'tell',
  'tells',
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

/**
 * Below this, a match is a coincidence rather than an answer.
 *
 * Set above the weight of a single keyword hit on its own so that one generic
 * word shared with a page is not enough: "pray for my marriage" used to reach
 * the donation page on the strength of the word "pray" alone, which is a worse
 * answer than none.
 */
const MIN_SCORE = 3

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
  // single word emphatically. The penalty is steep on purpose: covering one
  // word of a five-word question is usually a coincidence.
  return score * (0.25 + (0.75 * matchedCount) / tokens.length)
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

/**
 * Words that mark a question as one for a person rather than a page.
 *
 * A search box cannot answer "why does God allow suffering" or "pray for my
 * marriage", and a link that pretends otherwise is worse than silence. When a
 * question contains any of these, the helper offers the ministry alongside
 * whatever pages it found.
 *
 * Add words freely -- a false positive only adds an invitation to reach out,
 * which is never the wrong thing to offer.
 */
const PASTORAL_WORDS = new Set([
  'addicted',
  'addiction',
  'afraid',
  'angry',
  'anxiety',
  'anxious',
  'baptism',
  'baptized',
  'believe',
  'bible',
  'bless',
  'blessed',
  'blessing',
  'christ',
  'comfort',
  'covenant',
  'death',
  'depressed',
  'depression',
  'devil',
  'died',
  'divorce',
  'doubt',
  'dying',
  'eternal',
  'evil',
  'faith',
  'fear',
  'forgive',
  'forgiven',
  'forgiveness',
  'god',
  'gospel',
  'grace',
  'grief',
  'grieving',
  'guilt',
  'heal',
  'healed',
  'healing',
  'heaven',
  'hell',
  'holy',
  'hopeless',
  'hurting',
  'jesus',
  'lonely',
  'lord',
  'marriage',
  'mercy',
  'messiah',
  'mourning',
  'praise',
  'pray',
  'prayer',
  'praying',
  'prophecy',
  'repent',
  'resurrection',
  'righteous',
  'sabbath',
  'salvation',
  'satan',
  'saved',
  'scripture',
  'shabbat',
  'shame',
  'sin',
  'soul',
  'spirit',
  'struggle',
  'struggling',
  'suffer',
  'suffering',
  'tempted',
  'temptation',
  'torah',
  'worship',
  'yeshua',
])

/**
 * True when a question is asking about faith, struggle or prayer rather than
 * asking to be taken somewhere. Stop words are kept here on purpose: "God" and
 * "sin" carry the signal wherever they sit in the sentence.
 */
export function isPastoralQuestion(query: string): boolean {
  return rawWords(query).some((word) => PASTORAL_WORDS.has(word) || PASTORAL_WORDS.has(stem(word)))
}

/* -------------------------------------------------------------------------
 * Quoting the ministry's own teaching
 *
 * Matching a question against 24,000 words of prose is a different problem
 * from matching it against a page title. Every paragraph contains "God" and
 * "the Lord", so a word is only evidence to the extent that it is rare: the
 * scoring below weights each word by how few paragraphs contain it, which is
 * what separates "forgiveness" from "the".
 * ---------------------------------------------------------------------- */

/** A word in the heading is worth this much more than one in the body. */
const HEADING_MULTIPLIER = 3

/**
 * A word is distinctive when it appears in few enough paragraphs to say
 * something about which one is wanted. At this weight a word is in under about
 * a fifth of the corpus: "forgive" and "tzitzit" clear it, "God" and "Lord" --
 * which appear in half the paragraphs -- do not.
 */
const DISTINCTIVE_WEIGHT = 1.5

/** Tuned against the real posts: below this the quote is off-topic. */
const MIN_TEACHING_SCORE = 2

/** Longest snippet to show, in characters, before trailing off. */
const MAX_SNIPPET_LENGTH = 320

/** The searchable form of one teaching, plus the corpus statistics. */
interface TeachingCorpus {
  /** Per teaching: its heading words and body words, stemmed. */
  documents: { headingWords: Set<string>; textWords: Set<string> }[]
  /** How much a given word counts, by how rare it is across the corpus. */
  weights: Map<string, number>
}

const corpusCache = new WeakMap<Teaching[], TeachingCorpus>()

function getCorpus(teachings: Teaching[]): TeachingCorpus {
  const cached = corpusCache.get(teachings)
  if (cached) return cached

  const documents = teachings.map((teaching) => ({
    headingWords: new Set(words(teaching.heading ?? '')),
    textWords: new Set(words(teaching.text)),
  }))

  // Document frequency: how many paragraphs use each word at all.
  const frequency = new Map<string, number>()
  for (const doc of documents) {
    for (const word of new Set([...doc.headingWords, ...doc.textWords])) {
      frequency.set(word, (frequency.get(word) ?? 0) + 1)
    }
  }

  const total = documents.length || 1
  const weights = new Map<string, number>()
  for (const [word, count] of frequency) {
    // A word in nearly every paragraph approaches zero; a rare one scores high.
    weights.set(word, Math.log(total / count))
  }

  const corpus = { documents, weights }
  corpusCache.set(teachings, corpus)
  return corpus
}

/** Split prose into sentences, keeping closing quotation marks attached. */
function sentences(text: string): string[] {
  return text.split(/(?<=[.!?][”"’']?)\s+/).filter((sentence) => sentence.trim().length > 0)
}

/**
 * The part of a paragraph that actually answers the question: the
 * best-matching sentence, plus the next one where that leaves too little to
 * read. A snippet that starts mid-paragraph is marked with an ellipsis so it
 * is never mistaken for the start of the teaching.
 */
function bestSnippet(text: string, tokens: string[]): string {
  const parts = sentences(text)
  if (parts.length === 0) return text

  let bestIndex = 0
  let bestHits = -1
  parts.forEach((sentence, index) => {
    const sentenceWords = new Set(words(sentence))
    const hits = tokens.filter((token) => sentenceWords.has(token)).length
    // Ties go to the earlier sentence, which reads more naturally.
    if (hits > bestHits) {
      bestHits = hits
      bestIndex = index
    }
  })

  let snippet = parts[bestIndex]
  let next = bestIndex + 1
  while (snippet.length < MAX_SNIPPET_LENGTH / 2 && next < parts.length) {
    snippet = `${snippet} ${parts[next]}`
    next += 1
  }
  if (snippet.length > MAX_SNIPPET_LENGTH) {
    snippet = `${snippet.slice(0, MAX_SNIPPET_LENGTH).trimEnd()}…`
  }
  return bestIndex > 0 ? `…${snippet}` : snippet
}

/**
 * Find the ministry's own words on a subject.
 *
 * Returns at most one quote per post, best first, and nothing at all when the
 * question is not something the blog has addressed -- an off-topic quote put
 * in the ministry's mouth is exactly what this must not do.
 */
export function searchTeachings(
  query: string,
  teachings: Teaching[],
  limit: number = MAX_QUOTES
): TeachingQuote[] {
  const tokens = tokenize(query)
  // `searchSite` gets this from slice(); do it explicitly here, where the
  // quotes are collected one at a time.
  if (tokens.length === 0 || limit <= 0) return []

  const { documents, weights } = getCorpus(teachings)

  const scored = teachings
    .map((teaching, index) => {
      const doc = documents[index]
      let score = 0
      let matched = 0
      let inHeading = false
      let distinctive = 0

      for (const token of tokens) {
        const weight = weights.get(token)
        if (weight === undefined) continue
        const heading = doc.headingWords.has(token)
        if (!heading && !doc.textWords.has(token)) continue

        score += heading ? weight * HEADING_MULTIPLIER : weight
        matched += 1
        if (heading) inHeading = true
        if (weight >= DISTINCTIVE_WEIGHT) distinctive += 1
      }

      /*
       * What makes a paragraph worth quoting, learned from the real posts:
       *
       * - The question's word is in the paragraph's own heading. Headings are
       *   short and deliberate, so a word there is what the paragraph is about.
       * - Or two distinctive words turn up in the body, which a passing
       *   mention will not manage.
       * - Or the whole question is one distinctive word, where a body match is
       *   all the evidence there is to have.
       *
       * One rare word buried in a long paragraph is not enough on its own:
       * that is how "how do I donate a car" reached a teaching about raising
       * children.
       */
      const worthQuoting =
        inHeading || distinctive >= 2 || (tokens.length === 1 && distinctive === 1)
      if (!worthQuoting) return { teaching, score: 0 }

      return { teaching, score: score * (0.5 + (0.5 * matched) / tokens.length) }
    })
    .filter(({ score }) => score >= MIN_TEACHING_SCORE)
    .sort((a, b) => b.score - a.score)

  // One quote per post: two paragraphs of the same teaching is repetitive.
  const seen = new Set<string>()
  const chosen: TeachingQuote[] = []
  for (const { teaching } of scored) {
    if (seen.has(teaching.slug)) continue
    seen.add(teaching.slug)
    chosen.push({ teaching, snippet: bestSnippet(teaching.text, tokens) })
    if (chosen.length === limit) break
  }
  return chosen
}
