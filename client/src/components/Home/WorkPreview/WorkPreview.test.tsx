import { render, screen, fireEvent } from '@testing-library/react'
import WorkPreview from './WorkPreview'

// Mock the react-timeline-animation module
jest.mock('react-timeline-animation', () => {
  return {
    __esModule: true,
    default: ({ children }: any) => <div data-testid='mocked-timeline-observer'>{children}</div>,
  }
})

describe('WorkPreview component', () => {
  test('renders the section header with the correct title and introduction', () => {
    render(<WorkPreview />)
    const titleElement = screen.getByText('Work History')
    const introductionElement = screen.getByText(/I have a broad range of projects that I/)

    expect(titleElement).toBeInTheDocument()
    expect(introductionElement).toBeInTheDocument()
  })

  test('renders a switch component', () => {
    render(<WorkPreview />)
    const switchElement = screen.getByRole('checkbox')

    expect(switchElement).toBeInTheDocument()
  })

  test('changes state when the switch is toggled', () => {
    render(<WorkPreview />)
    const switchElement = screen.getByRole('checkbox')

    // Initial state should be unchecked
    expect(switchElement).not.toBeChecked()

    // Click the switch to toggle it
    fireEvent.click(switchElement)

    // After clicking, it should be checked
    expect(switchElement).toBeChecked()
  })

  test('renders a timeline component', () => {
    render(<WorkPreview />)
    const timelineElement = screen.getByTestId('mocked-timeline-observer')

    expect(timelineElement).toBeInTheDocument()
  })
})
