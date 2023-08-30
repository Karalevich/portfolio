import { PostCardComponent } from './types'
import React, { forwardRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PostCard.module.scss'
import { Button, CardContent, CardMedia, Skeleton, Card } from '@mui/material'
import { OrderIcon } from '../../../Custom/Icons'
import classnames from 'classnames'

const PostCard: PostCardComponent = forwardRef(
  ({ img, title, description, _id, isFullVersion, isFetchingPosts }, ref) => {
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
        className={classnames(styles.card, { [styles.fullCard]: isFullVersion })}
        elevation={isCardHover && isFullVersion ? 2 : 0}
        onMouseEnter={toggleIsCardHover(true)}
        onMouseLeave={toggleIsCardHover(false)}
        ref={ref}
        aria-label='post-card'
      >
        {isFetchingPosts ? (
          <Skeleton
            className={styles.media}
            animation='wave'
            variant='rectangular'
            data-testid='post-card-media-skeleton'
          />
        ) : (
          <CardMedia className={styles.media} component='img' image={img as string} alt={title} />
        )}
        <CardContent className={styles.content}>
          {isFetchingPosts ? (
            <h3>
              <Skeleton animation='wave' width={'80%'} data-testid='post-card-title-skeleton' />
            </h3>
          ) : (
            <h4 className={styles.title}>{title}</h4>
          )}
          {isFetchingPosts ? (
            [1, 2, 3].map((e) => (
              <Skeleton animation='wave' key={e} data-testid='post-card-description-skeleton' />
            ))
          ) : (
            <p className={styles.description}>{description}</p>
          )}
        </CardContent>
        {isFetchingPosts ? (
          <Skeleton
            animation='wave'
            sx={{ width: '35%', height: '3rem', marginLeft: '1rem' }}
            data-testid='post-card-button-skeleton'
          />
        ) : (
          <Button
            onClick={handleRedirect}
            className={styles.expand}
            endIcon={<OrderIcon className={styles.arrow} />}
          >
            Learn More
          </Button>
        )}
      </Card>
    )
  }
)

export default PostCard
