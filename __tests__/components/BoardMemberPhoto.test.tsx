import React from 'react'
import { render, screen } from '@testing-library/react'

// A board member with a headshot but no role yet must not produce a trailing
// comma in the alt text, which a screen reader would read out.
jest.mock('@/data/leadership', () => ({
  boardMembers: [
    { name: 'Photo No Role', role: '', bio: [], photo: '/Images/yeshua/board/a.jpg' },
    { name: 'Photo With Role', role: 'Treasurer', bio: [], photo: '/Images/yeshua/board/b.jpg' },
  ],
  getInitials: (name: string) => name[0],
}))

const BoardOfDirectors = require('../../src/app/board-of-directors/page').default

describe('Board member headshot alt text', () => {
  it('should use the name alone when the member has no role', () => {
    render(<BoardOfDirectors />)
    expect(screen.getByAltText('Photo No Role')).toBeInTheDocument()
  })

  it('should include the role when the member has one', () => {
    render(<BoardOfDirectors />)
    expect(screen.getByAltText('Photo With Role, Treasurer')).toBeInTheDocument()
  })
})
