import { render, screen } from '@testing-library/react'
import SectionHeader from './SectionHeader'

// Mock props for testing
const mockProps = {
  title: 'Test Title',
  introduction: 'Test Introduction',
}

describe('SectionHeader component', () => {
  test('renders the title and introduction correctly', () => {
    render(<SectionHeader {...mockProps} />)

    // Assert that the title and introduction elements are rendered
    expect(screen.getByText(mockProps.title)).toBeInTheDocument()
    expect(screen.getByText(mockProps.introduction)).toBeInTheDocument()
  })

  test('matches snapshot', () => {
    const { asFragment } = render(<SectionHeader {...mockProps} />)

    // Assert that the rendered component matches the snapshot
    expect(asFragment()).toMatchSnapshot()
  })
})
