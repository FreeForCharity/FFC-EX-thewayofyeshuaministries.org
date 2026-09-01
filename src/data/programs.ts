/**
 * Program status -- the single source of truth for what The Way of Yeshua
 * Ministries is actually doing today.
 *
 * Donors, grantmakers, and nonprofit directories ask a fair question: which of
 * these programs have served a real person, and which are still being built?
 * Keep this file honest. A program only moves to `serving` once it has
 * delivered something to someone outside the ministry.
 */

/**
 * `serving` means the program has delivered something to a real person.
 * `seeking-sponsors` and `in-development` both mean it has not: the former
 * additionally tells a reader that funding is the thing holding it up.
 */
export type ProgramStatus = 'serving' | 'seeking-sponsors' | 'in-development'

export interface Program {
  /** Program name as it appears to the public. */
  name: string
  /** Where the program is in its life -- drives the badge and the grouping. */
  status: ProgramStatus
  /** Plain-language description of what is actually happening right now. */
  summary: string
  /** Internal route to the program's page, when it has one. */
  href?: string
}

/** Badge copy and colors for each status. */
export const statusLabels: Record<ProgramStatus, { label: string; className: string }> = {
  serving: {
    label: 'Serving people now',
    className: 'bg-[#1F6B3A] text-white',
  },
  'seeking-sponsors': {
    label: 'In development — seeking sponsors',
    className: 'bg-[#C9A24B] text-black',
  },
  'in-development': {
    label: 'In development',
    className: 'bg-gray-200 text-gray-800',
  },
}

export const programs: Program[] = [
  {
    name: 'Prison Outreach Program',
    status: 'serving',
    summary:
      'We send communion supplies, Holy Day supplies, and Scripture-based encouragement to incarcerated believers so they can keep the appointed times of the Lord from inside a facility. Packages are going out now.',
    href: '/prison-program',
  },
  {
    name: 'Automobile Program',
    status: 'serving',
    summary:
      'Donated vehicles are repaired by volunteer mechanics and given to people in our community who need transportation but cannot afford it. Cars have already been repaired and placed with recipients.',
    href: '/automobile-program',
  },
  {
    name: 'Tiny Home Project',
    status: 'seeking-sponsors',
    summary:
      'Small, dignified homes for neighbors who are unhoused. No homes have been built yet. We are seeking sponsors to fund the first units.',
    href: '/sponsor-a-tiny-home',
  },
  {
    name: 'Food Pantry',
    status: 'in-development',
    summary:
      'A pantry for neighbors in need. We are still setting it up and it has not opened yet. It will launch alongside our permanent building.',
  },
  {
    name: 'Church Building',
    status: 'in-development',
    summary:
      'A permanent home for worship, Scripture study, fellowship meals, and the operational space our outreach programs need. We are raising funds toward land and construction.',
    href: '/build-the-church',
  },
]
