import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import BoardOfDirectors from '../../src/app/board-of-directors/page'
import { boardMembers, getInitials } from '../../src/data/leadership'

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
    expect(screen.getByText(/501\(c\)\(3\)/)).toBeInTheDocument()
    expect(screen.getAllByText(/Sun City, Arizona/).length).toBeGreaterThan(0)
  })

  it('should list every board member by name', () => {
    render(<BoardOfDirectors />)
    for (const member of boardMembers) {
      expect(screen.getByRole('heading', { name: member.name, level: 3 })).toBeInTheDocument()
    }
  })

  it('should link back to the program status list', () => {
    render(<BoardOfDirectors />)
    expect(screen.getByRole('link', { name: /program status/i })).toHaveAttribute(
      'href',
      '/#programs'
    )
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
