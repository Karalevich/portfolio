import React from 'react'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useAppDispatch } from '../../../../hooks/hooks'
import { modalActions } from '../../../../actions/modalAction'
import { InfoModalComponent } from './types'
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'

export const InfoModal: InfoModalComponent = ({
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
      <DialogTitle
        id='alert-dialog-title'
        sx={{ display: 'flex', alignItems: 'end', columnGap: '1rem' }}
      >
        <FeedbackOutlinedIcon sx={{ color: '#FFB400' }} />
        <span>{title ? title : 'Important Information!'}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {description
            ? description
            : 'Frequently Asked Questions: Find answers to common inquiries and make the most of your experience.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={cancelAction}>
          {cancelText ? cancelText : 'Cancel'}
        </Button>
        <Button variant='contained' onClick={confirmAction} autoFocus disableElevation color={'primary'}>
          {confirmText ? confirmText : 'Confirm'}
        </Button>
      </DialogActions>
    </>
  )
}

export default InfoModal
