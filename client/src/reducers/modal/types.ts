import { ActionT } from '../store'
import { modalActions } from '../../actions/modalAction'
import { ReactElement } from 'react'

export enum MODAL_TYPE {
  INFO = 'INFO',
  CONFIRM = 'CONFIRM',
  ERROR = 'ERROR',
  CONFIRM_DELETE_POST = 'CONFIRM_DELETE_POST',
  ACTIVATE_ACCOUNT_INFO = 'ACTIVATE_ACCOUNT_INFO',
  AUTH = 'AUTH',
}

export type ModalStateT = {
  type: MODAL_TYPE
  isOpen: boolean
  title: string
  description: string | ReactElement
  confirmText: string
  cancelText: string
}

export type ModalActionT = ActionT<typeof modalActions>
