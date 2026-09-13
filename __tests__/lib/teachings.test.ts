import { searchTeachings } from '../../src/lib/siteSearch'
import { getTeachings, getBlogEntries } from '../../src/data/teachings'
import { blogPosts } from '../../src/data/blog-posts'

const teachings = getTeachings()

/**
 * Strip HTML and entities from a stored paragraph.
 *
 * Deliberately written here rather than imported from `teachings.ts`: this is
 * the check that a quote really is the author's sentence, so it has to start
 * from the raw post and not from the output of the code under test.
 */
function plain(html: string): string {
  return (
    html
      .replace(/<br\s*\/?>/gi, ' ')
      // Inline tags close up: "<em>tzitzit</em>:" is "tzitzit:", not "tzitzit :".
      .replace(/<[^>]+>/g, '')
      .replace(/&mdash;/g, '—')
      .replace(/&ndash;/g, '–')
      .replace(/&ldquo;/g, '“')
      .replace(/&rdquo;/g, '”')
      .replace(/&lsquo;/g, '‘')
      .replace(/&rsquo;/g, '’')
      .replace(/&hellip;/g, '…')
      .replace(/&bull;/g, '•')
      .replace(/&eacute;/g, 'é')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

/** Headings of the teachings quoted for a question. */
function quotedHeadings(question: string): (string | undefined)[] {
  return searchTeachings(question, teachings).map((quote) => quote.teaching.heading)
}

describe('the teaching corpus', () => {
  it('finds quotable paragraphs in the published posts', () => {
    expect(teachings.length).toBeGreaterThan(50)
  })

  it('strips the HTML and decodes the entities the blog uses', () => {
    for (const teaching of teachings) {
      expect(teaching.text).not.toMatch(/<[a-z/]/i)
      expect(teaching.text).not.toMatch(/&[a-z]+;|&#\d+;/i)
    }
  })

  it('never leaves a heading duplicated at the start of its own text', () => {
    for (const teaching of teachings.filter((t) => t.heading)) {
      expect(teaching.text.startsWith(teaching.heading as string)).toBe(false)
    }
  })

  it('leaves out the contact block that closes every post', () => {
    for (const teaching of teachings) {
      expect(teaching.text).not.toMatch(/Info@thewayofyeshuaministries|520\) 302-4034/i)
    }
  })

  it('leaves out the greeting and sign-off every post repeats', () => {
    for (const teaching of teachings) {
      expect(teaching.text).not.toMatch(/^Shalom and blessings/)
      // Not just "Shabbat Shalom." — the feast posts close with "Shabbat
      // Shalom and Chanukah Sameach!", which is a blessing, not a teaching.
      expect(teaching.text).not.toMatch(/^Shabbat Shalom\b/)
      expect(teaching.heading ?? '').not.toMatch(/^Shabbat Shalom\b/)
    }
  })

  it('reads a heading that runs straight on into its text, with no line break', () => {
    // The Rosh Hashanah how-to writes "<strong>What is Rosh Hashanah?</strong> "
    // with a space where the other posts put a <br />.
    const headings = teachings.map((teaching) => teaching.heading)
    expect(headings).toContain('What is Rosh Hashanah?')
    expect(headings).toContain('How to celebrate Rosh Hashanah at home.')

    const roshHashanah = teachings.find((t) => t.heading === 'What is Rosh Hashanah?')
    // The heading must not also be sitting at the front of the body text.
    expect(roshHashanah?.text).not.toMatch(/^What is Rosh Hashanah\?/)
    expect((roshHashanah?.text ?? '').length).toBeGreaterThan(0)
  })

  it('offers only posts that have a page in this build', () => {
    // Blog routes are generated at build time with dynamicParams: false, so a
    // post the helper offers but the build did not emit would 404.
    const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE
    if (buildDate) {
      for (const teaching of teachings) {
        const post = blogPosts.find((candidate) => candidate.slug === teaching.slug)
        expect((post as (typeof blogPosts)[number]).date <= buildDate).toBe(true)
      }
    }
    // Whatever the cutoff, a future-dated draft is never offered.
    const offered = new Set(teachings.map((teaching) => teaching.slug))
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Phoenix' })
    for (const post of blogPosts.filter((candidate) => candidate.date > today)) {
      expect(offered.has(post.slug)).toBe(false)
    }
  })

  it('gives every teaching a unique id and a post to link to', () => {
    const ids = teachings.map((teaching) => teaching.id)
    expect(new Set(ids).size).toBe(ids.length)
    const slugs = new Set(getBlogEntries().map((entry) => entry.href.replace('/blog/', '')))
    for (const teaching of teachings) {
      expect(slugs.has(teaching.slug)).toBe(true)
      expect(teaching.postTitle.length).toBeGreaterThan(0)
    }
  })
})

describe('searchTeachings', () => {
  it('returns nothing for an empty question', () => {
    expect(searchTeachings('', teachings)).toEqual([])
  })

  it('quotes the ministry on a subject it has taught', () => {
    const headings = quotedHeadings('what is the meaning of tzitzit')
    expect(headings.length).toBeGreaterThan(0)
    expect(headings.join(' ')).toMatch(/tzitzit/i)
  })

  it('answers a one-word question when the word is distinctive', () => {
    expect(searchTeachings('tzitzit', teachings).length).toBeGreaterThan(0)
  })

  it('finds the teaching on a subject named only in the body', () => {
    const quotes = searchTeachings('tell me about the prodigal son', teachings)
    expect(quotes.length).toBeGreaterThan(0)
    expect(quotes[0].snippet).toMatch(/prodigal/i)
  })

  /*
   * The point of the whole feature: the words shown are the ministry's own.
   *
   * Checked against the raw post rather than against `teaching.text`, which
   * comes out of the same extraction this is meant to be testing. Going back
   * to `blogPosts` also proves the quote is attributed to the post it actually
   * came from, not merely to some post.
   */
  it('quotes text that appears verbatim in the post it is attributed to', () => {
    let checked = 0
    for (const question of ['who is Yeshua', 'what is Passover', 'tzitzit', 'the prodigal son']) {
      for (const { teaching, snippet } of searchTeachings(question, teachings)) {
        const post = blogPosts.find((candidate) => candidate.slug === teaching.slug)
        expect(post).toBeDefined()

        const source = (post as (typeof blogPosts)[number]).body.map(plain).join(' ')
        const verbatim = snippet.replace(/^…/, '').replace(/…$/, '')
        expect(source).toContain(verbatim)
        checked += 1
      }
    }
    // A guard against the loop silently finding nothing to check.
    expect(checked).toBeGreaterThan(3)
  })

  it('stays quiet on a subject the blog has not covered', () => {
    expect(searchTeachings('xyzzy quantum submarine', teachings)).toEqual([])
  })

  // A navigation question must not drag a teaching in behind it. "how do I
  // donate a car" once reached a teaching about raising children, on a single
  // incidental word.
  it.each(['how do I donate a car', 'what is your phone number', 'where are you located'])(
    'does not quote a teaching for "%s"',
    (question) => {
      expect(searchTeachings(question, teachings)).toEqual([])
    }
  )

  it('does not quote on a common word like "God" alone', () => {
    // Half the paragraphs mention God; that is not evidence about which one.
    expect(searchTeachings('God', teachings)).toEqual([])
  })

  it('returns nothing when asked for no quotes', () => {
    expect(searchTeachings('tzitzit', teachings, 0)).toEqual([])
    expect(searchTeachings('tzitzit', teachings, -1)).toEqual([])
  })

  it('shows at most one quote per post, and no more than asked for', () => {
    const quotes = searchTeachings('Yeshua Messiah Torah', teachings, 2)
    expect(quotes.length).toBeLessThanOrEqual(2)
    const slugs = quotes.map((quote) => quote.teaching.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('marks a snippet that starts mid-paragraph so it cannot be misread', () => {
    for (const { teaching, snippet } of searchTeachings('who is Yeshua', teachings)) {
      if (!teaching.text.startsWith(snippet.slice(0, 20))) {
        expect(snippet.startsWith('…')).toBe(true)
      }
    }
  })

  it('keeps snippets short enough to read inside the panel', () => {
    for (const question of ['who is Yeshua', 'tzitzit', 'what is Passover']) {
      for (const { snippet } of searchTeachings(question, teachings)) {
        expect(snippet.length).toBeLessThanOrEqual(340)
      }
    }
  })
})
