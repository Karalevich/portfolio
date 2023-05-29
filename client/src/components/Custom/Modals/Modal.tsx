import React from 'react'
import styles from './Modal.module.scss'
import { ModalComponent } from './types'
import { Dialog } from '@mui/material'
import { MODAL_TYPE } from '../../../reducers/modal/types'
import ConfirmModal from './ConfirmModal/ConfirmModal'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getModalIsOpenS, getModalTypeS } from '../../../selectors/modalSelectors'
import { actionsModal } from '../../../actions/modalAction'

const MODAL_COMPONENTS = {
  [MODAL_TYPE.INFO]: ConfirmModal,
  [MODAL_TYPE.CONFIRM_DELETE_POST]: ConfirmModal,
  [MODAL_TYPE.ERROR]: ConfirmModal,
}
export const Modal: ModalComponent = () => {
  const isOpen = useAppSelector(getModalIsOpenS)
  const type = useAppSelector(getModalTypeS)
  const dispatch = useAppDispatch()

  const ModalComponent = MODAL_COMPONENTS[type]
  const handleClose = () => {
    dispatch(actionsModal.closesModalAC())
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      className={styles.modal}
    >
      <ModalComponent />
    </Dialog>
  )
}

export default Modal
