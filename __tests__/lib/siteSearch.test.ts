import { searchSite, tokenize, type SiteIndexEntry } from '../../src/lib/siteSearch'
import { getSiteIndex, suggestedQuestions } from '../../src/data/site-index'

const index = getSiteIndex()

/** The id of the best answer for a question, or undefined when there is none. */
function topMatch(question: string): string | undefined {
  return searchSite(question, index)[0]?.id
}

describe('tokenize', () => {
  it('drops function words that say nothing about which page is wanted', () => {
    expect(tokenize('how do I donate a car')).toEqual(['donate', 'car'])
  })

  it('reduces plurals so "cars" finds "car"', () => {
    expect(tokenize('cars')).toEqual(['car'])
    expect(tokenize('ministries')).toEqual(['ministry'])
    expect(tokenize('churches')).toEqual(['church'])
  })

  it('keeps the words of a question made entirely of function words', () => {
    // "who are you" would otherwise tokenize to nothing and match nothing.
    expect(tokenize('who are you')).toEqual(['who', 'are', 'you'])
  })

  it('ignores punctuation and capitalization', () => {
    expect(tokenize('Donate?!')).toEqual(['donate'])
  })

  it('returns nothing for an empty question', () => {
    expect(tokenize('   ')).toEqual([])
  })
})

describe('searchSite', () => {
  it('returns nothing for an empty question', () => {
    expect(searchSite('', index)).toEqual([])
    expect(searchSite('   ', index)).toEqual([])
  })

  it.each([
    ['how do I donate a car', 'automobile-program'],
    ['do you take old cars', 'automobile-program'],
    ['what is your phone number', 'contact'],
    ['where are you located', 'contact'],
    ['how can I help someone in prison', 'prison-program'],
    ['tiny homes for homeless people', 'sponsor-a-tiny-home'],
    ['who runs this ministry', 'board-of-directors'],
    ['are you a registered 501c3', 'board-of-directors'],
    ['torah portion teaching', 'blog'],
    ['do you use cookies', 'cookie-policy'],
    ['building the church', 'build-the-church'],
  ])('answers "%s" with the %s page', (question, expectedId) => {
    expect(topMatch(question)).toBe(expectedId)
  })

  it('points giving questions at a page about giving', () => {
    const ids = searchSite('I want to give money', index).map((entry) => entry.id)
    expect(ids).toEqual(expect.arrayContaining(['support-this-ministry']))
  })

  it('answers every suggested question with at least one link', () => {
    for (const question of suggestedQuestions) {
      expect(searchSite(question, index).length).toBeGreaterThan(0)
    }
  })

  it('returns nothing rather than a bad guess when nothing matches', () => {
    expect(searchSite('xyzzy quantum submarine', index)).toEqual([])
  })

  it('never returns more than the requested number of links', () => {
    expect(searchSite('ministry', index, 3).length).toBeLessThanOrEqual(3)
  })

  it('caps results by default so the panel stays readable', () => {
    expect(searchSite('ministry', index).length).toBeLessThanOrEqual(5)
  })

  it('ranks a title match above a summary mention', () => {
    const entries: SiteIndexEntry[] = [
      {
        id: 'mentions-parking',
        title: 'Visit Us',
        href: '/visit',
        section: 'About',
        summary: 'There is parking behind the building.',
        keywords: [],
      },
      {
        id: 'about-parking',
        title: 'Parking',
        href: '/parking',
        section: 'About',
        summary: 'Where to leave your car.',
        keywords: [],
      },
    ]
    expect(searchSite('parking', entries)[0].id).toBe('about-parking')
  })

  it('matches a keyword that appears nowhere in the title or summary', () => {
    const entries: SiteIndexEntry[] = [
      {
        id: 'give',
        title: 'Support This Ministry',
        href: '/give',
        section: 'Give',
        summary: 'Stand with the work.',
        keywords: ['tithe'],
      },
    ]
    expect(searchSite('tithe', entries).map((entry) => entry.id)).toEqual(['give'])
  })

  it('includes off-site links, marked as external', () => {
    const store = searchSite('merchandise shop', index).find((entry) => entry.id === 'store')
    expect(store?.external).toBe(true)
    expect(store?.href).toMatch(/^https:\/\//)
  })

  it('gives every entry a usable link and a summary', () => {
    for (const entry of index) {
      expect(entry.href).toMatch(/^(\/|https:\/\/)/)
      expect(entry.summary.trim().length).toBeGreaterThan(0)
    }
  })

  it('gives every entry a unique id', () => {
    const ids = index.map((entry) => entry.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
