import { SET_MODAL, CLOSE_MODAL } from '../reducers/modal/modalReducer'
import { ModalStateT } from '../reducers/modal/types'

export const actionsModal = {
  openModalAC: (modalSettings: Partial<ModalStateT>) =>
    ({
      type: SET_MODAL,
      payload: {
        ...modalSettings,
      },
    } as const),
  closesModalAC: () =>
    ({
      type: CLOSE_MODAL,
      payload: {},
    } as const),
}
