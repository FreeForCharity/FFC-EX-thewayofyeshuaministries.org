import { searchTeachings } from '../../src/lib/siteSearch'
import { getTeachings, getBlogEntries } from '../../src/data/teachings'

const teachings = getTeachings()

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
      expect(teaching.text.startsWith('Shalom and blessings')).toBe(false)
      expect(teaching.text.startsWith('Shabbat Shalom.')).toBe(false)
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

  // The point of the whole feature: the words shown are the ministry's own.
  it('quotes text that appears verbatim in the teaching it came from', () => {
    for (const question of ['who is Yeshua', 'what is Passover', 'tzitzit']) {
      for (const { teaching, snippet } of searchTeachings(question, teachings)) {
        const verbatim = snippet.replace(/^…/, '').replace(/…$/, '')
        expect(teaching.text).toContain(verbatim)
      }
    }
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
