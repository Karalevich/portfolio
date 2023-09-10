import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Service from './Service'
import { ServiceProps } from './types'
import { SERVICES_NAVIGATION } from '../../../../constants/personalInfo'

const mockService = {
  title: 'Test Service',
  preview: 'Test Preview',
  description: 'Test Description',
  navigatePath: SERVICES_NAVIGATION.FRONTEND,
  icon: jest.fn(),
}

// Mock the useParams hook
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('Service component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = (mockedProps: ServiceProps) => {
    return render(
      <MemoryRouter initialEntries={[`/services/${SERVICES_NAVIGATION.FRONTEND}`]}>
        <Routes>
          <Route path={'/services/:servicePage'} element={<Service {...mockedProps} />} />
        </Routes>
      </MemoryRouter>
    )
  }

  test('renders the service information correctly', () => {
    renderComponent(mockService)

    // Check that the service title, preview, and description are rendered
    const titleElement = screen.getByText('Test Service')
    const previewElement = screen.getByText('Test Preview')
    const descriptionElement = screen.getByText('Test Description')

    expect(titleElement).toBeInTheDocument()
    expect(previewElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()

    // Check that the icon function is called with the correct props
    expect(mockService.icon).toHaveBeenCalledWith({
      fontSize: 'large',
      className: expect.stringContaining('icon'),
    })
  })

  test('redirects to the correct path when "Explore" button is clicked', () => {
    renderComponent(mockService)

    const exploreButton = screen.getByText('Explore')
    fireEvent.click(exploreButton)

    // Verify that the navigate function was called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith(`/services/${SERVICES_NAVIGATION.FRONTEND}`)
  })
})
