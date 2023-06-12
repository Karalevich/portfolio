import React from 'react'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useAppDispatch } from '../../../../hooks/hooks'
import { modalActions } from '../../../../actions/modalAction'
import { ErrorModalComponent } from './types'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export const ErrorModal: ErrorModalComponent = ({
  title,
  description,
  confirmText,
  confirmActionFromParent,
}) => {
  const dispatch = useAppDispatch()

  const confirmAction = () => {
    dispatch(modalActions.closesModalAC())
    confirmActionFromParent && confirmActionFromParent()
  }
  return (
    <>
      <DialogTitle id='alert-dialog-title' sx={{backgroundColor: '#d32f2f', color: '#f8f8f2', display: 'flex', alignItems: 'center'}}>
        <ReportGmailerrorredIcon/>
        {title ? title : 'Error!'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {description
            ? description
            : 'Sorry for this inconvenience, but some unknown error has occurred.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={confirmAction}
          autoFocus
          disableElevation
          color={'error'}
          sx={{color: '#f8f8f2'}}
        >
          {confirmText ? confirmText : 'Confirm'}
        </Button>
      </DialogActions>
    </>
  )
}

export default ErrorModal
