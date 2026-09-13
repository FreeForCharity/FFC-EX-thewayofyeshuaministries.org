import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import SiteHelper from '../../src/components/site-helper'

expect.extend(toHaveNoViolations)

/** Open the helper and hand back its panel. */
function openHelper() {
  fireEvent.click(screen.getByRole('button', { name: /ask a question/i }))
  return screen.getByRole('dialog', { name: /ask a question/i })
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

  it('opens the panel and suggests questions before anything is typed', () => {
    render(<SiteHelper />)
    const panel = openHelper()
    expect(within(panel).getByLabelText(/your question/i)).toBeInTheDocument()
    expect(within(panel).getByRole('button', { name: 'How do I donate?' })).toBeInTheDocument()
  })

  it('answers a question with a link to the page that covers it', () => {
    render(<SiteHelper />)
    const panel = openHelper()
    ask('how do I donate a car')

    const link = within(panel).getByRole('link', { name: /Automobile Program/i })
    expect(link).toHaveAttribute('href', '/automobile-program')
  })

  it('answers a question about reaching the ministry with the contact section', () => {
    render(<SiteHelper />)
    const panel = openHelper()
    ask('what is your phone number')

    expect(within(panel).getByRole('link', { name: /Contact Us/i })).toHaveAttribute(
      'href',
      '/#contact'
    )
  })

  it('fills the box when a suggested question is clicked', () => {
    render(<SiteHelper />)
    const panel = openHelper()
    fireEvent.click(within(panel).getByRole('button', { name: 'Who runs this ministry?' }))

    expect(screen.getByLabelText(/your question/i)).toHaveValue('Who runs this ministry?')
    expect(within(panel).getByRole('link', { name: /Board of Directors/i })).toBeInTheDocument()
  })

  it('opens off-site links in a new tab, safely', () => {
    render(<SiteHelper />)
    const panel = openHelper()
    ask('merchandise shop')

    const link = within(panel).getByRole('link', { name: /Store/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('offers a phone number and an email address when nothing matches', () => {
    render(<SiteHelper />)
    const panel = openHelper()
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

  it('announces how many links were found', () => {
    render(<SiteHelper />)
    openHelper()
    ask('prison')
    expect(screen.getByRole('status')).toHaveTextContent(/page[s]? found\./i)
  })

  it('closes on Escape', () => {
    render(<SiteHelper />)
    openHelper()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when the close button is used and returns focus to the launcher', () => {
    render(<SiteHelper />)
    const panel = openHelper()
    fireEvent.click(within(panel).getByRole('button', { name: /close the question box/i }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ask a question/i })).toHaveFocus()
  })

  it('closes after a visitor follows one of the links', () => {
    render(<SiteHelper />)
    const panel = openHelper()
    ask('prison')
    const link = within(panel).getByRole('link', { name: /Prison Outreach Program/i })
    // jsdom cannot navigate; stop the anchor's default so the click only
    // exercises the helper's own handler.
    link.addEventListener('click', (e) => e.preventDefault())
    fireEvent.click(link)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('has no accessibility violations when closed', async () => {
    const { container } = render(<SiteHelper />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations when open and showing results', async () => {
    const { container } = render(<SiteHelper />)
    openHelper()
    ask('donate')
    expect(await axe(container)).toHaveNoViolations()
  })
})
