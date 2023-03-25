import { AuthActionType, UserType } from '../actions/userAction'

export const AUTH = 'AUTH'

type AuthStateType = {
  user: UserType | null,
  token: string | null
}

const initialState = {
  user: null,
  token: null
}

export default (state: AuthStateType = initialState, action: AuthActionType) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      }
    default:
      return state
  }
}