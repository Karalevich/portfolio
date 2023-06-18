import React from 'react'
import styles from './CommentAvatar.module.scss'
import { CommentAvatarComponent } from './types'


export const CommentAvatar: CommentAvatarComponent = ({name, imageUrl}) => {
  return (
    <>
      {imageUrl ? (
        <img className={styles.userImage} src={imageUrl} alt={name || 'user'} />
      ) : (
        <div className={styles.userImage}>{name && name[0].toUpperCase()}</div>
      )}
    </>
  )
}

export default CommentAvatar