import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Image Loading Tests
 *
 * Verifies that critical images load correctly on the homepage:
 * 1. Header logo (an <img> element)
 * 2. Hero background photo (CSS background-image)
 */

test.describe('Image Loading', () => {
  test('header logo should load and be visible', async ({ page }) => {
    await page.goto('/')

    const headerLogo = page.locator(`header a[href="/"] img[alt="${testConfig.logo.headerAlt}"]`)
    await expect(headerLogo).toBeVisible()

    const src = await headerLogo.getAttribute('src')
    expect(src).toBeTruthy()
  })

  test('hero background image should load from local assets', async ({ page }) => {
    const imageRequests: Array<{ url: string; status: number }> = []

    page.on('response', (response) => {
      if (response.url().includes('hero-dove-cross')) {
        imageRequests.push({
          url: response.url(),
          status: response.status(),
        })
      }
    })

    await page.goto('/')

    // Hero section is visible
    const hero = page.locator('section#hero')
    await expect(hero).toBeVisible()

    // Browser fetched the hero background image
    expect(imageRequests.length).toBeGreaterThan(0)
    for (const request of imageRequests) {
      expect(request.status).toBe(200)
    }
  })
})
