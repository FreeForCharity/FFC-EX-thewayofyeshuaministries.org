import { test, expect } from '@playwright/test'

const causePages = [
  {
    path: '/prison-program',
    title: /Help Our Cause/i,
    subheading: /Join Us/i,
    bodyText: /prison outreach/i,
  },
  {
    path: '/build-the-church',
    title: /Help Our Cause/i,
    subheading: /Build the Church/i,
    bodyText: /building a church/i,
  },
  {
    path: '/sponsor-a-tiny-home',
    title: /Help Our Cause/i,
    subheading: /Tiny Home Project/i,
    bodyText: /affordable housing/i,
  },
  {
    path: '/automobile-program',
    title: /Help someone that needs a car/i,
    subheading: /Our Program/i,
    bodyText: /vehicles that can be donated/i,
  },
  {
    path: '/support-this-ministry',
    title: /Help Our Cause/i,
    subheading: /Support This Ministry/i,
    bodyText: /Your support and contributions/i,
  },
]

test.describe('Cause subpages', () => {
  for (const p of causePages) {
    test(`${p.path} renders heading + subheading + body + CTAs`, async ({ page }) => {
      await page.goto(p.path)
      await expect(page.getByRole('heading', { name: p.title, level: 1 })).toBeVisible()
      await expect(page.locator('main')).toContainText(p.subheading)
      await expect(page.locator('main')).toContainText(p.bodyText)

      const donate = page
        .locator('a[href="https://www.zeffy.com/en-US/donation-form/donate-for-our-ministry"]')
        .first()
      await expect(donate).toBeVisible()
      await expect(donate).toHaveAttribute('target', '_blank')

      const contact = page.locator('a[href="/#contact"]').first()
      await expect(contact).toBeVisible()
    })
  }
})
