import React from 'react'
import styles from './Blog.module.scss'
import { BlogComponent, PostContent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel'
import Card from '@mui/material/Card/Card'
import { POSTS } from 'src/constants/personalInfo'
import { Button, CardContent, CardMedia } from '@mui/material'
import { OrderIcon } from '../../Custom/Icons'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const Blog: BlogComponent = () => {
  const posts = POSTS.map((post, index) => <Post key={post.title} index={index} {...post} />)
  return (
    <section className={styles.blog}>
      <SectionHeader title={'Blog'}
                     introduction={`I like to share my experience and knowledge, that\`s why I decided to create my own small blog.`}/>
      <main className={styles.main}>
        <CarouselProvider
          visibleSlides={3}
          totalSlides={POSTS.length}
          step={1}
          naturalSlideWidth={310}
          naturalSlideHeight={474}
          currentSlide={0}
        >
          <Slider>
            {posts}
          </Slider>
          <ButtonBack className={styles.buttonBack}><ArrowBackIosNewIcon fontSize={'inherit'}/></ButtonBack>
          <ButtonNext className={styles.buttonNext}><ArrowForwardIosIcon fontSize={'inherit'}/></ButtonNext>
        </CarouselProvider>
      </main>
    </section>
  )
}

export default Blog

const Post: PostContent = ({ index, img, title, description }) => {

  return (
    <Slide index={index || 0}>
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
  )
}
