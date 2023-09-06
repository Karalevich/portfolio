import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { useAppDispatch } from '../../../hooks/hooks'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'
import Contact from './Contact'
import { sendMessageFromContactFormThunk } from '../../../actions/serviceAction'

// Mock Redux hooks
jest.mock('../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))


jest.mock('../../../actions/serviceAction', () => ({
  sendMessageFromContactFormThunk: jest.fn(),
}))

const initialMockedState = {
  isLoadingContactForm: false,
}


describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedState: any) => {
    const reducers = combineReducers({
      service: (state = mockedState) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <Contact />
      </Provider>,
    )
  }

  test('should render correct components', () => {
    renderComponent(initialMockedState)

    const title = screen.getByText('Leave me your info')
    const name = screen.getByLabelText('Your Full Name (Required)')
    const email = screen.getByLabelText('Your Email (Required)')
    const subject = screen.getByLabelText('Subject')
    const message = screen.getByLabelText('Yor Message (Required)')
    const button = screen.getByRole('button', { name: 'Send Message' })

    expect(title).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(subject).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
  test('should display and submit the form with valid data', async () => {
    renderComponent(initialMockedState)

    const name = screen.getByLabelText('Your Full Name (Required)')
    const email = screen.getByLabelText('Your Email (Required)')
    const subject = screen.getByLabelText('Subject')
    const message = screen.getByLabelText('Yor Message (Required)')
    const button = screen.getByRole('button', { name: 'Send Message' })

    await userEvent.type(name, 'Test type')
    await userEvent.type(email, 'test@gmail.com')
    await userEvent.type(subject, 'test subject')
    await userEvent.type(message, 'Test content with at lest 5 word')

    // Submit the form
    await userEvent.click(button)

    // Wait for the form submission (for asynchronous actions)
    await waitFor(() => {
      // Assert that createPostThunk is called with the correct values
      expect(sendMessageFromContactFormThunk).toHaveBeenCalledWith(
        {
          name: 'Test type',
          email:'test@gmail.com',
          subject: 'test subject',
          message: 'Test content with at lest 5 word',
        },
        expect.any(Function),
      )
    })
  })

  test('should display errors without data', async () => {
    renderComponent(initialMockedState)

    const name = screen.getByLabelText('Your Full Name (Required)')
    const email = screen.getByLabelText('Your Email (Required)')
    const subject = screen.getByLabelText('Subject')
    const message = screen.getByLabelText('Yor Message (Required)')
    const button = screen.getByRole('button', { name: 'Send Message' })

    await userEvent.type(name, 'Te')
    await userEvent.type(email, 'testgmail.com')
    await userEvent.type(subject, 'test subject test subject test subject test subject test subject test subject test subject test subject test subject test subject test subject test subject ')
    await userEvent.type(message, 'Test content with')

    // Submit the form
    await userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Name should be of minimum 3 characters length')).toBeInTheDocument()
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
      expect(screen.getByText('Subject should be of maximum 128 characters length')).toBeInTheDocument()
      expect(screen.getByText('Message should have at least 5 words')).toBeInTheDocument()
    })
  })

})
