import React from 'react'
import { InfoModal } from '../../Custom/Modal/InfoModal/InfoModal'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { ActivateAccountInfoModalComponent } from './types'
import { getUserEmailS } from '../../../selectors/userSelectors'
import { resentActivationLinkThunk } from '../../../actions/userAction'


export const ActivateAccountInfoModal: ActivateAccountInfoModalComponent = () => {
  const dispatch = useAppDispatch()
  const userEmail = useAppSelector(getUserEmailS)
  const cancelAction = () => {
  }

  const confirmAction = () => {
    dispatch(resentActivationLinkThunk(userEmail!))
  }
  return (
    <InfoModal
      description={
        <div>
          To create a post, please ensure that your account is activated. An activation link has been sent
          to your email <strong>{userEmail}</strong>. Would you like us to resend the activation link
          to <strong>{userEmail}</strong>?
        </div>
      }
      confirmText={'Send'}
      cancelActionFromParent={cancelAction}
      confirmActionFromParent={confirmAction}
    />
  )
}

export default ActivateAccountInfoModal
