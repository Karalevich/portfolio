import { fireEvent, render, screen } from '@testing-library/react'
import ErrorModal from './ErrorModal'
import { useAppDispatch } from '../../../../hooks/hooks'
import { closeModalThunk } from '../../../../actions/modalAction'

// Mock the useAppDispatch hook
jest.mock('../../../../hooks/hooks')

// Mock the closeModalThunk action
jest.mock('../../../../actions/modalAction', () => ({
  closeModalThunk: jest.fn(),
}))

describe('ErrorModal Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the component with default values', () => {
    render(<ErrorModal />)

    // Verify the default title
    expect(screen.getByText(/Error!/i)).toBeInTheDocument()

    // Verify the default description
    expect(
      screen.getByText(/Sorry for this inconvenience, but some unknown error has occurred./i)
    ).toBeInTheDocument()

    // Verify the default confirm button text
    expect(screen.getByText(/Confirm/i)).toBeInTheDocument()
  })

  test('renders the component with custom props', () => {
    const customProps = {
      title: 'Custom Error Title',
      description: 'Custom Error Description',
      confirmText: 'Acknowledged',
    }

    render(<ErrorModal {...customProps} />)

    // Verify the custom title
    expect(screen.getByText(/Custom Error Title/i)).toBeInTheDocument()

    // Verify the custom description
    expect(screen.getByText(/Custom Error Description/i)).toBeInTheDocument()

    // Verify the custom confirm button text
    expect(screen.getByText(/Acknowledged/i)).toBeInTheDocument()
  })

  test('calls callbacks when Confirm button is clicked', () => {
    const confirmActionFromParent = jest.fn()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)

    render(<ErrorModal confirmActionFromParent={confirmActionFromParent} />)

    const confirmButton = screen.getByRole('button', { name: /Confirm/i })
    fireEvent.click(confirmButton)

    expect(confirmActionFromParent).toHaveBeenCalled()

    expect(useAppDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledTimes(1)

    // Verify if the closeModalThunk action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith(closeModalThunk())
  })
})
