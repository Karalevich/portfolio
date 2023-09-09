import { render, screen } from '@testing-library/react'
import { Recommendations } from './Recommendations'

// Mock the useMediaQuery hook
jest.mock('@mui/material', () => ({
  useMediaQuery: jest.fn(),
}))

// Mock the SliderContent component to avoid rendering its actual content
jest.mock(
  './SliderContent/SliderContent',
  () =>
    ({ isTabletOrMobile }: { isTabletOrMobile: boolean }) =>
      <div data-testid='slider-content'>{isTabletOrMobile ? 'Mobile Content' : 'Desktop Content'}</div>
)

describe('Recommendations Component', () => {
  test('Recommendations component renders correctly for desktop', () => {
    // Mock useMediaQuery to simulate desktop view
    jest.spyOn(require('@mui/material'), 'useMediaQuery').mockImplementation(() => false)

    render(<Recommendations />)

    // Check if the component renders the title and introduction
    expect(screen.getByText('Recommendations')).toBeInTheDocument()
    expect(
      screen.getByText(/All recommendations are real and left in LinkedIn by my colleagues/)
    ).toBeInTheDocument()

    // Check if SliderContent renders desktop content
    expect(screen.getByText('Desktop Content')).toBeInTheDocument()
  })

  test('Recommendations component renders correctly for mobile', () => {
    // Mock useMediaQuery to simulate mobile view
    jest.spyOn(require('@mui/material'), 'useMediaQuery').mockImplementation(() => true)

    render(<Recommendations />)

    // Check if SliderContent renders mobile content
    expect(screen.getByText('Mobile Content')).toBeInTheDocument()
  })
})
