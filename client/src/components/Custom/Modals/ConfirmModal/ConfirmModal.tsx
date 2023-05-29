import React from 'react'
import styles from './ConfirmModal.module.scss'
import { ConfirmModalComponent } from './types'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import {
  getModalCancelTextS,
  getModalConfirmTextS,
  getModalDescriptionS,
  getModalTitleS,
} from '../../../../selectors/modalSelectors'
import { actionsModal } from '../../../../actions/modalAction'

export const ConfirmModal: ConfirmModalComponent = () => {
  const title = useAppSelector(getModalTitleS)
  const description = useAppSelector(getModalDescriptionS)
  const confirmText = useAppSelector(getModalConfirmTextS)
  const cancelText = useAppSelector(getModalCancelTextS)
  const dispatch = useAppDispatch()
  const cancelAction = () => {
    dispatch(actionsModal.closesModalAC())
  }

  const confirmAction = () => {
    dispatch(actionsModal.closesModalAC())
  }
  return (
    <>
      <DialogTitle id='alert-dialog-title'>{title ? title : 'Are you sure?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {description
            ? description
            : 'Are you sure you want to do this action? This process cannot be undone.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={cancelAction}>{cancelText ? cancelText : 'Cancel'}</Button>
        <Button variant='contained' onClick={confirmAction} autoFocus disableElevation
                color={confirmText === 'delete' ? 'error' : 'primary'}>
          {confirmText ? confirmText : 'Confirm'}
        </Button>
      </DialogActions>
    </>
  )
}

export default ConfirmModal
