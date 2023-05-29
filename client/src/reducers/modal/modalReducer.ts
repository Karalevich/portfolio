import { MODAL_TYPE, ModalActionT, ModalStateT } from './types'

export const SET_MODAL = 'SET_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

const initialState = {
  type: MODAL_TYPE.CONFIRM_DELETE_POST,
  isOpen: false,
  title: '',
  description: '',
  confirmText: '',
  cancelText: '',
}

export default (state: ModalStateT = initialState, action: ModalActionT) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        ...action.payload,
        isOpen: true
      }
      case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      }

    default:
      return state
  }
}
