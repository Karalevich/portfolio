import React from 'react'
import styles from './Like.module.scss'
import { LikeComponent } from './types'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Tooltip } from '../Tooltip'
import { Checkbox } from '@mui/material'

export const Like: LikeComponent = ({ isLiked, onClick, count, disabled }) => {

  return (
    <span className={styles.likes}>
          <Tooltip title={disabled ? 'Please login first' : ''} placement='top' arrow>
            <span>
             <Checkbox onChange={onClick}
                       sx={{
                         padding: 0,
                         '&:hover': {
                           backgroundColor: 'transparent',
                           opacity: 0.8,
                         },
                       }}
                       disabled={disabled}
                       checked={isLiked}
                       icon={<FavoriteBorderIcon className={styles.favoriteIcon} />}
                       checkedIcon={<FavoriteIcon className={styles.liked} />} />
            </span>
          </Tooltip>
      <p className={styles.number}>{count}</p>
    </span>
  )
}

export default Like
