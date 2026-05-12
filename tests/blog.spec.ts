import { test, expect } from '@playwright/test'

test.describe('Blog list and detail pages', () => {
  test('homepage From the Blog teaser shows 3 cards and a "View All Posts" link', async ({
    page,
  }) => {
    await page.goto('/')
    const section = page.locator('section#blog')
    await expect(section).toBeVisible()
    await expect(section.getByRole('heading', { name: /^From the Blog$/i })).toBeVisible()

    const articles = section.locator('article')
    await expect(articles).toHaveCount(3)

    await expect(section.getByRole('link', { name: /^View All Posts$/i })).toBeVisible()
  })

  test('/blog index lists all 3 posts newest-first', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByRole('heading', { name: /^Blog$/, level: 1 })).toBeVisible()

    const items = page.locator('main ul > li')
    await expect(items).toHaveCount(3)

    // Newest-first: Blessings (Jan 2026) should appear before Sermon (Dec 2025)
    const titles = await items.locator('h2 a').allTextContents()
    expect(titles[0]).toMatch(/Blessings/i)
    expect(titles[1]).toMatch(/Sermon Of The Day/i)
    expect(titles[2]).toMatch(/Statement Of Faith/i)
  })

  test('Blessings post renders correctly at /blog/blessings', async ({ page }) => {
    await page.goto('/blog/blessings')
    await expect(page.getByRole('heading', { name: /^Blessings$/i, level: 1 })).toBeVisible()
    await expect(page.locator('main')).toContainText(/Baruch HaShem!/)
    await expect(page.getByRole('link', { name: /Back to Blog/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Support This Ministry/i })).toBeVisible()
  })

  test('Sermon Of The Day post renders correctly', async ({ page }) => {
    await page.goto('/blog/sermon-of-the-day')
    await expect(page.getByRole('heading', { name: /Sermon Of The Day/i, level: 1 })).toBeVisible()
    await expect(page.locator('main')).toContainText(/good works/i)
    await expect(page.locator('main')).toContainText(/Good Samaritan/i)
  })

  test('Statement of Faith post renders the 11 numbered beliefs', async ({ page }) => {
    await page.goto('/blog/the-way-of-yeshua-ministries-statement-of-faith')
    await expect(
      page.getByRole('heading', {
        name: /Statement Of Faith/i,
        level: 1,
      })
    ).toBeVisible()
    const body = page.locator('main article')
    await expect(body).toContainText(/Yeshua is the Way, Truth, and the Life/)
    await expect(body).toContainText(/John 14:6/)
    await expect(body).toContainText(/II Timothy 3:16-17/)
  })

  test('header navigation has a Blog link', async ({ page }) => {
    await page.goto('/')
    const blogLink = page.locator('header a[href="/blog"]').first()
    await expect(blogLink).toBeVisible()
  })
})
