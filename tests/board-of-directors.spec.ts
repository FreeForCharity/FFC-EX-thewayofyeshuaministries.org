import { test, expect } from '@playwright/test'

test.describe('Board of Directors page', () => {
  test('renders the leadership page with ministry background', async ({ page }) => {
    await page.goto('/board-of-directors')
    await expect(
      page.getByRole('heading', { name: /Our Board of Directors/i, level: 1 })
    ).toBeVisible()
    await expect(page.locator('main')).toContainText('501(c)(3)')
    await expect(page.locator('main')).toContainText('Sun City, Arizona')
  })

  test('is reachable from the footer quick links', async ({ page }) => {
    await page.goto('/')
    const footerLink = page
      .locator('footer')
      .getByRole('link', { name: 'Board of Directors', exact: true })
    await expect(footerLink).toBeVisible()
    await footerLink.click()
    await expect(page).toHaveURL(/\/board-of-directors\/?$/)
  })
})

test.describe('Footer addresses', () => {
  test('shows the physical address and links it to maps', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toContainText('Physical Address')
    await expect(footer).toContainText('16400 S. Alsip Street')
    await expect(footer).toContainText('Tucson, AZ 85736')
    const maps = footer.locator('a[aria-label="Open physical address in Google Maps"]')
    await expect(maps).toHaveAttribute('href', /16400\+S\+Alsip\+Street/)
  })
})

test.describe('Program status section', () => {
  test('shows which programs are serving people and which are not', async ({ page }) => {
    await page.goto('/#programs')
    const section = page.locator('#programs')
    await expect(section).toBeVisible()
    await expect(section).toContainText('Prison Outreach Program')
    await expect(section).toContainText('Automobile Program')
    await expect(section).toContainText('Food Pantry')
    // The pantry has not opened -- it must not be labelled as serving people.
    const pantryCard = section.locator('li').filter({ hasText: 'Food Pantry' })
    await expect(pantryCard).toContainText('In development')
    await expect(pantryCard).not.toContainText('Serving people now')

    // No tiny home has been built, so the card must not read as operating.
    const tinyHomeCard = section.locator('li').filter({ hasText: 'Tiny Home Project' })
    await expect(tinyHomeCard).toContainText('In development')
    await expect(tinyHomeCard).not.toContainText('Serving people now')
  })

  test('the tiny home page states plainly that no homes are built yet', async ({ page }) => {
    await page.goto('/sponsor-a-tiny-home')
    await expect(page.locator('main')).toContainText('No tiny homes have been built yet')
    await expect(page.locator('main')).toContainText('secured the land')
  })
})
