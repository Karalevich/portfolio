import React from 'react'
import styles from './Like.module.scss'
import { LikeComponent } from './types'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export const Like: LikeComponent = ({ isLiked, onClick, count }) => {
  const toggleLike = () => {
    onClick()
  }

  return (
    <span className={styles.likes}>
      {isLiked ? (
        <FavoriteIcon className={styles.liked} fontSize={'small'} onClick={toggleLike} />
      ) : (
        <FavoriteBorderIcon className={styles.favoriteIcon} fontSize={'small'} onClick={toggleLike} />
      )}
      <p className={styles.number}>{count}</p>
    </span>
  )
}

export default Like
