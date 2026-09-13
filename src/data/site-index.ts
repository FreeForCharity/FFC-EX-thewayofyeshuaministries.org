/**
 * What the site helper can point a visitor at.
 *
 * Every entry is one destination on (or just off) the site, described the way
 * a visitor would ask about it. The helper matches a typed question against
 * these entries and hands back links -- see `src/lib/siteSearch.ts`.
 *
 * Two rules keep this file useful:
 *
 * 1. **Add a page here when you add a page.** A route that is not in this list
 *    cannot be found by anyone asking for it.
 * 2. **Keywords are for the words visitors type**, not synonyms nobody says.
 *    If someone asks "do you take old cars" and gets nothing, the fix is to
 *    add "old cars" to the Automobile Program entry.
 *
 * Program summaries are read from `programs.ts` so the helper never contradicts
 * the status shown on the home page.
 *
 * Blog posts are *not* here. They live in `teachings.ts`, which the helper
 * loads on demand -- the posts are the largest thing on the site, and this
 * module is reachable from every page. Keep it that way: importing the posts
 * from here puts the whole blog into every page's JavaScript.
 */

import type { SiteIndexEntry } from '@/lib/siteSearch'
import { programs } from '@/data/programs'

/**
 * The summary `programs.ts` gives for the program at `href`, falling back to
 * the text passed in when that program is not listed there.
 */
function programSummary(href: string, fallback: string): string {
  return programs.find((program) => program.href === href)?.summary ?? fallback
}

/**
 * Pages, home page sections, and the two off-site links visitors ask for.
 * Searchable immediately, without waiting for anything to load.
 */
