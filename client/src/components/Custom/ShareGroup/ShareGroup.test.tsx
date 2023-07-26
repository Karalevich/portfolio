import React from 'react'
import { render, screen } from '@testing-library/react'
import ShareGroup from './ShareGroup'
import { SHARE } from '../../../constants/personalInfo'

const mockId = 'mock-id'

describe('ShareGroup Component', () => {
  test('renders a list of share icons', () => {
    render(<ShareGroup id={mockId} />)

    const shareList = screen.getByRole('list')
    expect(shareList).toBeInTheDocument()

    for (const [key, value] of Object.entries(SHARE)) {
      const button = screen.getByLabelText(key.toLowerCase())
      expect(button).toBeInTheDocument()
    }
  })

  test('renders the correct number of share icons', () => {
    render(<ShareGroup id={mockId} />)

    const numIcons = Object.entries(SHARE).length
    const shareIcons = screen.getAllByRole('button')
    expect(shareIcons).toHaveLength(numIcons)
  })
})
