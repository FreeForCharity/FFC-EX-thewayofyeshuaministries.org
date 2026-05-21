import { test, expect } from '@playwright/test'

const causePages = [
  {
    path: '/prison-program',
    title: /Prison Outreach Program/i,
    subheading: /Join Us/i,
    bodyText: /prison outreach/i,
  },
  {
    path: '/build-the-church',
    title: /Help Us Build the Church/i,
    subheading: /Our Vision/i,
    bodyText: /worship space|permanent home/i,
  },
  {
    path: '/sponsor-a-tiny-home',
    title: /Sponsor a Tiny Home/i,
    subheading: /Housing the Vulnerable/i,
    bodyText: /tiny home|dignified|sleeping in cars/i,
  },
  {
    path: '/automobile-program',
    title: /Help someone that needs a car/i,
    subheading: /Our Program/i,
    bodyText: /vehicles that can be donated/i,
  },
  {
    path: '/support-this-ministry',
    title: /Support The Way of Yeshua Ministries/i,
    subheading: /Stand With Us/i,
    bodyText: /Scripture lesson|every gift|standing with us/i,
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
