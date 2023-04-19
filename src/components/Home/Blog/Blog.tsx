import React, { useEffect, useState } from 'react'
import styles from './Blog.module.scss'
import { BlogComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { ButtonBack, ButtonNext, CarouselProvider } from 'pure-react-carousel'
import { POSTS } from 'src/constants/personalInfo'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { MOBILE_SIZE } from '../../../constants/settings'
import { DynamicCSSComponent } from '../Recommendations/types'
import Posts from './Posts'


export const Blog: BlogComponent = () => {
  const [countOfSlide, setCountOfSlide] = useState(3)
  const [widthOfWindow, setWidthOfWindow] = useState(0)

  const setSettingsOfSlide = () => {
    const innerWidth = window.innerWidth
    setWidthOfWindow(innerWidth)
    if (innerWidth < MOBILE_SIZE && (widthOfWindow >= MOBILE_SIZE || widthOfWindow === 0)) {
      setCountOfSlide(1)
    } else if (innerWidth >= MOBILE_SIZE && widthOfWindow < MOBILE_SIZE) {
      setCountOfSlide(3)
    }
  }


  useEffect(() => {
    setSettingsOfSlide()
    window.addEventListener('resize', setSettingsOfSlide)
    return () => window.removeEventListener('resize', setSettingsOfSlide)
  }, [widthOfWindow])

  return (
    <section className={styles.blog}>
      <DynamicCSS slideCount={POSTS.length} />
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
          <Posts widthOfWindow={widthOfWindow}/>
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


const DynamicCSS: DynamicCSSComponent = ({ slideCount }) => {
  const css = `:root { --posts-count: ${slideCount}; }`

  return (
    <style>
      {css}
    </style>
  )
}
