import { searchTeachings } from '../../src/lib/siteSearch'
import { extractTeachings, toBlogEntries, buildTeachingPayload } from '../../src/lib/teachings'
import { blogPosts, getPublishedPosts } from '../../src/data/blog-posts'

const published = getPublishedPosts()
const teachings = extractTeachings(published)

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

  it('leaves out a blessing that follows the contact block', () => {
    // The Rosh Hashanah post closes with "May the sound of the trumpet stir us
    // all to readiness" *after* its contact block: long enough to clear the
    // length rule, and worded unlike the other sign-offs.
    expect(teachings.some((teaching) => /May the sound of the trumpet/.test(teaching.text))).toBe(
      false
    )
  })

  it('stops at the contact block wherever it falls in a post', () => {
    const [before, ...rest] = extractTeachings([
      {
        slug: 'test-post',
        title: 'A Teaching',
        date: '2020-01-01',
        excerpt: 'x',
        body: [
          'A teaching paragraph long enough to be quoted, about the ways the Scriptures ' +
            'hold together the promise and the command, and what that asks of us.',
          '&nbsp;&nbsp;&bull; Phone: <a href="tel:5203024034">(520) 302-4034</a>',
          'A closing blessing that follows the contact block and is comfortably longer ' +
            'than the hundred characters the length rule asks for.',
        ],
      },
    ])
    expect(before.text).toMatch(/^A teaching paragraph/)
    expect(rest).toHaveLength(0)
  })

  it('leaves out every form of the greeting and sign-off', () => {
    for (const teaching of teachings) {
      // Openings: "Shalom and blessings, beloved." and "Shalom, beloved."
      expect(teaching.text).not.toMatch(/^Shalom\b/)
      expect(teaching.text).not.toMatch(/^Blessings and Shalom\b/)
      // Closings: "Shabbat Shalom." through "Shabbat Shalom and Chanukah
      // Sameach!", and a bare "Chag Shavuot Sameach!" on the feast posts.
      expect(teaching.text).not.toMatch(/^Shabbat Shalom\b/)
      expect(teaching.text).not.toMatch(/^Chag [A-Za-z]+ Sameach/)
      expect(teaching.heading ?? '').not.toMatch(/^Shabbat Shalom\b/)
    }
  })

  it('keeps a teaching that merely opens with the word "Blessings"', () => {
    /*
     * The greeting filter is anchored and narrow on purpose. "Blessings to
     * everyone. Today I want to talk about ..." opens a real teaching in the
     * corpus and must not be swept up with the blessings that are not.
     *
     * Checked against a paragraph written here rather than that one, which is
     * too short to be quoted anyway: this is about the prefix rule, not the
     * length rule.
     */
    const [teaching] = extractTeachings([
      {
        slug: 'test-post',
        title: 'A Teaching',
        date: '2020-01-01',
        excerpt: 'x',
        body: [
          'Blessings to everyone. Today I want to talk about what it means to work out ' +
            'our faith, and why the Scriptures hold obedience and grace together rather ' +
            'than setting them against one another.',
        ],
      },
    ])
    expect(teaching).toBeDefined()
    expect(teaching.text).toMatch(/^Blessings to everyone/)
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

  it('offers only posts that have a page, never a future-dated draft', () => {
    /*
     * Blog routes are generated at build time with dynamicParams: false, so a
     * post the helper offers but the build did not emit would 404. The corpus
     * is built from the same getPublishedPosts() call generateStaticParams
     * makes, which is what keeps the two in step.
     */
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Phoenix' })

    /*
     * Stated as a property of what is offered rather than as "the drafts are
     * absent". There are 15 scheduled posts today, but the last publishes on
     * 2026-12-25, and a test that required unpublished posts to exist would
     * start failing on a weekly build after that with nothing actually wrong.
     */
    expect(teachings.length).toBeGreaterThan(0)
    for (const teaching of teachings) {
      const post = blogPosts.find((candidate) => candidate.slug === teaching.slug)
      expect((post as (typeof blogPosts)[number]).date <= today).toBe(true)
    }
  })

  it('excludes any post dated after the cutoff it is given', () => {
    // Pin the behaviour directly rather than relying on today's date: build a
    // corpus from a cutoff that deliberately drops the most recent post.
    const byDate = [...published].sort((a, b) => a.date.localeCompare(b.date))
    const dropped = byDate[byDate.length - 1]
    const kept = byDate.filter((post) => post.date < dropped.date)

    const payload = buildTeachingPayload(kept)
    const slugs = new Set(payload.teachings.map((teaching) => teaching.slug))
    const entrySlugs = new Set(payload.entries.map((entry) => entry.href.replace('/blog/', '')))

    expect(slugs.has(dropped.slug)).toBe(false)
    expect(entrySlugs.has(dropped.slug)).toBe(false)
    expect(entrySlugs.has(byDate[0].slug)).toBe(true)
  })

  it('gives every teaching a unique id and a post to link to', () => {
    const ids = teachings.map((teaching) => teaching.id)
    expect(new Set(ids).size).toBe(ids.length)
    const slugs = new Set(toBlogEntries(published).map((entry) => entry.href.replace('/blog/', '')))
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

  it('stays quiet for a question with no subject', () => {
    // "what is" is all stop words. It would otherwise match the thirty
    // paragraphs headed "What Is the Spirit Saying This Week?".
    expect(searchTeachings('what is', teachings)).toEqual([])
    expect(searchTeachings('who are you', teachings)).toEqual([])
    expect(searchTeachings('is it', teachings)).toEqual([])
  })

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
