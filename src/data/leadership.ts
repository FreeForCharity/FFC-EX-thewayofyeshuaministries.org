/**
 * Board of Directors -- the people who lead The Way of Yeshua Ministries.
 *
 * Donors and nonprofit directories look for this before they give. Everything
 * here must be factual: real names, real roles, real background. Never invent
 * or embellish a bio.
 *
 * To add a photo: drop the file in `public/Images/yeshua/board/` and set
 * `photo` to the path. Members without a photo render with their initials, so
 * the page stays consistent whether or not headshots are available.
 */

export interface BoardMember {
  /** Full name as it should appear publicly. */
  name: string
  /**
   * Role on the board or in the ministry, e.g. 'Founder & President'.
   * Omit it rather than setting an empty string when it is not yet known.
   */
  role?: string
  /**
   * Short paragraphs, factual and in plain language. May be empty for a
   * member whose bio has not been supplied yet -- the page then renders the
   * name and role alone rather than a placeholder.
   */
  bio: string[]
  /**
   * Optional headshot, relative to `public/`. Must start with `/` -- it is
   * passed to `assetPath()`, which only prefixes the base path and would
   * otherwise produce a broken URL. Falls back to initials when absent.
   */
  photo?: `/${string}`
  /** Optional outbound links, e.g. an affiliated ministry or organization. */
  links?: { label: string; href: string }[]
}

export const boardMembers: BoardMember[] = [
  {
    name: 'Dr. Patrick Bearup',
    role: 'Founder & Director',
    bio: [
      'Dr. Patrick Bearup founded The Way of Yeshua Ministries and serves as its director. He holds a doctorate in theology and religious education.',
      'He also serves as associate pastor of Bearup International Ministries and sits on its board.',
    ],
    links: [
      {
        label: 'Bearup International Ministries',
        href: 'https://bearupinternationalministries.org',
      },
    ],
  },
  {
    name: 'Alexandra Bearup',
    role: 'President',
    bio: [],
  },
  {
    name: 'John Cruz',
    role: 'Vice President',
    bio: [],
  },
  {
    name: 'Rebekah Freeman',
    role: 'Treasurer & Secretary',
    bio: [],
  },
]

/** Initials used for the photo placeholder, e.g. 'Patrick Bearup' -> 'PB'. */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase())
    .slice(0, 2)
    .join('')
}
