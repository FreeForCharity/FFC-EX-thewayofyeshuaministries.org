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
  /** Role on the board or in the ministry, e.g. 'Founder & President'. */
  role: string
  /** One or more short paragraphs. Keep it factual and in plain language. */
  bio: string[]
  /**
   * Optional headshot, relative to `public/`. Must start with `/` -- it is
   * passed to `assetPath()`, which only prefixes the base path and would
   * otherwise produce a broken URL. Falls back to initials when absent.
   */
  photo?: `/${string}`
}

export const boardMembers: BoardMember[] = [
  {
    name: 'Patrick Bearup',
    role: '',
    bio: [],
  },
  {
    name: 'Rebekah Freeman',
    role: '',
    bio: [],
  },
  {
    name: 'John Cruz',
    role: '',
    bio: [],
  },
  {
    name: 'Alexandra Bearup',
    role: '',
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
