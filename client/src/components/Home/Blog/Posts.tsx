import React, { Fragment, useContext, useEffect, useState } from 'react'

import { CarouselContext, Slide, Slider } from 'pure-react-carousel'
import { OrderIcon } from '../../Custom/Icons'
import Card from '@mui/material/Card/Card'
import { Button, CardContent, CardMedia, Skeleton } from '@mui/material'
import { POSTS } from '../../../constants/personalInfo'
import classnames from 'classnames'
import styles from './Blog.module.scss'
import { PostCardComponent, PostsContent } from './types'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getPostsThunk } from '../../../actions/postsAction'
import { getFetchingPostsS, getPostsS } from '../../../selectors/postsSelectors'

const Posts: PostsContent = ({ isTabletOrMobile, isFullVersion }) => {
  const carouselContext = useContext(CarouselContext)
  const [currentSlide, setCurrentSlide] = useState(carouselContext?.state?.currentSlide)
  const dispatch = useAppDispatch()
  const isFetchingPosts = useAppSelector(getFetchingPostsS)
  const posts = useAppSelector(getPostsS)

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide)
    }

    dispatch(getPostsThunk())

    carouselContext?.subscribe(onChange)
    return () => carouselContext?.unsubscribe(onChange)
  }, [])

  const mappedPosts = posts.map((props, index) => {
    return (
      <Fragment key={props._id}>
        {isFullVersion ? (
          <PostCard {...props} isFullVersion={isFullVersion} isFetchingPosts={isFetchingPosts}/>
        ) : (
          <Slide index={index || 0} innerClassName={styles.innerSlide}>
            <PostCard {...props} isFetchingPosts={isFetchingPosts}/>
          </Slide>
        )}
      </Fragment>
    )
  })

  return (
    <>
      {isFullVersion ? (
        posts
      ) : (
        <Slider
          classNameAnimation={classnames({
            [styles.lastSlide]: currentSlide === POSTS.length - 1,
            [styles.sliderTray]: isTabletOrMobile,
          })}
        >
          {mappedPosts}
        </Slider>
      )}
    </>
  )
}
export default Posts

const PostCard: PostCardComponent = ({ img, title, description, _id, isFullVersion, isFetchingPosts }) => {
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
      elevation={isCardHover && isFullVersion ? 2 : 0}
      onMouseEnter={toggleIsCardHover(true)}
      onMouseLeave={toggleIsCardHover(false)}
    >
      {isFetchingPosts
        ? <Skeleton className={styles.media} animation="wave" variant="rectangular"/>
        : <CardMedia className={styles.media} component='img' image={img as string} alt={title}/>}
      <CardContent className={styles.content}>
        {isFetchingPosts
          ? <h3><Skeleton animation="wave" width={'80%'}/></h3>
          : <h4 className={styles.title}>{title}</h4>}
        {isFetchingPosts
          ? [1, 2, 3].map(() => <Skeleton animation="wave"/>)
          : <p className={styles.description}>{description}</p>}
      </CardContent>
      {isFetchingPosts
        ? <Skeleton animation="wave" sx={{width: '35%', height: '3rem', marginLeft: '1rem'}} />
        : <Button
          onClick={handleRedirect}
          className={styles.button}
          endIcon={<OrderIcon className={styles.arrow}/>}
        >
          Learn More
        </Button>}
    </Card>
  )
}
