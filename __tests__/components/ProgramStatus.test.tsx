import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import ProgramStatus from '../../src/components/home-page/ProgramStatus'
import { programs, statusLabels } from '../../src/data/programs'

expect.extend(toHaveNoViolations)

describe('ProgramStatus section', () => {
  it('should render the section heading', () => {
    render(<ProgramStatus />)
    expect(
      screen.getByRole('heading', { name: /Where Our Programs Stand Today/i })
    ).toBeInTheDocument()
  })

  it('should list every program with its status badge and summary', () => {
    render(<ProgramStatus />)
    for (const program of programs) {
      expect(screen.getByText(program.name)).toBeInTheDocument()
      expect(screen.getByText(program.summary)).toBeInTheDocument()
    }
  })

  it('should mark the prison and automobile programs as serving people now', () => {
    render(<ProgramStatus />)
    const serving = programs.filter((p) => p.status === 'serving').map((p) => p.name)
    expect(serving).toEqual(['Prison Outreach Program', 'Automobile Program'])
    expect(screen.getAllByText(statusLabels.serving.label)).toHaveLength(serving.length)
  })

  it('should not claim the food pantry is open', () => {
    const pantry = programs.find((p) => p.name === 'Food Pantry')
    expect(pantry?.status).toBe('in-development')
  })

  it('should link to the board of directors page', () => {
    render(<ProgramStatus />)
    expect(screen.getByRole('link', { name: /board of directors/i })).toHaveAttribute(
      'href',
      '/board-of-directors'
    )
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(<ProgramStatus />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
