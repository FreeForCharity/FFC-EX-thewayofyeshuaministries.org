import { test, expect } from '@playwright/test'

test.describe('Homepage Gallery section', () => {
  test('renders heading and 6 dot indicators', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('section#gallery')
    await expect(section).toBeVisible()
    await expect(
      section.getByRole('heading', {
        name: /Through the Eyes of the Devout/i,
      })
    ).toBeVisible()
    const dots = section.locator('button[aria-label^="Show photo"]')
    await expect(dots).toHaveCount(6)
  })

  test('clicking next advances the slide', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('section#gallery')
    const dotsLocator = section.locator('button[aria-label^="Show photo"]')

    // First dot is white (active), rest are white/40
    const firstActive = await dotsLocator
      .nth(0)
      .evaluate((el) => el.className.includes('bg-white') && !el.className.includes('white/40'))
    expect(firstActive).toBe(true)

    await section.getByRole('button', { name: /next photo/i }).click()

    // After clicking next, second dot should now be active
    await expect
      .poll(
        async () =>
          dotsLocator
            .nth(1)
            .evaluate(
              (el) => el.className.includes('bg-white') && !el.className.includes('white/40')
            ),
        { timeout: 2000 }
      )
      .toBe(true)
  })

  test('clicking a dot jumps to that slide', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('section#gallery')
    const dot4 = section.locator('button[aria-label="Show photo 4"]')
    await dot4.click()
    await expect
      .poll(
        async () =>
          dot4.evaluate(
            (el) => el.className.includes('bg-white') && !el.className.includes('white/40')
          ),
        { timeout: 2000 }
      )
      .toBe(true)
  })
})
