import modalReducer from './modalReducer'
import { modalActions } from '../../actions/modalAction'
import { MODAL_TYPE } from './types'

const initialState = {
  type: MODAL_TYPE.CONFIRM_DELETE_POST,
  isOpen: false,
  title: 'test title',
  description: '',
  confirmText: '',
  cancelText: '',
}

describe('modalReducer', () => {
  test('should handle SET_MODAL', () => {
    const newState = modalReducer(initialState, modalActions.openModalAC(MODAL_TYPE.ERROR, 'Test error'))

    expect(newState.type).toEqual(MODAL_TYPE.ERROR)
    expect(newState.description).toEqual('Test error')
    expect(newState.isOpen).toEqual(true)
  })

  test('should handle CLOSE_MODAL', () => {
    const newState = modalReducer(initialState, modalActions.closesModalAC())

    expect(newState.isOpen).toEqual(false)
  })

  test('should handle RESET_MODAL_DATA', () => {
    const newState = modalReducer(initialState, modalActions.resetModalDataAC())

    expect(newState).toEqual({
      type: MODAL_TYPE.CONFIRM_DELETE_POST,
      isOpen: false,
      title: '',
      description: '',
      confirmText: '',
      cancelText: '',
    })
  })
})
