import { UserActionsT, UserStateT } from './types'

export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'

const initialState = {
  user: null,
  token: null,
}

export default (state: UserStateT = initialState, action: UserActionsT) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null
      }
    default:
      return state
  }
}
