import { fireEvent, render, screen } from '@testing-library/react'
import Modal from './Modal'
import { MODAL_TYPE } from '../../../reducers/modal/types'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { closeModalThunk } from '../../../actions/modalAction'

// Mock the custom hooks and actions
jest.mock('../../../hooks/hooks')

jest.mock('../../../actions/modalAction', () => ({
  closeModalThunk: jest.fn(),
}))

jest.mock('./InfoModal/InfoModal', () => () => <div data-testid='info-modal' />)
jest.mock('./ConfirmModal/ConfirmModal', () => () => <div data-testid='confirm-modal' />)

// Define a custom type for the mocked useAppSelector hook
type MockedUseAppSelector<T> = (arg: T) => ReturnType<typeof useAppSelector>;

// Cast useAppSelector as the custom mocked type
const mockedUseAppSelector = useAppSelector as jest.MockedFunction<MockedUseAppSelector<any>>


describe('Modal Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly', () => {
    mockedUseAppSelector.mockReturnValueOnce(true) // Modal is open
    mockedUseAppSelector.mockReturnValueOnce(MODAL_TYPE.INFO) // Modal type is INFO


    render(<Modal />)

    // Assert
    expect(screen.getByTestId('info-modal')).toBeInTheDocument()
  })

  test('should not render any ModalComponent when modal is closed', () => {
    mockedUseAppSelector.mockReturnValueOnce(false)  // Modal is closed
    mockedUseAppSelector.mockReturnValueOnce(MODAL_TYPE.INFO) // Modal type is INFO

    render(<Modal />)

    // Assert
    expect(screen.queryByTestId('info-modal')).not.toBeInTheDocument()
    expect(screen.queryByTestId('confirm-modal')).not.toBeInTheDocument()
  })

  test('should call closeModalThunk when the modal is closed', () => {
    mockedUseAppSelector.mockReturnValueOnce(true) // Modal is open
    mockedUseAppSelector.mockReturnValueOnce(MODAL_TYPE.INFO) // Modal type is INFO

    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)

    render(<Modal />)
    const modalElement = screen.getByRole('dialog')

    fireEvent.keyDown(modalElement, { key: 'Escape' })

    // Assert
    expect(useAppDispatch).toHaveBeenCalledTimes(1)
    expect(closeModalThunk).toHaveBeenCalledTimes(1)
  })
})