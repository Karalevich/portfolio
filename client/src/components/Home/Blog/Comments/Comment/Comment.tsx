import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './Comment.module.scss'
import { CommentComponent } from './types'
import { Button, Collapse } from '@mui/material'
import Like from '../../../../Custom/Like/Like'
import { CommentForm, CommentList } from '../Comments'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import CommentTactics from '../CommentActions/CommentTactics'
import { addCommentThunk, deleteCommentThunk } from '../../../../../actions/commentAction'
import CommentAvatar from '../CommentAvatar/CommentAvatar'
import { getOpenedPostIdS } from '../../../../../selectors/postSelector'

export const Comment: CommentComponent = ({
                                            author,
                                            message,
                                            _id,
                                            created_at,
                                            likes,
                                            getReplies,
                                          }) => {
  const dispatch = useAppDispatch()
  const postId = useAppSelector(getOpenedPostIdS)
  const [isShowChildren, setIsShowChildren] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isReplayMode, setIsReplayMode] = useState(false)
  const [commentValue, setCommentValue] = useState(message)
  const [replayValue, setReplayValue] = useState('')

  const childrenComments = getReplies(_id)

  const updateComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const replayComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resetCallback = () => {
      setReplayValue('')
      setIsReplayMode(false)
    }
    dispatch(addCommentThunk(resetCallback, replayValue.trim(), postId, _id))
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
  const shareAction = () => {
  }

  return (
    <>
      <li className={styles.comment}>
        <CommentAvatar name={author.name} imageUrl={author.imageUrl} />
        <article className={styles.message}>
          <header className={styles.owner}>
            <h4 className={styles.ownerName}>{author?.name}</h4>
            <p className={styles.commentDate}>{new Date(`${created_at}`).toLocaleString()}</p>
          </header>
          <main className={styles.commentMessage}>
            {isEditMode ? (
              <CommentForm onSubmit={updateComment}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setCommentValue(e.target.value)}
                           value={commentValue} />
            ) : (
              <p>{message}</p>
            )}
            <div className={styles.actions}>
              <Like isLiked={false} onClick={() => console.log('click')} count={likes?.length} />
              <CommentTactics
                author={author}
                deleteAction={deleteAction}
                editAction={editAction}
                replayAction={replayAction}
                shareAction={shareAction}
              />
            </div>
          </main>
          {isReplayMode && <div>
            <CommentForm onSubmit={replayComment}
                         onChange={(e: ChangeEvent<HTMLInputElement>) => setReplayValue(e.target.value)}
                         value={replayValue} />
          </div>}
          {childrenComments?.length > 0 && (
            <div className={styles.nestedCommentsStack}>
              <Collapse in={isShowChildren} sx={{ position: 'relative' }}>
                <button className={styles.collapseLine} onClick={() => setIsShowChildren(false)} />
                <div className={styles.nestedComments}>
                  <CommentList comments={childrenComments} getReplies={getReplies} />
                </div>
              </Collapse>
              <Collapse in={!isShowChildren} sx={{width: '100%'}}>
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
