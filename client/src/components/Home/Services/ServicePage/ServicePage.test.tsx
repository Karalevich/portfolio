import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ServicePage from './ServicePage'
import { SERVICE_PAGES, SERVICES_NAVIGATION } from '../../../../constants/personalInfo'
import React from 'react'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('ServicePage component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = (startPath: string) => {
    return render(
      <MemoryRouter initialEntries={[`/services/${startPath}`]}>
        <Routes>
          <Route path={'/services/:servicePage'} element={<ServicePage />} />
        </Routes>
      </MemoryRouter>
    )
  }
  test('renders the service title and examples correctly', () => {
    renderComponent(SERVICES_NAVIGATION.FRONTEND)

    const { serviceTitle, examples } = SERVICE_PAGES[SERVICES_NAVIGATION.FRONTEND]

    const serviceTitleElement = screen.getByText(serviceTitle)
    expect(serviceTitleElement).toBeInTheDocument()

    const exampleText = screen.getAllByLabelText('example-item')
    expect(exampleText.length).toBe(examples.reduce((acc, ex) => (acc += ex.text.length), 0))
  })

  test('redirects to the contact page when the "Order now" button is clicked', () => {
    renderComponent(SERVICES_NAVIGATION.FRONTEND)

    const orderButton = screen.getByText('Order now')
    fireEvent.click(orderButton)

    // Verify that the navigation function was called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith('/contact')
  })

  test('renders a "NotFound" component if the service page does not exist', () => {
    renderComponent('notExistingPath')

    const notFoundElement = screen.getByText('Sorry, page not found!')
    expect(notFoundElement).toBeInTheDocument()
  })
})
