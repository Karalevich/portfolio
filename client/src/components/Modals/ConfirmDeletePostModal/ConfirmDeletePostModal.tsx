import React from 'react'
import { ConfirmDeletePostModalComponent } from './types'

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { deletePostThunk } from '../../../actions/postsAction'
import { getOpenedPostIdS } from '../../../selectors/postsSelectors'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../../Custom/Modal/ConfirmModal/ConfirmModal'

export const ConfirmDeletePostModal: ConfirmDeletePostModalComponent = () => {
  const dispatch = useAppDispatch()
  const openPostId = useAppSelector(getOpenedPostIdS)
  const navigate = useNavigate()
  const cancelAction = () => {}

  const confirmAction = () => {
    dispatch(deletePostThunk(openPostId, navigate))
  }
  return (
    <ConfirmModal
      description={'Are you sure you want to delete the post? This process cannot be undone.'}
      confirmText={'delete'}
      cancelActionFromParent={cancelAction}
      confirmActionFromParent={confirmAction}
    />
  )
}

export default ConfirmDeletePostModal
