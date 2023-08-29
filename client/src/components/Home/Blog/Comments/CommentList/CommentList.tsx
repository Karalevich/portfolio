import styles from './CommentList.module.scss'
import Comment from '../Comment/Comment'
import React from 'react'
import { CommentListComponent } from './types'

const CommentList: CommentListComponent = ({ comments, getReplies }) => {
  return (
    <ul className={styles.comments} aria-label='comment-list'>
      {comments.map((comment) => (
        <Comment key={comment._id} {...comment} getReplies={getReplies} />
      ))}
    </ul>
  )
}

export default CommentList
