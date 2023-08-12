import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SignUp } from '../SignUp'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import userEvent from '@testing-library/user-event'
import { signUpThunk } from '../../../actions/userAction'

// Mock Redux hooks
jest.mock('../../../hooks/hooks')

// Mock userActions and signInThunk
jest.mock('../../../actions/userAction', () => ({
  signUpThunk: jest.fn(),
  userActions: {
    setErrSignUpMessageAC: jest.fn(),
  },
}))

// Define a custom type for the mocked useAppSelector hook
type MockedUseAppSelector<T> = (arg: T) => ReturnType<typeof useAppSelector>

// Cast useAppSelector as the custom mocked type
const mockedUseAppSelector = useAppSelector as jest.MockedFunction<MockedUseAppSelector<any>>

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = () => {
    render(<SignUp />)
  }
  test('renders input fields and sign up button', () => {
    renderComponent()

    // Check if input fields are rendered
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Username or Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()

    // Check if the Sign Up button is rendered
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  test('should display and submit the form with valid data', async () => {
    renderComponent()

    // Get input elements
    const nameInput = screen.getByPlaceholderText('Full Name')
    const emailInput = screen.getByPlaceholderText('Username or Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
    const signUpButton = screen.getByRole('button')

    // Type valid email and password
    await userEvent.type(nameInput, 'Test')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.type(confirmPasswordInput, 'password123')

    // Submit the form
    await userEvent.click(signUpButton)

    // Wait for the form submission (for asynchronous actions)
    await waitFor(() => {
      // Assert that signInThunk is called with the correct values
      expect(signUpThunk).toHaveBeenCalledWith({
        name: 'Test',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      })
    })
  })

  test('displays error message when form is submitted without data input', async () => {
    renderComponent()

    // Simulate submitting the form with invalid input
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    // Check if error messages are displayed for the required fields
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
      expect(screen.getByText('Confirm password is required')).toBeInTheDocument()
    })
  })

  test('displays error message for invalid data', async () => {
    renderComponent()

    // Get input elements
    const nameInput = screen.getByPlaceholderText('Full Name')
    const emailInput = screen.getByPlaceholderText('Username or Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
    const signUpButton = screen.getByRole('button')

    // Type invalid email and password
    await userEvent.type(nameInput, 'ds')
    await userEvent.type(emailInput, 'invalidemail')
    await userEvent.type(passwordInput, 'short')
    await userEvent.type(confirmPasswordInput, 'sho')

    // Submit the form
    await userEvent.click(signUpButton)

    // Check if the error message for invalid email is displayed
    await waitFor(() => {
      expect(screen.getByText('Name should be in rage from 3 to 128 characters')).toBeInTheDocument()
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
      expect(screen.getByText('Password should be of minimum 8 characters length')).toBeInTheDocument()
      expect(screen.getByText('Passwords must match')).toBeInTheDocument()
    })
  })

  test('should display error message if errSignUpMessage occurred', () => {
    mockedUseAppSelector.mockReturnValueOnce(false) //isAuthLoading = false
    mockedUseAppSelector.mockReturnValueOnce('Email has already exist')
    renderComponent()

    expect(screen.getByText('Email has already exist')).toBeInTheDocument()
  })

  test('should disabled inputs and button when isAuthLoading=true', async () => {
    mockedUseAppSelector.mockReturnValueOnce(true) //isAuthLoading = true
    mockedUseAppSelector.mockReturnValueOnce(false)

    renderComponent()

    // Get input elements
    const nameInput = screen.getByPlaceholderText('Full Name')
    const emailInput = screen.getByPlaceholderText('Username or Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
    const signUpButton = screen.getByRole('button')

    expect(nameInput).toBeDisabled()
    expect(emailInput).toBeDisabled()
    expect(passwordInput).toBeDisabled()
    expect(confirmPasswordInput).toBeDisabled()
    expect(signUpButton).toBeDisabled()
  })
})
