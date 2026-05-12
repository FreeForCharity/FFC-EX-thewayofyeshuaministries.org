import { test, expect } from '@playwright/test'

test.describe('Homepage Areas of Ministry grid', () => {
  test('renders heading and 8 tiles', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('section#areas')
    await expect(section).toBeVisible()
    await expect(
      section.getByRole('heading', {
        name: /Tap each photo of our areas of ministry/i,
      })
    ).toBeVisible()
    // 8 tiles: 6 are <Link>, 2 are <a> (external store, anchor to #support)
    const tiles = section.locator('a')
    await expect(tiles).toHaveCount(8)
  })

  test('Prison Program tile links to /prison-program', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('section#areas a[href="/prison-program"]').first()
    await expect(link).toBeVisible()
  })

  test('Build the Church tile links to /build-the-church', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('section#areas a[href="/build-the-church"]').first()
    await expect(link).toBeVisible()
  })

  test('Sponsor a Tiny Home tile links to /sponsor-a-tiny-home', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('section#areas a[href="/sponsor-a-tiny-home"]').first()
    await expect(link).toBeVisible()
  })

  test('Automobile Program tile links to /automobile-program', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('section#areas a[href="/automobile-program"]').first()
    await expect(link).toBeVisible()
  })

  test('Support tile links to /support-this-ministry', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('section#areas a[href="/support-this-ministry"]').first()
    await expect(link).toBeVisible()
  })

  test('Donate-by-QR tile anchors to the #support section', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('section#areas a[href="#support"][aria-label="Donate by QR"]').first()
    await expect(link).toBeVisible()
  })
})
