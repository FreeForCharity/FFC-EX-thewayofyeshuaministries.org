import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

test.describe('Footer Social Links', () => {
  test('should not contain Google+ social link', async ({ page }) => {
    await page.goto('/')
    const googlePlusLink = page.locator('footer a[href*="plus.google.com"]')
    await expect(googlePlusLink).toHaveCount(0)
  })

  test('should display active social media links', async ({ page }) => {
    await page.goto('/')

    const facebookLink = page.locator(`footer a[href*="${testConfig.socialLinks.facebook.url}"]`)
    await expect(facebookLink).toBeVisible()
    await expect(facebookLink).toHaveAttribute(
      'aria-label',
      testConfig.socialLinks.facebook.ariaLabel
    )

    const twitterLink = page.locator(`footer a[href*="${testConfig.socialLinks.twitter.url}"]`)
    await expect(twitterLink).toBeVisible()

    const linkedInLink = page.locator(`footer a[href*="${testConfig.socialLinks.linkedin.url}"]`)
    await expect(linkedInLink).toBeVisible()

    const instagramLink = page.locator(`footer a[href*="${testConfig.socialLinks.instagram.url}"]`)
    await expect(instagramLink).toBeVisible()

    const youtubeLink = page.locator(`footer a[href*="${testConfig.socialLinks.youtube.url}"]`)
    await expect(youtubeLink).toBeVisible()
  })

  test('should have exactly 5 social media icons', async ({ page }) => {
    await page.goto('/')

    const socialMediaLinks = page.locator(
      `footer a[aria-label="${testConfig.socialLinks.facebook.ariaLabel}"], footer a[aria-label="${testConfig.socialLinks.twitter.ariaLabel}"], footer a[aria-label="${testConfig.socialLinks.linkedin.ariaLabel}"], footer a[aria-label="${testConfig.socialLinks.instagram.ariaLabel}"], footer a[aria-label="${testConfig.socialLinks.youtube.ariaLabel}"]`
    )
    await expect(socialMediaLinks).toHaveCount(5)
  })
})
