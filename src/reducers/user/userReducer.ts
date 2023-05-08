import { UserActionsT } from 'src/actions/userAction'
import { UserStateT } from './types'

export const SET_USER = 'SET_USER'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'

const initialState = {
  user: null,
  token: null,
  isOpenModal: false,
}

export default (state: UserStateT = initialState, action: UserActionsT) => {
  if (action.type === SET_USER) {
    const { user, token } = action.payload
    return {
      ...state,
      user,
      token,
    }
  }

  if (action.type === TOGGLE_MODAL) {
    const { isOpenModal } = action.payload
    return {
      ...state,
      isOpenModal,
    }
  }

  return state
}
