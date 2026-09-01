import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import BoardOfDirectors from '../../src/app/board-of-directors/page'
import { boardMembers, getInitials } from '../../src/data/leadership'
import { organization } from '../../src/data/organization'

expect.extend(toHaveNoViolations)

describe('Board of Directors page', () => {
  it('should render the page heading', () => {
    render(<BoardOfDirectors />)
    expect(
      screen.getByRole('heading', { name: /Our Board of Directors/i, level: 1 })
    ).toBeInTheDocument()
  })

  it('should identify the ministry as a 501(c)(3) in Sun City, Arizona', () => {
    render(<BoardOfDirectors />)
    expect(screen.getAllByText(/501\(c\)\(3\)/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Sun City, Arizona/).length).toBeGreaterThan(0)
  })

  it('should list every board member by name', () => {
    render(<BoardOfDirectors />)
    for (const member of boardMembers) {
      expect(screen.getByRole('heading', { name: member.name, level: 3 })).toBeInTheDocument()
    }
  })

  it('should show each officer with their role', () => {
    render(<BoardOfDirectors />)
    const officers: [string, string][] = [
      ['Dr. Patrick Bearup', 'Founder & Director'],
      ['Alexandra Bearup', 'President'],
      ['John Cruz', 'Vice President'],
      ['Rebekah Freeman', 'Treasurer & Secretary'],
    ]
    for (const [name, role] of officers) {
      expect(screen.getByRole('heading', { name, level: 3 })).toBeInTheDocument()
      expect(screen.getByText(role)).toBeInTheDocument()
    }
  })

  it('should list the founder first, then the officers', () => {
    expect(boardMembers.map((m) => m.name)).toEqual([
      'Dr. Patrick Bearup',
      'Alexandra Bearup',
      'John Cruz',
      'Rebekah Freeman',
    ])
  })

  it('should give every board member a role and a bio', () => {
    // The page is public-facing: a member listed without either reads as a
    // placeholder to a donor. Filling both is what makes the listing credible.
    for (const member of boardMembers) {
      expect(member.role).toBeTruthy()
      expect(member.bio.length).toBeGreaterThan(0)
    }
  })

  it('should render each officer bio on the page', () => {
    render(<BoardOfDirectors />)
    expect(screen.getByText(/works in the medical field/i)).toBeInTheDocument()
    expect(screen.getByText(/founder and CEO of Don John/i)).toBeInTheDocument()
    expect(screen.getByText(/Don John is also a business sponsor/i)).toBeInTheDocument()
    expect(screen.getByText(/nonprofit sector for over a decade/i)).toBeInTheDocument()
  })

  it('should open external member links in a new tab but keep internal ones in place', () => {
    render(<BoardOfDirectors />)
    const external = screen.getByRole('link', { name: 'Bearup International Ministries' })
    expect(external).toHaveAttribute('target', '_blank')
    expect(external).toHaveAttribute('rel', 'noopener noreferrer')

    const internal = screen.getByRole('link', { name: /under our business sponsors/i })
    expect(internal).toHaveAttribute('href', '/#sponsors')
    expect(internal).not.toHaveAttribute('target')
  })

  it('should link back to the program status list', () => {
    render(<BoardOfDirectors />)
    expect(screen.getByRole('link', { name: /program status/i })).toHaveAttribute(
      'href',
      '/#programs'
    )
  })

  it('should render the founder with role, bio, and affiliated ministry link', () => {
    render(<BoardOfDirectors />)
    expect(
      screen.getByRole('heading', { name: 'Dr. Patrick Bearup', level: 3 })
    ).toBeInTheDocument()
    expect(screen.getByText('Founder & Director')).toBeInTheDocument()
    expect(screen.getByText(/doctorate in theology and religious education/i)).toBeInTheDocument()
    const link = screen.getByRole('link', { name: 'Bearup International Ministries' })
    expect(link).toHaveAttribute('href', 'https://bearupinternationalministries.org')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should show verifiable registration details', () => {
    render(<BoardOfDirectors />)
    expect(
      screen.getByRole('heading', { name: /Registration & Accountability/i })
    ).toBeInTheDocument()
    expect(screen.getByText(organization.legalName)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(organization.accBusinessId))).toBeInTheDocument()
  })

  it('should state good standing as of a date rather than open-endedly', () => {
    render(<BoardOfDirectors />)
    expect(
      screen.getByText(new RegExp(`as of\\s+${organization.goodStandingAsOf}`))
    ).toBeInTheDocument()
  })

  it('should link out to the state and federal registries so claims can be checked', () => {
    render(<BoardOfDirectors />)
    expect(
      screen.getByRole('link', { name: /Arizona Corporation Commission entity search/i })
    ).toHaveAttribute('href', organization.accVerifyUrl)
    expect(
      screen.getByRole('link', { name: /IRS Tax Exempt Organization Search/i })
    ).toHaveAttribute('href', organization.irsVerifyUrl)
  })

  it('should open with the h1, with no heading above it in the outline', () => {
    const { container } = render(<BoardOfDirectors />)
    const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    expect(headings.length).toBeGreaterThan(1)
    expect(headings[0]!.tagName).toBe('H1')
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(<BoardOfDirectors />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('getInitials', () => {
  it('should take the first letter of the first two names', () => {
    expect(getInitials('Patrick Bearup')).toBe('PB')
    expect(getInitials('Mary Anne Smith')).toBe('MA')
  })

  it('should handle a single name', () => {
    expect(getInitials('Patrick')).toBe('P')
  })
})
