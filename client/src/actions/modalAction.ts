import { SET_MODAL, CLOSE_MODAL } from '../reducers/modal/modalReducer'
import { MODAL_TYPE } from '../reducers/modal/types'

export const modalActions = {
  openModalAC: (modalType: MODAL_TYPE) =>
    ({
      type: SET_MODAL,
      payload: {
        type: modalType,
      },
    } as const),
  closesModalAC: () =>
    ({
      type: CLOSE_MODAL,
      payload: {},
    } as const),
}
