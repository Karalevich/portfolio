import { CommentListComponent } from '../types'
import styles from './CommentList.module.scss'
import Comment from '../Comment/Comment'
import React from 'react'

const CommentList: CommentListComponent = ({ comments, getReplies }) => {
  return (
    <ul className={styles.comments}>
      {comments.map((comment) => (
        <Comment key={comment._id} {...comment} getReplies={getReplies} />
      ))}
    </ul>
  )
}

export default CommentList
