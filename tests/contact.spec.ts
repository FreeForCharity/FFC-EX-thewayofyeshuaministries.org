import { test, expect } from '@playwright/test'

test.describe('Homepage Contact section', () => {
  test('renders heading, contact info, and form fields', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('section#contact')
    await expect(section).toBeVisible()

    await expect(section.getByRole('heading', { name: /^Contact Us$/i })).toBeVisible()

    await expect(section).toContainText('(520) 302-4034')
    await expect(section).toContainText('Info@thewayofyeshuaministries.org')
    await expect(section).toContainText(/9802 W\. Bell Road #1153/i)
    await expect(section).toContainText(/Sun City, AZ 85351/i)
    await expect(section).toContainText(/09:00 . 17:00 daily/i)

    await expect(section.locator('input#contact-name')).toBeVisible()
    await expect(section.locator('input#contact-email')).toBeVisible()
    await expect(section.locator('textarea#contact-message')).toBeVisible()
    await expect(section.getByRole('button', { name: /^Send$/ })).toBeVisible()
  })

  test('phone and email links use correct protocols', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('section#contact')

    const phone = section.locator('a[href="tel:5203024034"]')
    await expect(phone).toBeVisible()

    const email = section.locator('a[href^="mailto:Info@thewayofyeshuaministries.org"]')
    await expect(email).toBeVisible()
  })
})
