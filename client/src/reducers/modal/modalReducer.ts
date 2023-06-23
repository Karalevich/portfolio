import { MODAL_TYPE, ModalActionT, ModalStateT } from './types'

export const SET_MODAL = 'SET_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const RESET_MODAL_DATA = 'RESET_MODAL_DATA'

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
        type: action.payload.type,
        description: action.payload.description || '',
        isOpen: true,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      }
    /*since closing the modal is an animated action, we have time to see the default text in the modal when it closes.
    To prevent this, we must use another/separate action to clear the fields.*/
    case RESET_MODAL_DATA:
      return {
        ...state,
        isOpen: false,
        title: '',
        description: '',
        confirmText: '',
        cancelText: '',
      }

    default:
      return state
  }
}
