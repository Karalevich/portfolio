import React, { useEffect, useState } from 'react'
import styles from './Blog.module.scss'
import { BlogComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { ButtonBack, ButtonNext, CarouselProvider } from 'pure-react-carousel'
import { POSTS } from 'src/constants/personalInfo'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Posts from './Posts'
import DynamicCSS from 'src/components/Custom/DynamicCSS/DynamicCSS'
import { useMediaQuery } from '@mui/material'


export const Blog: BlogComponent = () => {
  const [countOfSlide, setCountOfSlide] = useState(3)
  const isTabletOrMobile = useMediaQuery('(max-width:767px)')

  useEffect(() => {
    if (isTabletOrMobile) {
      setCountOfSlide(1)
    } else {
      setCountOfSlide(3)
    }
  }, [isTabletOrMobile])


  return (
    <section className={styles.blog}>
      <DynamicCSS properties={[{ value: POSTS.length, prop: 'posts-count' }]}/>
      <SectionHeader title={'Blog'}
                     introduction={`I like to share my experience and knowledge, that\`s why I decided to create my own small blog.`}/>
      <main className={styles.main}>
        <CarouselProvider
          isIntrinsicHeight
          visibleSlides={countOfSlide}
          totalSlides={POSTS.length}
          step={1}
          naturalSlideWidth={310}
          naturalSlideHeight={440}
          currentSlide={0}
        >
          <Posts isTabletOrMobile={isTabletOrMobile}/>
          <ButtonBack className={styles.buttonBack}>
            <ArrowBackIosNewIcon color={'secondary'} fontSize={'inherit'}/>
          </ButtonBack>
          <ButtonNext className={styles.buttonNext}>
            <ArrowForwardIosIcon color={'secondary'} fontSize={'inherit'}/>
          </ButtonNext>
        </CarouselProvider>
      </main>
    </section>
  )
}

export default Blog
