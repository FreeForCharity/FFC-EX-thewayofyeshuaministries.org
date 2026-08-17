import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import BusinessSponsors from '../../src/components/home-page/BusinessSponsors'
import type { Sponsor } from '../../src/data/sponsors'

expect.extend(toHaveNoViolations)

const sampleSponsors: Sponsor[] = [
  {
    name: 'Acme Hardware',
    url: 'https://www.acmehardware.example',
    description: 'Family-owned hardware store',
    logo: '/Images/yeshua/sponsors/acme-hardware.png',
  },
  {
    name: 'Desert Bakery',
    url: 'https://www.desertbakery.example',
  },
]

describe('BusinessSponsors component', () => {
  it('should render the section heading', () => {
    render(<BusinessSponsors sponsors={sampleSponsors} />)
    expect(screen.getByRole('heading', { name: /Our Business Sponsors/i })).toBeInTheDocument()
  })

  it('should link each sponsor to their website in a new tab', () => {
    render(<BusinessSponsors sponsors={sampleSponsors} />)

    const acme = screen.getByRole('link', { name: /Acme Hardware website/i })
    expect(acme).toHaveAttribute('href', 'https://www.acmehardware.example')
    expect(acme).toHaveAttribute('target', '_blank')
    expect(acme).toHaveAttribute('rel', expect.stringContaining('noopener'))

    const bakery = screen.getByRole('link', { name: /Desert Bakery website/i })
    expect(bakery).toHaveAttribute('href', 'https://www.desertbakery.example')
  })

  it('should render an optional description and logo when provided', () => {
    render(<BusinessSponsors sponsors={sampleSponsors} />)
    expect(screen.getByText('Family-owned hardware store')).toBeInTheDocument()
    expect(screen.getByAltText('Acme Hardware logo')).toHaveAttribute(
      'src',
      '/Images/yeshua/sponsors/acme-hardware.png'
    )
  })

  it('should render a sponsor without a logo or description', () => {
    render(<BusinessSponsors sponsors={sampleSponsors} />)
    expect(screen.getByText('Desert Bakery')).toBeInTheDocument()
    expect(screen.queryByAltText('Desert Bakery logo')).not.toBeInTheDocument()
  })

  it('should show the become-a-sponsor invitation when there are no sponsors', () => {
    render(<BusinessSponsors sponsors={[]} />)
    expect(screen.getByRole('heading', { name: /Our Business Sponsors/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Contact us/i })).toHaveAttribute('href', '/#contact')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(<BusinessSponsors sponsors={sampleSponsors} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
