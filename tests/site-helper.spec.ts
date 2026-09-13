import { test, expect, type Page } from '@playwright/test'

/**
 * Site helper E2E tests.
 *
 * The helper lets a visitor ask a question in their own words and hands back
 * links to the pages that answer it. These tests drive it the way a visitor
 * would: open it, type, click a result, and check where they landed.
 *
 * The cookie banner is fixed to the bottom of the viewport and would sit over
 * the helper's launcher, so a saved consent choice is seeded before each visit
 * -- the same state a returning visitor is in. Analytics stay declined.
 */
test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    window.localStorage.setItem(
      'cookie-consent',
      JSON.stringify({ necessary: true, functional: true, analytics: false, marketing: false })
    )
  })
})

const launcher = (page: Page) => page.getByRole('button', { name: 'Ask a question' })
const panel = (page: Page) => page.getByRole('dialog', { name: 'Ask a question' })

async function openHelper(page: Page) {
  await launcher(page).click()
  await expect(panel(page)).toBeVisible()
}

async function ask(page: Page, question: string) {
  await panel(page).getByLabel('Your question').fill(question)
}

test.describe('Site helper', () => {
  test('is available on the home page and starts closed', async ({ page }) => {
    await page.goto('/')
    await expect(launcher(page)).toBeVisible()
    await expect(panel(page)).toBeHidden()
  })

  test('suggests questions before anything is typed', async ({ page }) => {
    await page.goto('/')
    await openHelper(page)
    await expect(panel(page).getByRole('button', { name: 'How do I donate?' })).toBeVisible()
  })

  test('answers a question and takes the visitor to the page', async ({ page }) => {
    await page.goto('/')
    await openHelper(page)
    await ask(page, 'how do I donate a car')

    const result = panel(page).getByRole('link', { name: /Automobile Program/ })
    await expect(result).toBeVisible()
    await result.click()

    await expect(page).toHaveURL(/\/automobile-program\/?$/)
    await expect(
      page.getByRole('heading', { name: /Help someone that needs a car/i })
    ).toBeVisible()
    // Following a link puts the visitor on the page, not back in the panel.
    await expect(panel(page)).toBeHidden()
  })

  test('sends a question about contacting the ministry to the contact section', async ({
    page,
  }) => {
    await page.goto('/blog/')
    await openHelper(page)
    await ask(page, 'what is your phone number')

    await panel(page)
      .getByRole('link', { name: /Contact Us/ })
      .click()
    await expect(page).toHaveURL(/\/#contact$/)
    await expect(page.locator('section#contact')).toContainText('(520) 302-4034')
  })

  test('works from a page other than the home page', async ({ page }) => {
    await page.goto('/board-of-directors/')
    await openHelper(page)
    await ask(page, 'prison')

    await expect(panel(page).getByRole('link', { name: /Prison Outreach Program/ })).toBeVisible()
  })

  test('offers a phone number and email when no page matches', async ({ page }) => {
    await page.goto('/')
    await openHelper(page)
    await ask(page, 'xyzzy quantum submarine')

    await expect(panel(page).getByRole('link', { name: '(520) 302-4034' })).toHaveAttribute(
      'href',
      'tel:5203024034'
    )
    await expect(
      panel(page).getByRole('link', { name: /Info@thewayofyeshuaministries\.org/ })
    ).toBeVisible()
  })

  test('closes with the Escape key', async ({ page }) => {
    await page.goto('/')
    await openHelper(page)
    await page.keyboard.press('Escape')
    await expect(panel(page)).toBeHidden()
  })

  test('closes when the visitor clicks the page behind it', async ({ page }) => {
    await page.goto('/')
    await openHelper(page)
    await page
      .locator('section#mission, #mission')
      .first()
      .click({ position: { x: 5, y: 5 } })
    await expect(panel(page)).toBeHidden()
  })

  test('is reachable by keyboard alone', async ({ page }) => {
    await page.goto('/')
    await launcher(page).focus()
    await page.keyboard.press('Enter')
    // Opening the panel moves the cursor straight to the question box.
    await expect(panel(page).getByLabel('Your question')).toBeFocused()
  })
})
