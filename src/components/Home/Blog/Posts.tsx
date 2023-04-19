import React, { useContext, useEffect, useState } from 'react'

import { CarouselContext, Slide, Slider } from 'pure-react-carousel'
import { OrderIcon } from '../../Custom/Icons'
import Card from '@mui/material/Card/Card'
import { Button, CardContent, CardMedia } from '@mui/material'
import { POSTS } from '../../../constants/personalInfo'
import classnames from 'classnames'
import { MOBILE_SIZE } from '../../../constants/settings'
import styles from './Blog.module.scss'
import { PostsContent } from './types'


const Posts: PostsContent = ({ widthOfWindow }) => {
  const carouselContext = useContext(CarouselContext)
  const [currentSlide, setCurrentSlide] = useState(carouselContext?.state?.currentSlide)
  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide)
    }

    carouselContext?.subscribe(onChange)
    window.addEventListener('resize', onChange)
    return () => {
      carouselContext?.unsubscribe(onChange)
      window.removeEventListener('resize', onChange)
    }

  }, [carouselContext])


  const recommendations = POSTS.map(({ img, title, description }, index) => (
    <Slide key={title} index={index || 0} innerClassName={styles.innerSlide}>
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
    </Slide>
  ))


  return (
    <Slider
      classNameAnimation={classnames({
        [styles.lastSlide]: currentSlide === POSTS.length - 1,
        [styles.sliderTray]: widthOfWindow < MOBILE_SIZE,
      })}>
      {recommendations}
    </Slider>

  )
}
export default Posts
