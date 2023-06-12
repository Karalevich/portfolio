import React from 'react'
import { ConfirmModalComponent } from './types'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useAppDispatch } from '../../../../hooks/hooks'
import { modalActions } from '../../../../actions/modalAction'

export const ConfirmModal: ConfirmModalComponent = ({
  title,
  description,
  confirmText,
  cancelText,
  cancelActionFromParent,
  confirmActionFromParent,
}) => {
  const dispatch = useAppDispatch()
  const cancelAction = () => {
    dispatch(modalActions.closesModalAC())
    cancelActionFromParent && cancelActionFromParent()
  }

  const confirmAction = () => {
    dispatch(modalActions.closesModalAC())
    confirmActionFromParent && confirmActionFromParent()
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
        <Button variant='outlined' onClick={cancelAction}>
          {cancelText ? cancelText : 'Cancel'}
        </Button>
        <Button
          variant='contained'
          onClick={confirmAction}
          autoFocus
          disableElevation
          color={confirmText === 'delete' ? 'error' : 'primary'}
        >
          {confirmText ? confirmText : 'Confirm'}
        </Button>
      </DialogActions>
    </>
  )
}

export default ConfirmModal
