/**
 * Business sponsors of The Way of Yeshua Ministries.
 *
 * To add a sponsor, add an entry to the array below. Only `name` and `url` are
 * required — a card is rendered with the business name linking to their website.
 *
 * Optional fields:
 *   - `description`: one short line shown under the business name.
 *   - `logo`: path to a logo placed in `public/Images/yeshua/sponsors/`
 *     (for example `/Images/yeshua/sponsors/acme-hardware.png`).
 *
 * Sponsors appear on the home page in the order listed here. Leaving the array
 * empty simply hides the sponsor grid; the "become a sponsor" invitation still
 * shows.
 */
export interface Sponsor {
  /** Business name, shown as the card title. */
  name: string
  /** Full URL to the business website, including https://. */
  url: string
  /** Optional one-line description of the business. */
  description?: string
  /** Optional logo path under /public, e.g. '/Images/yeshua/sponsors/acme.png'. */
  logo?: string
}

export const sponsors: Sponsor[] = [
  {
    name: 'Don John by Victoria Charles',
    url: 'https://donjohnbyvictoriacharles.com',
    description:
      "Men's and women's handmade clothing and accessories, from the affordable to the extravagant",
    logo: '/Images/yeshua/sponsors/don-john.png',
  },
  {
    name: 'Don John Style 4 Ur Home',
    url: 'https://www.donjohnstyle4urhome.com',
    description: 'Premium handmade products for homes and businesses',
    logo: '/Images/yeshua/sponsors/don-john.png',
  },
  {
    name: 'Project Rebirth',
    url: 'https://projectrebirth.org',
    description: 'A resilience resource for all who serve community and country',
    logo: '/Images/yeshua/sponsors/project-rebirth.png',
  },
  // Example — copy this shape for each business that gives to the ministry:
  // {
  //   name: 'Acme Hardware',
  //   url: 'https://www.acmehardware.example',
  //   description: 'Family-owned hardware store in Sun City, AZ',
  //   logo: '/Images/yeshua/sponsors/acme-hardware.png',
  // },
]
