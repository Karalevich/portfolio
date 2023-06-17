import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './Comment.module.scss'
import { CommentComponent } from './types'
import { Button, Collapse } from '@mui/material'
import Like from '../../../../Custom/Like/Like'
import { CommentForm, CommentList } from '../Comments'
import { useAppDispatch } from '../../../../../hooks/hooks'
import CommentTactics from '../CommentActions/CommentTactics'
import { deleteCommentThunk } from '../../../../../actions/commentAction'

export const Comment: CommentComponent = ({
  author,
  message,
  _id,
  created_at,
  likes,
  getReplies,
}) => {
  const dispatch = useAppDispatch()

  const [isShowChildren, setIsShowChildren] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [commentValue, setCommentValue] = useState(message)

  const childrenComments = getReplies(_id)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value)
  }

  const updateComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const deleteAction = () => {
    dispatch(deleteCommentThunk(_id))
  }

  const editAction = () => {
    setIsEditMode(!isEditMode)
  }

  const replayAction = () => {}
  const shareAction = () => {}

  return (
    <>
      <li className={styles.comment}>
        <div>
          {author?.imageUrl ? (
            <img className={styles.userImage} src={author?.imageUrl} alt={author?.name} />
          ) : (
            <div className={styles.userImage}>{author?.name[0].toUpperCase()}</div>
          )}
        </div>
        <article className={styles.message}>
          <header className={styles.owner}>
            <h3 className={styles.ownerName}>{author?.name}</h3>
            <p className={styles.commentDate}>{new Date(`${created_at}`).toLocaleString()}</p>
          </header>
          <main className={styles.commentMessage}>
            {isEditMode ? (
              <CommentForm onSubmit={updateComment} onChange={onChange} value={commentValue} />
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
          {childrenComments?.length > 0 && (
            <div className={styles.nestedCommentsStack}>
              <Collapse in={isShowChildren} sx={{ position: 'relative' }}>
                <button className={styles.collapseLine} onClick={() => setIsShowChildren(false)} />
                <div className={styles.nestedComments}>
                  <CommentList comments={childrenComments} getReplies={getReplies} />
                </div>
              </Collapse>
              {!isShowChildren && (
                <Button
                  onClick={() => setIsShowChildren(true)}
                  disableElevation
                  variant='outlined'
                  size={'small'}
                >
                  Show Replies
                </Button>
              )}
            </div>
          )}
        </article>
      </li>
    </>
  )
}

export default Comment
