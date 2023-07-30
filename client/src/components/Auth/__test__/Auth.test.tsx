import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Auth } from '../Auth'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Mock the custom hooks and actions
jest.mock('../../../hooks/hooks')

// Define a custom type for the mocked useAppSelector hook
type MockedUseAppSelector<T> = (arg: T) => ReturnType<typeof useAppSelector>

// Cast useAppSelector as the custom mocked type
const mockedUseAppSelector = useAppSelector as jest.MockedFunction<MockedUseAppSelector<any>>

describe('Auth Component', () => {
  test('renders the Auth component with Sign In tab', () => {
    // Mock the useSelector return value for isAuthLoading.
    mockedUseAppSelector.mockReturnValueOnce(false)
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)

    render(
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
        <Auth />
      </GoogleOAuthProvider>,
    )

    // Assert that the "Sign In" tab is rendered and selected.
    const signInTab = screen.getByRole('tab', { name: 'Sign In', selected: true })
    expect(signInTab).toBeInTheDocument()

    // Assert that the "Sign Up" tab is rendered and not selected.
    const signUpTab = screen.getByRole('tab', { name: 'Sign Up', selected: false })
    expect(signUpTab).toBeInTheDocument()

    const googleButton = screen.getByRole('button', {name: 'Sign In with Google'})
    expect(googleButton).toBeInTheDocument()

    const signInButton = screen.getByRole('button', {name: 'Sign In'})
    expect(signInButton).toBeInTheDocument()

    const emailInputElement = screen.getByPlaceholderText('Username or Email')
    expect(emailInputElement).toBeInTheDocument()

    const passwordInputElement = screen.getByPlaceholderText('Password')
    expect(passwordInputElement).toBeInTheDocument()
  })

  test('changes the active tab on click', () => {
    // Mock the useSelector return value for isAuthLoading.
    mockedUseAppSelector.mockReturnValueOnce(false)
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)

    render(
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
        <Auth />
      </GoogleOAuthProvider>,
    )

    // Click the "Sign Up" tab and check if it becomes active.
    const signUpTab = screen.getByRole('tab', { name: 'Sign Up', selected: false })
    userEvent.click(signUpTab)
    expect(signUpTab).toHaveAttribute('aria-selected', 'true')


    const signUpText = screen.getByText('Enter your credential information')
    expect(signUpText).toBeInTheDocument()

    // Click the "Sign In" tab and check if it becomes active.
    const signInTab = screen.getByRole('tab', { name: 'Sign In', selected: false })
    userEvent.click(signInTab)
    expect(signInTab).toHaveAttribute('aria-selected', 'true')

    const signInText = screen.getByText('Enter your login information')
    expect(signInText).toBeInTheDocument()

  })

  test('disables tabs when isAuthLoading is true', () => {
    // Mock the useSelector return value for isAuthLoading.
    mockedUseAppSelector.mockReturnValueOnce(true)
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)

    render(
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
        <Auth />
      </GoogleOAuthProvider>,
    )

    // Assert that both tabs are disabled when isAuthLoading is true.
    const signInTab = screen.getByRole('tab', { name: 'Sign In', selected: true })
    const signUpTab = screen.getByRole('tab', { name: 'Sign Up', selected: false })
    expect(signInTab).toBeDisabled()
    expect(signUpTab).toBeDisabled()
  })
})
