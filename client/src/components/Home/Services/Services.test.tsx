import { render, screen } from '@testing-library/react'
import Services from './Services'
import { SERVICES } from 'src/constants/personalInfo'

// Mock the Service component to avoid rendering it
jest.mock('./Service/Service', () => () => <div data-testid='mocked-service' />)

describe('Services component', () => {
  test('renders the section header with the correct title and introduction', () => {
    render(<Services />)
    const titleElement = screen.getByText('My Services')
    const introductionElement = screen.getByText(
      /Based on commercial experience with a wide range of diverse/
    )

    expect(titleElement).toBeInTheDocument()
    expect(introductionElement).toBeInTheDocument()
  })

  test('renders the correct number of Service components', () => {
    render(<Services />)
    const serviceElements = screen.getAllByTestId('mocked-service')

    // Ensure that the number of rendered Service components matches the number of entries in the SERVICES object
    expect(serviceElements).toHaveLength(Object.keys(SERVICES).length)
  })
})
