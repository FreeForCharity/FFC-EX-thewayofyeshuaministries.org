import React from 'react'
import { render, screen, fireEvent, within, waitFor, act } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import SiteHelper from '../../src/components/site-helper'
import { buildTeachingPayload } from '../../src/lib/teachings'
import { getPublishedPosts } from '../../src/data/blog-posts'

expect.extend(toHaveNoViolations)

/*
 * The helper fetches its corpus from /teachings.json, which the build emits.
 * Serve the real payload here so the tests exercise the real teachings rather
 * than a fixture that could drift away from them.
 */
const payload = buildTeachingPayload(getPublishedPosts())

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(payload) })
  ) as unknown as typeof fetch
})

afterEach(() => {
  jest.restoreAllMocks()
})

/**
 * Open the helper and hand back its panel, with the teachings loaded.
 *
 * Opening the panel kicks off the fetch of the corpus, so every test waits for
 * it here rather than racing it.
 */
async function openHelper() {
  fireEvent.click(screen.getByRole('button', { name: /ask a question/i }))
  const panel = screen.getByRole('dialog', { name: /ask a question/i })
  await act(async () => {})
  return panel
}

/** Type a question into the open helper. */
function ask(question: string) {
  fireEvent.change(screen.getByLabelText(/your question/i), { target: { value: question } })
}

