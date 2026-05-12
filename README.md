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

## Tech stack

- **Framework**: Next.js 16 (App Router) with static export (`output: 'export'`)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS
- **Testing**: Jest + Testing Library, Playwright, jest-axe (a11y)
- **Hosting**: GitHub Pages with custom domain (CNAME → `freeforcharity.github.io`)

## Local development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Run the full check suite locally before committing:

```bash
npm run format
npm run lint
npm test
npm run build
npm run test:e2e
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
│   └── ui/                     # Generic UI primitives
└── lib/                        # Helpers (fonts, basePath)
public/Images/yeshua/           # Ministry images captured from live site
```

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
