import { render, fireEvent, screen } from '@testing-library/react'
import NotFound from './NotFound'

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('NotFound component', () => {
  test('renders correct components', () => {
    render(<NotFound />)
    const title = screen.getByText('Sorry, page not found!')
    const message = screen.getByText('Do not worry, just click the big button "Go Back Home"')
    const goBackButton = screen.getByRole('button', { name: 'Go Back Home' })

    expect(title).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    expect(goBackButton).toBeInTheDocument()
  })

  test('calls useNavigate with the correct path when the "Go Back Home" button is clicked', () => {
    const navigate = jest.fn()
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate)

    render(<NotFound />)
    const goBackButton = screen.getByRole('button', { name: 'Go Back Home' })

    fireEvent.click(goBackButton)
    expect(navigate).toHaveBeenCalledWith('/home')
  })
})
