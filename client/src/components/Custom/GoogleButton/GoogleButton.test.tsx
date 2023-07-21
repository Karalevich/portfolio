import { render, screen } from '@testing-library/react'
import GoogleButton from './GoogleButton'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { store } from '../../../reducers/store'
import { Provider } from 'react-redux'


describe('GoogleButton', () => {
  test('renders correctly', () => {
    render(
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
        <Provider store={store}>
          <GoogleButton />
        </Provider>
      </GoogleOAuthProvider>,
    )
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()

    expect(buttonElement.textContent).toMatch('Sign In with Google')

    const iconElement = screen.getByTestId('google-icon')
    expect(iconElement).toBeInTheDocument()
  })
// TODO
  // test('should dispatch googleSuccessThunk when clicked', () => {
  //
  //   jest.mock('@react-oauth/google', () => ({
  //     useGoogleLogin: () => jest.fn()
  //   }))
  //
  //   render(
  //     <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
  //       <Provider store={store}>
  //         <GoogleButton  />
  //       </Provider>
  //     </GoogleOAuthProvider>,
  //   )
  //
  //   const buttonElement = screen.getByRole('button')
  //
  //   fireEvent.click(buttonElement)
  //
  //   expect(jest.fn()).toHaveBeenCalledWith(expect.any(Function))
  // })

  test('should render custom text when provided', () => {
    const customText = 'Google Sign Up'

    render(
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
        <Provider store={store}>
          <GoogleButton text={customText}/>
        </Provider>
      </GoogleOAuthProvider>,
    )

    const buttonElement = screen.getByText(customText)

    expect(buttonElement).toBeInTheDocument()
  })
})



