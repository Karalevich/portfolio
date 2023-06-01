import { ActionT } from '../store'
import { actionsModal } from '../../actions/modalAction'

export enum MODAL_TYPE {
  INFO = 'INFO',
  CONFIRM_DELETE_POST = 'CONFIRM_DELETE_POST',
  ERROR = 'ERROR',
  AUTH = 'AUTH',
}

export type ModalStateT = {
  type: MODAL_TYPE
  isOpen: boolean
  title: string
  description: string
  confirmText: string
  cancelText: string
}

export type ModalActionT = ActionT<typeof actionsModal>
