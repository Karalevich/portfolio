import React, { Fragment, useContext, useEffect, useState } from 'react'

import { CarouselContext, Slide, Slider } from 'pure-react-carousel'
import { OrderIcon } from '../../Custom/Icons'
import Card from '@mui/material/Card/Card'
import { Button, CardContent, CardMedia } from '@mui/material'
import { POSTS } from '../../../constants/personalInfo'
import classnames from 'classnames'
import styles from './Blog.module.scss'
import { PostComponent, PostsContent } from './types'


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


  const posts = POSTS.map(({ img, title, description }, index) => {
    return (<Fragment key={title}>
        {isFullVersion
          ? <Post img={img} title={title} description={description}/>
          : <Slide index={index || 0} innerClassName={styles.innerSlide}>
            <Post img={img} title={title} description={description}/>
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

const Post: PostComponent = ({ img, title, description }) => {
  return (
    <Card className={styles.card} elevation={0}>
      <CardMedia className={styles.media} component="img" image={img} alt={title}/>
      <CardContent className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </CardContent>
      <Button className={styles.button} endIcon={<OrderIcon className={styles.arrow}/>}>
        Learn More
      </Button>
    </Card>
  )
}
