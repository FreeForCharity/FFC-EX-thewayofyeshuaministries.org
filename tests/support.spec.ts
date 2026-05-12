import { test, expect } from '@playwright/test'

test.describe('Homepage Support section', () => {
  test('renders heading, QR image, Give Online button, and mailing block', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('section#support')
    await expect(section).toBeVisible()

    await expect(section.getByRole('heading', { name: /Support This Ministry/i })).toBeVisible()

    const qr = section.locator('img[alt*="QR code"]')
    await expect(qr).toBeVisible()
    await expect(qr).toHaveAttribute('src', /donation-qr\.png$/)

    const give = section.getByRole('link', { name: /Give Online/i })
    await expect(give).toBeVisible()
    await expect(give).toHaveAttribute(
      'href',
      'https://www.zeffy.com/en-US/donation-form/donate-for-our-ministry'
    )
    await expect(give).toHaveAttribute('target', '_blank')

    await expect(section).toContainText(/PO Box 1153/i)
    await expect(section).toContainText(/Sun City, AZ 85372/i)
    await expect(section).toContainText(/501\(c\)\(3\)/i)
  })
})
