import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from '../SignIn'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { signInThunk } from '../../../actions/userAction'

// Mock Redux hooks
jest.mock('../../../hooks/hooks')

// Mock userActions and signInThunk
jest.mock('../../../actions/userAction', () => ({
  signInThunk: jest.fn(),
  userActions: {
    setErrSignInMessageAC: jest.fn(),
  },
}))

// Define a custom type for the mocked useAppSelector hook
type MockedUseAppSelector<T> = (arg: T) => ReturnType<typeof useAppSelector>

// Cast useAppSelector as the custom mocked type
const mockedUseAppSelector = useAppSelector as jest.MockedFunction<MockedUseAppSelector<any>>

describe('SignIn Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = () => {
    render(<SignIn />)
  }
  test('should display and submit the form with valid data', async () => {
    renderComponent()

    // Get input elements
    const emailInput = screen.getByPlaceholderText('Username or Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const signInButton = screen.getByRole('button')
    const checkboxButton = screen.getByRole('checkbox')

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(signInButton).toBeInTheDocument()
    expect(checkboxButton).toBeInTheDocument()

    // Type valid email and password
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password123')

    // Submit the form
    await userEvent.click(signInButton)

    // Wait for the form submission (for asynchronous actions)
    await waitFor(() => {
      // Assert that signInThunk is called with the correct values
      expect(signInThunk).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  test('should display error message on form submit with invalid data', async () => {
    renderComponent()

    // Get input elements
    const emailInput = screen.getByPlaceholderText('Username or Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const signInButton = screen.getByRole('button')

    // Type invalid email and password
    await userEvent.type(emailInput, 'invalidemail')
    await userEvent.type(passwordInput, 'short')

    // Submit the form
    await userEvent.click(signInButton)

    // Wait for the form submission (for asynchronous actions)
    await waitFor(() => {
      // Assert that the error message is displayed
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
      expect(screen.getByText('Password should be of minimum 8 characters length')).toBeInTheDocument()
    })
  })

  test('should display error message on form submit without data', async () => {
    renderComponent()

    // Get input elements
    const signInButton = screen.getByRole('button')

    // Submit the form
    await userEvent.click(signInButton)

    // Wait for the form submission (for asynchronous actions)
    await waitFor(() => {
      // Assert that the error message is displayed
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })
  })

  test('should display error message if errSignInMessage occurred', () => {
    mockedUseAppSelector.mockReturnValueOnce(false) //isAuthLoading = false
    mockedUseAppSelector.mockReturnValueOnce('Email does not exist')
    renderComponent()

    expect(screen.getByText('Email does not exist')).toBeInTheDocument()
  })

  test('should disabled inputs and button when isAuthLoading=true', async () => {
    mockedUseAppSelector.mockReturnValueOnce(true) //isAuthLoading = true
    mockedUseAppSelector.mockReturnValueOnce(false)

    renderComponent()

    // Get input elements
    const emailInput = screen.getByPlaceholderText('Username or Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const signInButton = screen.getByRole('button')

    expect(emailInput).toBeDisabled()
    expect(passwordInput).toBeDisabled()
    expect(signInButton).toBeDisabled()
  })
})
