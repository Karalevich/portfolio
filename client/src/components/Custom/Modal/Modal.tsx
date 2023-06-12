import React from 'react'
import { ModalComponent } from './types'
import { Dialog } from '@mui/material'
import { MODAL_TYPE } from '../../../reducers/modal/types'
import ConfirmModal from './ConfirmModal/ConfirmModal'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getModalIsOpenS, getModalTypeS } from '../../../selectors/modalSelectors'
import { modalActions } from '../../../actions/modalAction'
import ConfirmDeletePostModal from '../../Modals/ConfirmDeletePostModal/ConfirmDeletePostModal'
import Auth from '../../Auth/Auth'
import ErrorModal from './ErrorModal/ErrorModal'

const MODAL_COMPONENTS = {
  [MODAL_TYPE.INFO]: ConfirmModal,
  [MODAL_TYPE.CONFIRM]: ConfirmModal,
  [MODAL_TYPE.ERROR]: ErrorModal,
  [MODAL_TYPE.CONFIRM_DELETE_POST]: ConfirmDeletePostModal,
  [MODAL_TYPE.AUTH]: Auth,
}
export const Modal: ModalComponent = () => {
  const isOpen = useAppSelector(getModalIsOpenS)
  const type = useAppSelector(getModalTypeS)
  const dispatch = useAppDispatch()

  const ModalComponent = MODAL_COMPONENTS[type]
  const handleClose = () => {
    dispatch(modalActions.closesModalAC())
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <ModalComponent />
    </Dialog>
  )
}

export default Modal
