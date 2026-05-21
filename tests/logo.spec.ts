import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Logo and Hero Visibility Tests
 *
 * 1. Header logo (top left) - validates the organization branding
 * 2. Hero section - validates the photographic hero section is present
 *    (Hero uses a CSS background-image, not an <img>, so we verify the
 *    section is visible and has a non-empty backgroundImage style.)
 */

test.describe('Logo and Hero Visibility', () => {
  test('should display logo in header', async ({ page }) => {
    await page.goto('/')

    const headerLogo = page.locator(`header a[href="/"] img[alt="${testConfig.logo.headerAlt}"]`)
    await expect(headerLogo).toBeVisible()
    await expect(headerLogo).toHaveAttribute('alt', testConfig.logo.headerAlt)
  })

  test('should display hero section with background image', async ({ page }) => {
    await page.goto('/')

    const hero = page.locator('section#hero')
    await expect(hero).toBeVisible()

    // The hero background lives on an inner absolutely-positioned div with
    // backgroundImage set inline; verify a URL is present.
    const bg = await hero.locator('div[style*="background-image"]').first().getAttribute('style')
    expect(bg).toContain('hero-dove-cross.jpg')
  })

  test('both header logo and hero section should be present on the same page', async ({ page }) => {
    await page.goto('/')

    const headerLogo = page.locator(`header a[href="/"] img[alt="${testConfig.logo.headerAlt}"]`)
    const hero = page.locator('section#hero')

    await expect(headerLogo).toBeVisible()
    await expect(hero).toBeVisible()
  })
})
