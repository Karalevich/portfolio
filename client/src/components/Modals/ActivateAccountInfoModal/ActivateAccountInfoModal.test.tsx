import { render, fireEvent, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import ActivateAccountInfoModal from './ActivateAccountInfoModal'
import { useAppDispatch } from '../../../hooks/hooks'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { resentActivationLinkThunk } from '../../../actions/userAction'

// Mock Redux hooks
jest.mock('../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))

jest.mock('../../../actions/userAction', () => ({
  resentActivationLinkThunk: jest.fn(),
}))

const initialMockedState = {
  user: {
    email: 'test@gmail.com',
  },
}

describe('ActivateAccountInfoModal component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedState: any) => {
    const reducers = combineReducers({
      user: (state = mockedState) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <ActivateAccountInfoModal />
      </Provider>
    )
  }

  test('should render the ActivateAccountInfoModal component with the correct content', () => {
    renderComponent(initialMockedState)

    // Check if the description contains the user's email
    expect(screen.getByText(/An activation link has been sent to your email/)).toBeInTheDocument()
    expect(screen.getByText(/Would you like us to resend the activation link to/)).toBeInTheDocument()

    // Check if the "Send" button is present
    expect(screen.getByText('Send')).toBeInTheDocument()
  })

  test('should call the dispatch function with the correct action when the "Send" button is clicked', () => {
    renderComponent(initialMockedState)
    const sendButton = screen.getByText('Send')

    // Simulate a click on the "Send" button
    fireEvent.click(sendButton)

    // Check if the dispatch function was called with the expected action
    expect(resentActivationLinkThunk).toHaveBeenCalledWith(initialMockedState.user.email)
  })
})
