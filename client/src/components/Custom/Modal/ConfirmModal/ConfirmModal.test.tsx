import { fireEvent, render, screen } from '@testing-library/react'
import ConfirmModal from './ConfirmModal'
import { useAppDispatch } from '../../../../hooks/hooks'
import { modalActions } from '../../../../actions/modalAction'

// Mock the useAppDispatch hook
jest.mock('../../../../hooks/hooks')

// Mock the modalActions
jest.mock('../../../../actions/modalAction', () => ({
  modalActions: {
    closesModalAC: jest.fn(),
  },
}))

describe('ConfirmModal Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the component with default values', () => {
    render(<ConfirmModal />)

    // Verify the default title
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()

    // Verify the default description
    expect(
      screen.getByText('Are you sure you want to do this action? This process cannot be undone.')
    ).toBeInTheDocument()

    // Verify the default cancel button text
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument()

    // Verify the default confirm button text
    expect(screen.getByText(/Confirm/i)).toBeInTheDocument()
  })

  test('renders the component with custom props', () => {
    const customProps = {
      title: 'Custom Confirm Title',
      description: 'Custom Confirm Description',
      confirmText: 'Delete',
      cancelText: 'Abort',
    }

    render(<ConfirmModal {...customProps} />)

    // Verify the custom title
    expect(screen.getByText(/Custom Confirm Title/i)).toBeInTheDocument()

    // Verify the custom description
    expect(screen.getByText(/Custom Confirm Description/i)).toBeInTheDocument()

    // Verify the custom cancel button text
    expect(screen.getByText(/Abort/i)).toBeInTheDocument()

    // Verify the custom confirm button text
    expect(screen.getByText(/Delete/i)).toBeInTheDocument()
  })

  test('calls callbacks when Cancel button is clicked', () => {
    const cancelActionFromParent = jest.fn()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)

    render(<ConfirmModal cancelActionFromParent={cancelActionFromParent} />)

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
    render(<ConfirmModal confirmActionFromParent={confirmActionFromParent} />)

    const confirmButton = screen.getByRole('button', { name: /Confirm/i })
    fireEvent.click(confirmButton)

    expect(confirmActionFromParent).toHaveBeenCalled()
    expect(useAppDispatch).toHaveBeenCalledTimes(1)
    expect(modalActions.closesModalAC).toHaveBeenCalledTimes(1)
  })
})