export const pageIndex: SiteIndexEntry[] = [
  {
    id: 'prison-program',
    title: 'Prison Outreach Program',
    href: '/prison-program',
    section: 'Programs',
    summary: programSummary(
      '/prison-program',
      'We send communion supplies, Holy Day supplies, and Scripture-based encouragement to incarcerated believers.'
    ),
    keywords: [
      'prison',
      'prisoner',
      'inmate',
      'incarcerated',
      'jail',
      'behind bars',
      'correctional facility',
      'communion supplies',
      'holy day supplies',
      'write to a prisoner',
      'send a bible',
      'stamps',
      'devotionals',
    ],
  },
  {
    id: 'automobile-program',
    title: 'Automobile Program',
    href: '/automobile-program',
    section: 'Programs',
    summary: programSummary(
      '/automobile-program',
      'Donated vehicles are repaired by volunteer mechanics and given to people who need transportation but cannot afford it.'
    ),
    keywords: [
      'car',
      'cars',
      'old car',
      'vehicle',
      'truck',
      'van',
      'automobile',
      'donate a car',
      'car donation',
      'vehicle donation',
      'transportation',
      'need a car',
      'mechanic',
      'repair',
      'title',
      'tow',
    ],
  },
  {
    id: 'sponsor-a-tiny-home',
    title: 'Sponsor a Tiny Home',
    href: '/sponsor-a-tiny-home',
    section: 'Programs',
    summary: programSummary(
      '/sponsor-a-tiny-home',
      'Small, dignified homes for neighbors who are unhoused. Funding is the one thing standing between this and the first unit.'
    ),
    keywords: [
      'tiny home',
      'tiny house',
      'housing',
      'house',
      'homeless',
      'unhoused',
      'shelter',
      'sponsor a home',
      'roof',
      'somewhere to live',
    ],
  },
  {
    id: 'build-the-church',
    title: 'Build the Church',
    href: '/build-the-church',
    section: 'Programs',
    summary: programSummary(
      '/build-the-church',
      'A permanent home for worship, Scripture study, fellowship meals, and the space our outreach programs need.'
    ),
    keywords: [
      'church',
      'building',
      'build',
      'construction',
      'land',
      'property',
      'sanctuary',
      'worship space',
      'capital campaign',
      'where do you meet',
      'services',
    ],
  },
  {
    id: 'support-this-ministry',
    title: 'Support This Ministry',
    href: '/support-this-ministry',
    section: 'Give',
    summary:
      'Every way to stand with the ministry: one-time and monthly gifts, what each amount covers, and giving by prayer and time as well as money.',
    keywords: [
      'donate',
      'donation',
      'give',
      'giving',
      'gift',
      'support',
      'tithe',
      'offering',
      'monthly',
      'recurring',
      'contribute',
      'money',
      'fund',
      'help out',
      'volunteer',
      'pray',
      'tax deductible',
      'receipt',
      'paypal',
      'venmo',
    ],
  },
  {
    id: 'give-online',
    title: 'Give online (Zeffy)',
    href: 'https://www.zeffy.com/en-US/donation-form/donate-for-our-ministry',
    section: 'Give',
    summary:
      'The secure donation form. Zeffy passes on 100% of your gift — the ministry pays no processing fee.',
    keywords: [
      'donate now',
      'give now',
      'donation form',
      'zeffy',
      'credit card',
      'debit card',
      'online giving',
      'secure',
      'fees',
    ],
    external: true,
  },
  {
    id: 'contact',
    title: 'Contact Us',
    href: '/#contact',
    section: 'Contact',
    summary:
      'Phone (520) 302-4034, email Info@thewayofyeshuaministries.org, our Tucson and Sun City addresses, and hours of 09:00-17:00 daily.',
    keywords: [
      'contact',
      'phone',
      'phone number',
      'call',
      'email',
      'address',
      'located',
      'location',
      'where are you',
      'directions',
      'hours',
      'open',
      'reach you',
      'talk to someone',
      'get in touch',
      'question',
      'tucson',
      'sun city',
      'arizona',
      'mailing',
      'po box',
    ],
  },
  {
    id: 'mission',
    title: 'Our Mission',
    href: '/#mission',
    section: 'About',
    summary: 'What The Way of Yeshua Ministries is here to do and the faith the work is built on.',
    keywords: [
      'mission',
      'about',
      'who are you',
      'what do you do',
      'purpose',
      'vision',
      'values',
      'beliefs',
      'believe',
      'statement of faith',
      'yeshua',
      'jesus',
      'messianic',
    ],
  },
  {
    id: 'board-of-directors',
    title: 'Board of Directors',
    href: '/board-of-directors',
    section: 'About',
    summary:
      'The people who lead the ministry, plus the public registration records a donor can check: Arizona Corporation Commission and IRS.',
    keywords: [
      'board',
      'directors',
      'leadership',
      'leaders',
      'who runs',
      'who leads',
      'runs the ministry',
      'ministry leadership',
      'founder',
      'president',
      'pastor',
      'staff',
      'team',
      'nonprofit',
      '501c3',
      'charity status',
      'registered',
      'legitimate',
      'verify',
      'irs',
      'tax exempt',
      'good standing',
    ],
  },
  {
    id: 'programs',
    title: 'Program Status',
    href: '/#programs',
    section: 'About',
    summary:
      'An honest list of every program: which ones are serving people today, which are still being built, and which are waiting on funding.',
    keywords: [
      'programs',
      'what are you doing',
      'active',
      'serving',
      'in development',
      'status',
      'progress',
      'food pantry',
      'pantry',
      'impact',
      'results',
    ],
  },
  {
    id: 'blog',
    title: 'Blog',
    href: '/blog',
    section: 'Teaching',
    summary:
      'Weekly Torah portions, teachings on the feasts, and reflections on Scripture from the ministry.',
    keywords: [
      'blog',
      'teaching',
      'teachings',
      'torah portion',
      'parashat',
      'parsha',
      'sermon',
      'study',
      'bible study',
      'scripture',
      'devotional',
      'articles',
      'posts',
      'read',
      'shabbat',
      'feasts',
      'holy days',
    ],
  },
  {
    id: 'gallery',
    title: 'Photo Gallery',
    href: '/#gallery',
    section: 'About',
    summary: 'Photographs from the ministry and the people it serves.',
    keywords: ['gallery', 'photo', 'photos', 'pictures', 'images', 'see the work'],
  },
  {
    id: 'sponsors',
    title: 'Business Sponsors',
    href: '/#sponsors',
    section: 'Give',
    summary: 'The businesses standing behind this ministry, and how a business can join them.',
    keywords: [
      'sponsor',
      'sponsors',
      'business',
      'businesses',
      'corporate',
      'partner',
      'partnership',
      'company',
      'advertise',
    ],
  },
  {
    id: 'coming-soon',
    title: 'Coming Soon',
    href: '/#coming-soon',
    section: 'About',
    summary:
      'What is on the way: building videos, podcasts, the food pantry, and ministry merchandise.',
    keywords: [
      'coming soon',
      'podcast',
      'podcasts',
      'videos',
      'food pantry',
      'merchandise',
      'merch',
      'new',
      'next',
      'future',
    ],
  },
  {
    id: 'store',
    title: 'Store',
    href: 'https://thewayofyeshuaministries.org/store',
    section: 'Give',
    summary: 'Ministry merchandise. Purchases support the work.',
    keywords: ['store', 'shop', 'buy', 'merchandise', 'merch', 'shirt', 'apparel', 'products'],
    external: true,
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    href: '/privacy-policy',
    section: 'Policies',
    summary: 'What this site collects, why, and what your choices are.',
    keywords: ['privacy', 'data', 'personal information', 'gdpr', 'tracking', 'analytics'],
  },
  {
    id: 'cookie-policy',
    title: 'Cookie Policy',
    href: '/cookie-policy',
    section: 'Policies',
    summary: 'Which cookies this site uses and how to change your preferences.',
    keywords: ['cookie', 'cookies', 'consent', 'preferences', 'opt out'],
  },
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    href: '/terms-of-service',
    section: 'Policies',
    summary: 'The terms that apply to using this website.',
    keywords: ['terms', 'conditions', 'legal', 'disclaimer', 'copyright'],
  },
]

/**
 * Shown before a visitor has typed anything -- real questions people ask, so
 * the empty state teaches what the box is for.
 */
export const suggestedQuestions: string[] = [
  'How do I donate?',
  'Can I donate a car?',
  'What is your phone number?',
  'Who runs this ministry?',
  'How do I help someone in prison?',
]

/** Where visitors are sent when no page answers their question. */
export const contactFallback = {
  phone: '(520) 302-4034',
  phoneHref: 'tel:5203024034',
  email: 'Info@thewayofyeshuaministries.org',
  emailHref: 'mailto:Info@thewayofyeshuaministries.org',
}
