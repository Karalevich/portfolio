import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './Comment.module.scss'
import { CommentComponent } from './types'
import { Button, Collapse } from '@mui/material'
import Like from '../../../../Custom/Like/Like'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import CommentTactics from '../CommentActions/CommentTactics'
import {
  addCommentThunk,
  commentActions,
  deleteCommentThunk,
  likeCommentThunk,
  updateCommentThunk,
} from '../../../../../actions/commentAction'
import CommentAvatar from '../CommentAvatar/CommentAvatar'
import { getOpenedPostIdS } from '../../../../../selectors/postSelector'
import { getUserIdS, getUserS } from '../../../../../selectors/userSelectors'
import { modalActions } from '../../../../../actions/modalAction'
import { MODAL_TYPE } from '../../../../../reducers/modal/types'
import CommentList from '../CommentList/CommentList'
import CommentForm from '../CommentForm/CommentForm'

export const Comment: CommentComponent = ({ author, message, _id, created_at, likes, getReplies }) => {
  const dispatch = useAppDispatch()
  const postId = useAppSelector(getOpenedPostIdS)
  const userId = useAppSelector(getUserIdS)
  const user = useAppSelector(getUserS)
  const [isShowChildren, setIsShowChildren] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isReplayMode, setIsReplayMode] = useState(false)
  const [commentValue, setCommentValue] = useState(message)
  const [replayValue, setReplayValue] = useState('')
  const [isLoadingUpdateComment, setIsLoadingUpdateComment] = useState(false)
  const [isLoadingReplayComment, setIsLoadingReplayComment] = useState(false)

  const childrenComments = getReplies(_id)

  const updateComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user?.isActivated) {
      return dispatch(modalActions.openModalAC(MODAL_TYPE.ACTIVATE_ACCOUNT_INFO))
    }
    setIsLoadingUpdateComment(true)
    const resetCallback = () => {
      setIsEditMode(false)
    }
    await dispatch(updateCommentThunk(resetCallback, commentValue, _id))

    setIsLoadingUpdateComment(false)
  }

  const replayComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user?.isActivated) {
      return dispatch(modalActions.openModalAC(MODAL_TYPE.ACTIVATE_ACCOUNT_INFO))
    }
    const resetCallback = () => {
      setReplayValue('')
      setIsReplayMode(false)
    }
    setIsLoadingReplayComment(true)
    await dispatch(addCommentThunk(resetCallback, replayValue.trim(), postId, _id))
    setIsLoadingReplayComment(false)
  }

  const deleteAction = () => {
    dispatch(deleteCommentThunk(_id))
  }

  const editAction = () => {
    setIsEditMode(!isEditMode)
  }

  const replayAction = () => {
    setIsReplayMode(!isReplayMode)
  }
  const shareAction = () => {}

  const addLike = () => {
    if (userId) {
      // set comment  with new like for immediate response of user action
      dispatch(commentActions.setLikeCommentAC(userId, _id))
      dispatch(likeCommentThunk(userId, _id))
    } else {
      console.log('You have to login first')
    }
  }

  return (
    <>
      <li className={styles.comment} aria-label='comment'>
        <CommentAvatar name={author.name} imageUrl={author.imageUrl} />
        <article className={styles.message}>
          <div className={styles.wrapper}>
            <header className={styles.owner}>
              <h4 className={styles.ownerName}>{author?.name}</h4>
              <p className={styles.commentDate}>{new Date(`${created_at}`).toLocaleString()}</p>
            </header>
            <main className={styles.commentMessage}>
              {isEditMode ? (
                <CommentForm
                  onSubmit={updateComment}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCommentValue(e.target.value)}
                  value={commentValue}
                  isLoadingComments={isLoadingUpdateComment}
                />
              ) : (
                <p>{message}</p>
              )}
              <div className={styles.actions}>
                <Like
                  isLiked={!!(userId && likes.includes(userId))}
                  onClick={addLike}
                  count={likes?.length}
                  disabled={!userId}
                />
                <CommentTactics
                  author={author}
                  deleteAction={deleteAction}
                  editAction={editAction}
                  replayAction={replayAction}
                  shareAction={shareAction}
                />
              </div>
            </main>
          </div>
          {isReplayMode && (
            <div>
              <CommentForm
                onSubmit={replayComment}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setReplayValue(e.target.value)}
                value={replayValue}
                isLoadingComments={isLoadingReplayComment}
                disabled={!user}
              />
            </div>
          )}
          {childrenComments?.length > 0 && (
            <div className={styles.nestedCommentsStack}>
              <Collapse in={isShowChildren} sx={{ position: 'relative' }}>
                <button className={styles.collapseLine} onClick={() => setIsShowChildren(false)} />
                <div className={styles.nestedComments}>
                  <CommentList comments={childrenComments} getReplies={getReplies} />
                </div>
              </Collapse>
              <Collapse in={!isShowChildren} sx={{ width: '100%' }}>
                <Button
                  onClick={() => setIsShowChildren(true)}
                  disableElevation
                  variant='outlined'
                  size={'small'}
                  fullWidth
                >
                  Show Replies
                </Button>
              </Collapse>
            </div>
          )}
        </article>
      </li>
    </>
  )
}

export default Comment