describe('SiteHelper', () => {
  it('shows a launcher and keeps the panel closed until it is clicked', () => {
    render(<SiteHelper />)
    const launcher = screen.getByRole('button', { name: /ask a question/i })
    expect(launcher).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens the panel and suggests questions before anything is typed', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    expect(within(panel).getByLabelText(/your question/i)).toBeInTheDocument()
    expect(within(panel).getByRole('button', { name: 'How do I donate?' })).toBeInTheDocument()
  })

  it('answers a question with a link to the page that covers it', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    ask('how do I donate a car')

    const link = within(panel).getByRole('link', { name: /Automobile Program/i })
    expect(link).toHaveAttribute('href', '/automobile-program')
  })

  it('answers a question about reaching the ministry with the contact section', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    ask('what is your phone number')

    expect(within(panel).getByRole('link', { name: /Contact Us/i })).toHaveAttribute(
      'href',
      '/#contact'
    )
  })

  it('fills the box when a suggested question is clicked', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    fireEvent.click(within(panel).getByRole('button', { name: 'Who runs this ministry?' }))

    expect(screen.getByLabelText(/your question/i)).toHaveValue('Who runs this ministry?')
    expect(within(panel).getByRole('link', { name: /Board of Directors/i })).toBeInTheDocument()
  })

  it('opens off-site links in a new tab, safely', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    ask('merchandise shop')

    const link = within(panel).getByRole('link', { name: /Store/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('offers a phone number and an email address when nothing matches', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    ask('xyzzy quantum submarine')

    expect(within(panel).queryAllByRole('link', { name: /program/i })).toHaveLength(0)
    expect(within(panel).getByRole('link', { name: '(520) 302-4034' })).toHaveAttribute(
      'href',
      'tel:5203024034'
    )
    expect(
      within(panel).getByRole('link', { name: /Info@thewayofyeshuaministries\.org/i })
    ).toHaveAttribute('href', 'mailto:Info@thewayofyeshuaministries.org')
  })

  it('offers a person, not a link, for a question about faith', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    ask('pray for my marriage')

    // The donation page used to win this on the word "pray" alone.
    expect(within(panel).queryByRole('link', { name: /Support This Ministry/i })).toBeNull()
    expect(within(panel).getByText(/answer this one in person/i)).toBeInTheDocument()
    expect(within(panel).getByRole('link', { name: '(520) 302-4034' })).toBeInTheDocument()
    expect(within(panel).getByRole('link', { name: /weekly teachings/i })).toHaveAttribute(
      'href',
      '/blog'
    )
  })

  it('shows the invitation alongside pages when a faith question also matches one', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    ask('who is Yeshua')

    expect(within(panel).getByRole('link', { name: /Our Mission/i })).toBeInTheDocument()
    expect(within(panel).getByText(/answer this one in person/i)).toBeInTheDocument()
  })

  it('keeps the plain wording for an ordinary question that matches nothing', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    ask('xyzzy quantum submarine')

    expect(within(panel).queryByText(/answer this one in person/i)).toBeNull()
    expect(within(panel).getByText(/Nothing on the site matches that yet/i)).toBeInTheDocument()
  })

  it('announces how many links were found', async () => {
    render(<SiteHelper />)
    await openHelper()
    ask('prison')
    expect(screen.getByRole('status')).toHaveTextContent(/page[s]? found\./i)
  })

  it('closes on Escape', async () => {
    render(<SiteHelper />)
    await openHelper()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when the close button is used and returns focus to the launcher', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    fireEvent.click(within(panel).getByRole('button', { name: /close the question box/i }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ask a question/i })).toHaveFocus()
  })

  it('closes after a visitor follows one of the links', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    ask('prison')
    const link = within(panel).getByRole('link', { name: /Prison Outreach Program/i })
    // jsdom cannot navigate; stop the anchor's default so the click only
    // exercises the helper's own handler.
    link.addEventListener('click', (e) => e.preventDefault())
    fireEvent.click(link)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('quotes the ministry’s own teaching, attributed to the post it came from', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    // The posts load only once the panel is open, so this waits for them.
    await waitFor(() => expect(within(panel).queryByText(/From our teachings/i)).toBeNull())
    ask('what is the meaning of tzitzit')

    await waitFor(() => {
      expect(within(panel).getByText(/From our teachings/i)).toBeInTheDocument()
    })
    const quote = within(panel).getAllByRole('figure')[0]
    expect(within(quote).getByRole('blockquote')).toHaveTextContent(/tzitzit/i)
    // Attribution: which teaching, and a way to read all of it.
    expect(within(quote).getByRole('link').getAttribute('href')).toMatch(/^\/blog\//)
  })

  it('does not quote a teaching for an ordinary navigation question', async () => {
    render(<SiteHelper />)
    const panel = await openHelper()
    ask('how do I donate a car')

    await waitFor(() => {
      expect(within(panel).getByRole('link', { name: /Automobile Program/i })).toBeInTheDocument()
    })
    expect(within(panel).queryByText(/From our teachings/i)).toBeNull()
  })

  it('still searches the pages when the teachings cannot be fetched', async () => {
    // Offline on a first visit. The helper must degrade, not break.
    global.fetch = jest.fn(() => Promise.reject(new Error('offline'))) as unknown as typeof fetch
    render(<SiteHelper />)
    const panel = await openHelper()
    ask('how do I donate a car')

    expect(within(panel).getByRole('link', { name: /Automobile Program/i })).toBeInTheDocument()
    expect(within(panel).queryByText(/From our teachings/i)).toBeNull()
  })

  it('searches the pages before the posts have finished loading', async () => {
    render(<SiteHelper />)
    // Deliberately not openHelper(): this asserts what a visitor sees in the
    // moment before the dynamic import resolves. The page index is there
    // synchronously, which is everything someone typing "donate" needs.
    fireEvent.click(screen.getByRole('button', { name: /ask a question/i }))
    const panel = screen.getByRole('dialog', { name: /ask a question/i })
    ask('how do I donate a car')

    expect(within(panel).getByRole('link', { name: /Automobile Program/i })).toBeInTheDocument()
    await act(async () => {})
  })

  it('has no accessibility violations when closed', async () => {
    const { container } = render(<SiteHelper />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations when open and showing results', async () => {
    const { container } = render(<SiteHelper />)
    await openHelper()
    ask('donate')
    expect(await axe(container)).toHaveNoViolations()
  })
})
