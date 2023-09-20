import userReducer from './userReducer'
import { userActions } from '../../actions/userAction'

const testUser = {
  email: 'test@gmail.com',
  id: 'test id',
  name: 'test name',
  imageUrl: 'test img',
  isActivated: true,
}

const initialState = {
  user: testUser,
  token: 'test token',
  isAuthLoading: false,
  isFetchingLogout: false,
  errSignInMessage: '',
  errSignUpMessage: '',
}

describe('userReducer', () => {
  test('should handle SET_USER', () => {
    let newState = userReducer(
      { ...initialState, user: null, token: null },
      userActions.setAuthAC(testUser, 'token')
    )

    expect(newState.user).toEqual(testUser)
    expect(newState.token).toEqual('token')
  })

  test('should handle LOGOUT', () => {
    let newState = userReducer(initialState, userActions.removeAuthAC())

    expect(newState.user).toEqual(null)
    expect(newState.token).toEqual(null)
  })

  test('should handle TOGGLE_IS_AUTH_LOADING', () => {
    let newState = userReducer(initialState, userActions.toggleIsAuthAC())

    expect(newState.isAuthLoading).toEqual(true)
  })

  test('should handle SET_ERROR_SIGNIN_MESSAGE', () => {
    let newState = userReducer(initialState, userActions.setErrSignInMessageAC('Test error message'))

    expect(newState.errSignInMessage).toEqual('Test error message')
  })

  test('should handle SET_ERROR_SIGNUP_MESSAGE', () => {
    let newState = userReducer(initialState, userActions.setErrSignUpMessageAC('Test error message'))

    expect(newState.errSignUpMessage).toEqual('Test error message')
  })

  test('should handle SET_FETCHING_LOGOUT', () => {
    let newState = userReducer(initialState, userActions.setFetchingLogoutAC(true))

    expect(newState.isFetchingLogout).toEqual(true)
  })
})
