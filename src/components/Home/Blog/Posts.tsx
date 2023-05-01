import React, { Fragment, useContext, useEffect, useState } from 'react'

import { CarouselContext, Slide, Slider } from 'pure-react-carousel'
import { OrderIcon } from '../../Custom/Icons'
import Card from '@mui/material/Card/Card'
import { Button, CardContent, CardMedia } from '@mui/material'
import { POSTS } from '../../../constants/personalInfo'
import classnames from 'classnames'
import styles from './Blog.module.scss'
import { PostCardComponent, PostsContent } from './types'
import { useNavigate } from 'react-router-dom'


const Posts: PostsContent = ({ isTabletOrMobile, isFullVersion }) => {
  const carouselContext = useContext(CarouselContext)
  const [currentSlide, setCurrentSlide] = useState(carouselContext?.state?.currentSlide)

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide)
    }

    carouselContext?.subscribe(onChange)
    return () => carouselContext?.unsubscribe(onChange)
  }, [])


  const posts = POSTS.map((props, index) => {
    return (<Fragment key={props.id}>
        {isFullVersion
          ? <PostCard {...props}/>
          : <Slide index={index || 0} innerClassName={styles.innerSlide}>
            <PostCard {...props}/>
          </Slide>}
      </Fragment>
    )
  })


  return (
    <>
      {isFullVersion
        ? posts
        : <Slider
          classNameAnimation={classnames({
            [styles.lastSlide]: currentSlide === POSTS.length - 1,
            [styles.sliderTray]: isTabletOrMobile,
          })}>
          {posts}
        </Slider>}
    </>

  )
}
export default Posts

const PostCard: PostCardComponent = ({ img, title, description,id }) => {
  const [isCardHover, setIsCardHover] = useState(false)
  const redirect = useNavigate()

  const handleRedirect = () => {
    redirect(`/post/${id}`)
  }

  const toggleIsCardHover = (value: boolean) => () => {
    setIsCardHover(value)
  }
  return (
    <Card className={styles.card} elevation={isCardHover ? 2 : 0} onMouseEnter={toggleIsCardHover(true)}
          onMouseLeave={toggleIsCardHover(false)}>
      <CardMedia className={styles.media} component="img" image={img} alt={title}/>
      <CardContent className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </CardContent>
      <Button onClick={handleRedirect} className={styles.button} endIcon={<OrderIcon className={styles.arrow}/>}>
        Learn More
      </Button>
    </Card>
  )
}
