import { test, expect } from '@playwright/test'
import { sponsors } from '../src/data/sponsors'

test.describe('Homepage Business Sponsors section', () => {
  test('renders the heading and the become-a-sponsor invitation', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('section#sponsors')
    await expect(section).toBeVisible()

    await expect(section.getByRole('heading', { name: /Our Business Sponsors/i })).toBeVisible()
    await expect(section).toContainText(/interested in sponsoring/i)

    const contact = section.getByRole('link', { name: /Contact us/i })
    await expect(contact).toHaveAttribute('href', '/#contact')
  })

  test('each listed sponsor links to their website in a new tab', async ({ page }) => {
    test.skip(sponsors.length === 0, 'No business sponsors are listed yet')

    await page.goto('/')
    const section = page.locator('section#sponsors')

    for (const sponsor of sponsors) {
      const link = section.getByRole('link', { name: new RegExp(`${sponsor.name} website`, 'i') })
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', sponsor.url)
      await expect(link).toHaveAttribute('target', '_blank')
    }
  })
})
