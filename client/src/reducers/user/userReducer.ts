import { UserActionsT, UserStateT } from './types'

export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const TOGGLE_IS_AUTH_LOADING = 'TOGGLE_IS_AUTH_LOADING'
export const SET_ERROR_SIGNIN_MESSAGE = 'SET_ERROR_SIGNIN_MESSAGE'
export const SET_ERROR_SIGNUP_MESSAGE = 'SET_ERROR_SIGNUP_MESSAGE'

const initialState = {
  user: null,
  token: null,
  isAuthLoading: false,
  errSignInMessage: '',
  errSignUpMessage: '',
}

export default (state: UserStateT = initialState, action: UserActionsT) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      }
    case TOGGLE_IS_AUTH_LOADING:
      return {
        ...state,
        isAuthLoading: !state.isAuthLoading,
      }
    case SET_ERROR_SIGNIN_MESSAGE:
      return {
        ...state,
        errSignInMessage: action.payload.errMessage,
      }
    case SET_ERROR_SIGNUP_MESSAGE:
      return {
        ...state,
        errSignUpMessage: action.payload.errMessage,
      }
    default:
      return state
  }
}
