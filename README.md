# The Way of Yeshua Ministries Website

Next.js 16.0.7 single-page website for [The Way of Yeshua Ministries](https://thewayofyeshuaministries.org) Inc., a 501(c)(3) Christian ministry based in Sun City, Arizona.

- **Production**: https://thewayofyeshuaministries.org (apex domain — currently still on customer host)
- **Staging**: https://staging.thewayofyeshuaministries.org (this repo, deployed via GitHub Pages)
- **Hosted free** by [Free For Charity](https://freeforcharity.org), a 501(c)(3) supporting nonprofit organizations.

## What the site covers

The site documents the ministry's mission and outreach programs:

- **Mission & Teachings** — homepage hero, mission statement, embedded YouTube teaching, gallery, scripture banner
- **Prison Program** — outreach providing communion and Holy Day supplies to incarcerated people
- **Build the Church** — capital campaign for the ministry's church building
- **Sponsor a Tiny Home** — affordable housing project for people in need
- **Automobile Donation Program** — vehicle repair and donation to people who need a car
- **Support This Ministry** — general giving page
- **Contact** — phone, email, mailing address, hours, contact form
- **Ask a question** — a helper on every page that turns a plain-language question into links to the pages that answer it (see [Site helper](#site-helper))

## Tech stack

- **Framework**: Next.js 16 (App Router) with static export (`output: 'export'`)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS
- **Testing**: Jest + Testing Library, Playwright, jest-axe (a11y)
- **Hosting**: GitHub Pages with custom domain (CNAME → `freeforcharity.github.io`)

## Local development

```bash
pnpm install
pnpm run dev
```

Build for production:

```bash
pnpm run build
```

Run the full check suite locally before committing:

```bash
pnpm run format
pnpm run lint
pnpm test
pnpm run build
pnpm run test:e2e
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, metadata, fonts
│   ├── page.tsx                # Homepage entrypoint
│   ├── home-page/              # Homepage section composition
│   ├── prison-program/         # /prison-program
│   ├── build-the-church/       # /build-the-church
│   ├── sponsor-a-tiny-home/    # /sponsor-a-tiny-home
│   ├── automobile-program/     # /automobile-program
│   ├── support-this-ministry/  # /support-this-ministry
│   ├── privacy-policy/         # /privacy-policy
│   ├── cookie-policy/          # /cookie-policy
│   └── terms-of-service/       # /terms-of-service
├── components/
│   ├── header/                 # Sticky navigation
│   ├── footer/                 # Footer with contact + socials
│   ├── home-page/              # Homepage sections (Hero, Mission, Gallery, ...)
│   ├── cause-page/             # Shared subpage template
│   ├── cookie-consent/         # GDPR cookie banner
│   ├── google-tag-manager/     # Analytics
│   ├── site-helper/            # "Ask a question" helper
│   └── ui/                     # Generic UI primitives
├── data/                       # Content modules (programs, blog posts, site index, ...)
└── lib/                        # Helpers (fonts, basePath, site search)
public/Images/yeshua/           # Ministry images captured from live site
```

## Site helper

Every page carries an **Ask a question** button. A visitor types what they are
looking for — "how do I donate a car", "what is your phone number" — and gets
back links to the pages that answer it. When nothing matches, the helper offers
the ministry's phone number and email rather than guessing.

It runs entirely in the visitor's browser. There is no AI service behind it, no
API key, and no cost: the site is a static export, so the question never leaves
the visitor's device and nothing is logged.

Where the blog has covered a subject, the helper also quotes it — the
ministry's own paragraph, with a link to the full teaching. Nothing is
generated or paraphrased: the words shown are the words that were written.
Questions about faith always get an invitation to contact the ministry
directly, whether or not anything matched.

Three files keep it accurate:

| File                     | What it holds                                                 |
| ------------------------ | ------------------------------------------------------------- |
| `src/data/site-index.ts` | Every page the helper can offer, and its keywords             |
| `src/data/teachings.ts`  | The blog, cut into quotable paragraphs — **loaded on demand** |
| `src/lib/siteSearch.ts`  | The matching itself — scoring, ranking, and cut-offs          |

**When you add a page, add it to `site-index.ts`** — a route that is not listed
there cannot be found by anyone asking for it. Blog posts are pulled in
automatically, and program descriptions are read from `src/data/programs.ts`.

**Do not import `teachings.ts` from anywhere that runs at page load.** It pulls
in every blog post, which is the largest thing on the site; the helper imports
it only once a visitor opens the panel, so the other pages never carry it.

**When a real question finds the wrong page**, add the words the visitor
actually typed to that entry's `keywords`, then add the question to
`__tests__/lib/siteSearch.test.ts` so it stays answered.

## Hosting & contributors

This site is built and maintained by **Free For Charity** as part of its mission to host websites for verified 501(c)(3) nonprofits at no cost. See [Free For Charity](https://freeforcharity.org) for details on the program.

## License

Apache-2.0 (codebase) — see [LICENSE](./LICENSE).

## Template guides

This repo was created from `FreeForCharity/FFC_Single_Page_Template`. Template-level guides retained for reference:

- [Quick Start Guide](./QUICK_START.md)
- [Template Usage Guide](./TEMPLATE_USAGE.md)
- [Content Replacement Guide](./CONTENT_REPLACEMENT_GUIDE.md)
- [Testing Guide](./TESTING.md)
- [Responsive Design Guide](./RESPONSIVE_DESIGN.md)
- [Naming Conventions](./NAMING_CONVENTIONS.md)
- [Deployment Guide](./DEPLOYMENT.md)
