import React from 'react'
import { ModalComponent } from './types'
import { Dialog } from '@mui/material'
import { MODAL_TYPE } from '../../../reducers/modal/types'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getModalDescriptionS, getModalIsOpenS, getModalTypeS } from '../../../selectors/modalSelectors'
import { closeModalThunk } from '../../../actions/modalAction'
import InfoModal from './InfoModal/InfoModal'
import ConfirmModal from './ConfirmModal/ConfirmModal'
import ConfirmDeletePostModal from '../../Modals/ConfirmDeletePostModal/ConfirmDeletePostModal'
import Auth from '../../Auth/Auth'
import ErrorModal from './ErrorModal/ErrorModal'
import ActivateAccountInfoModal from '../../Modals/ActivateAccountInfoModal/ActivateAccountInfoModal'

const MODAL_COMPONENTS = {
  [MODAL_TYPE.INFO]: InfoModal,
  [MODAL_TYPE.CONFIRM]: ConfirmModal,
  [MODAL_TYPE.ERROR]: ErrorModal,
  [MODAL_TYPE.CONFIRM_DELETE_POST]: ConfirmDeletePostModal,
  [MODAL_TYPE.ACTIVATE_ACCOUNT_INFO]: ActivateAccountInfoModal,
  [MODAL_TYPE.AUTH]: Auth,
}
export const Modal: ModalComponent = () => {
  const isOpen = useAppSelector(getModalIsOpenS)
  const type = useAppSelector(getModalTypeS)
  const dispatch = useAppDispatch()
  const description = useAppSelector(getModalDescriptionS)

  const ModalComponent = MODAL_COMPONENTS[type]
  const handleClose = () => {
    dispatch(closeModalThunk())
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <ModalComponent description={description} />
    </Dialog>
  )
}

export default Modal
