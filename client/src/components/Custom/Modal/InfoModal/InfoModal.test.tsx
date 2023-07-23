import { fireEvent, render, screen } from '@testing-library/react'
import InfoModal from './InfoModal'
import { useAppDispatch } from '../../../../hooks/hooks'
import { modalActions } from '../../../../actions/modalAction'

// Mock the custom hooks and actions
jest.mock('../../../../hooks/hooks')

jest.mock('../../../../actions/modalAction', () => ({
  modalActions: {
    closesModalAC: jest.fn(),
  },
}))

describe('InfoModal Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('renders the component with default values', () => {
    render(<InfoModal />)

    // Verify the default title
    expect(screen.getByText(/Important Information!/i)).toBeInTheDocument()

    // Verify the default description
    expect(
      screen.getByText(/Frequently Asked Questions: Find answers to common inquiries/i)
    ).toBeInTheDocument()

    // Verify the default cancel button text
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument()

    // Verify the default confirm button text
    expect(screen.getByText(/Confirm/i)).toBeInTheDocument()
  })

  test('renders the component with custom props', () => {
    const customProps = {
      title: 'Custom Title',
      description: 'Custom Description',
      cancelText: 'Abort',
      confirmText: 'Proceed',
    }

    render(<InfoModal {...customProps} />)

    // Verify the custom title
    expect(screen.getByText(/Custom Title/i)).toBeInTheDocument()

    // Verify the custom description
    expect(screen.getByText(/Custom Description/i)).toBeInTheDocument()

    // Verify the custom cancel button text
    expect(screen.getByText(/Abort/i)).toBeInTheDocument()

    // Verify the custom confirm button text
    expect(screen.getByText(/Proceed/i)).toBeInTheDocument()
  })

  test('calls callbacks when Cancel button is clicked', () => {
    const cancelActionFromParent = jest.fn()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)

    render(<InfoModal cancelActionFromParent={cancelActionFromParent} />)

    const cancelButton = screen.getByRole('button', { name: /Cancel/i })
    fireEvent.click(cancelButton)

    expect(cancelActionFromParent).toHaveBeenCalled()

    expect(useAppDispatch).toHaveBeenCalledTimes(1)
    expect(modalActions.closesModalAC).toHaveBeenCalledTimes(1)
  })

  test('calls callbacks when Confirm button is clicked', () => {
    const confirmActionFromParent = jest.fn()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
    render(<InfoModal confirmActionFromParent={confirmActionFromParent} />)

    const confirmButton = screen.getByRole('button', { name: /Confirm/i })
    fireEvent.click(confirmButton)

    expect(confirmActionFromParent).toHaveBeenCalled()
    expect(useAppDispatch).toHaveBeenCalledTimes(1)
    expect(modalActions.closesModalAC).toHaveBeenCalledTimes(1)
  })
})
