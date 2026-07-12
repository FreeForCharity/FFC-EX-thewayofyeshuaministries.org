import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Footer from '../../src/components/footer'

expect.extend(toHaveNoViolations)

describe('Footer component', () => {
  it('should render the footer', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('should display the ministry name in the about column', () => {
    render(<Footer />)
    expect(screen.getByText('The Way of Yeshua Ministries')).toBeInTheDocument()
  })

  it('should display Quick Links section', () => {
    render(<Footer />)
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
  })

  it('should display Contact Us section with contact information', () => {
    render(<Footer />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('should have social media links', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('should display the current year in copyright', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it('should show the Supported by Free For Charity attribution', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toHaveTextContent(/Supported by/i)
    const ffcLink = screen.getByRole('link', { name: 'Free For Charity' })
    expect(ffcLink).toHaveAttribute('href', 'https://freeforcharity.org')
  })

  it('should have the Supported Charity Login hub link', () => {
    render(<Footer />)
    const hubLink = screen.getByRole('link', { name: 'Supported Charity Login' })
    expect(hubLink).toHaveAttribute('href', 'https://freeforcharity.org/hub/')
  })

  it('should state the registered 501(c)(3) status', () => {
    render(<Footer />)
    expect(
      screen.getByText('The Way of Yeshua Ministries Inc. is a registered 501(c)(3) nonprofit.')
    ).toBeInTheDocument()
  })

  it('should have email contact link', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    const emailLink = links.find((link) => link.getAttribute('href')?.includes('mailto:'))
    expect(emailLink).toBeDefined()
  })

  it('should have phone contact link', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    const phoneLink = links.find((link) => link.getAttribute('href')?.includes('tel:5203024034'))
    expect(phoneLink).toBeDefined()
  })

  it('should not have accessibility violations', async () => {
    const { container } = render(<Footer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
