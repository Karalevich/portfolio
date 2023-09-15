import { SET_MODAL, CLOSE_MODAL, RESET_MODAL_DATA } from '../reducers/modal/modalReducer'
import { MODAL_TYPE, ModalActionT } from '../reducers/modal/types'
import { ThunkT } from '../reducers/store'
import { notistackActions } from './notistackAction'
import { NotistackActionT } from '../reducers/notistack/types'

export const modalActions = {
  openModalAC: (modalType: MODAL_TYPE, description?: string) =>
    ({
      type: SET_MODAL,
      payload: {
        type: modalType,
        description,
      },
    } as const),
  closesModalAC: () =>
    ({
      type: CLOSE_MODAL,
      payload: {},
    } as const),
  resetModalDataAC: () =>
    ({
      type: RESET_MODAL_DATA,
      payload: {},
    } as const),
}

export const closeModalThunk = (): ThunkT<ModalActionT | NotistackActionT> => async (dispatch) => {
  try {
    dispatch(modalActions.closesModalAC())
    /*since closing the modal is an animated action, we have time to see the default text in the modal when it closes.
    To prevent this, we must use another action to clear the fields after short delay.*/
    const delay = new Promise((res) => {
      setTimeout(() => {
        res('')
      }, 1000)
    })
    await delay
    dispatch(modalActions.resetModalDataAC())
  } catch (e) {
    dispatch(
      notistackActions.enqueueSnackbarAC({
        message: 'Sorry, there was an error while closing modal',
        options: {
          variant: 'error',
        },
      })
    )
  }
}
