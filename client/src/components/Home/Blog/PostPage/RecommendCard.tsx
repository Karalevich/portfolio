import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import styles from './PostPage.module.scss'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import { Card, CardActionArea, CardMedia, Skeleton } from '@mui/material'
import { RecommendCardComponent } from '../PostCard/types'

const RecommendCard: RecommendCardComponent = ({ img, title, _id, date, author, isFetchingPosts }) => {
  const [isCardHover, setIsCardHover] = useState(false)
  const redirect = useNavigate()

  const handleRedirect = () => {
    redirect(`/blog/post/${_id}`)
  }

  const toggleIsCardHover = (value: boolean) => () => {
    setIsCardHover(value)
  }
  return (
    <Card
      className={styles.card}
      elevation={isCardHover ? 8 : 0}
      onMouseEnter={toggleIsCardHover(true)}
      onMouseLeave={toggleIsCardHover(false)}
    >
      <CardActionArea className={styles.actionArea} onClick={handleRedirect}>
        {isFetchingPosts
          ? <Skeleton animation='wave' width={'100%'} height={'100%'} sx={{ transform: 'none' }} />
          : <CardMedia className={styles.media} component='img' image={img as string} alt={title} />}
        <div className={styles.content}>
          {isFetchingPosts
            ? <h3><Skeleton animation='wave' className={styles.title} width={'100%'} /></h3>
            : <h4 className={styles.title}>{title}</h4>
          }
          <div className={styles.data}>
            {isFetchingPosts
              ? <Skeleton animation='wave' className={styles.type} width={'40%'} />
              : <span className={styles.type}>
                  <AccessTimeIcon fontSize={'small'} />
                  <span>{new Date(date).toLocaleDateString()}</span>
                </span>
            }
            {isFetchingPosts
              ? <Skeleton animation='wave' className={styles.type} width={'40%'} />
              : <span className={styles.type}>
                  <PersonOutlineIcon fontSize={'small'} />
                  <span>{author?.name}</span>
            </span>
            }
          </div>
        </div>
      </CardActionArea>
    </Card>
  )
}

export default RecommendCard
