import styles from './Blog.module.scss'
import '../../AminatedRoutes/AnimatedRoutes.scss'
import { BlogComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { ButtonBack, ButtonNext, CarouselProvider } from 'pure-react-carousel'
import { POSTS } from 'src/constants/personalInfo'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Posts from './Posts'
import DynamicCSS from 'src/components/Custom/DynamicCSS/DynamicCSS'
import { useMediaQuery } from '@mui/material'
import classnames from 'classnames'
import Filter from './Filter/Filter'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const Blog: BlogComponent = ({ isFullVersion }) => {
  const isTabletOrMobile = useMediaQuery('(max-width:767px)')
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransistionStage] = useState('fadeIn')
  const countOfSlide = isTabletOrMobile ? 1 : 3
  const step = isTabletOrMobile ? 1 : 2

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage('fadeOut')
  }, [location, displayLocation])


  return (
    <section className={styles.blog}>
      <DynamicCSS properties={[{ value: POSTS.length, prop: 'posts-count' }]}/>
      <SectionHeader title={'Blog'}
                     introduction={`I like to share my experience and knowledge, that is why I decided to create my own small blog.`}/>
      {isFullVersion && <Filter/>}
      <div
        className={`${transitionStage}`}
        onAnimationEnd={() => {
          if (transitionStage === 'fadeOut') {
            setTransistionStage('fadeIn')
            setDisplayLocation(location)
          }
        }}
      >
        <main className={classnames(styles.main, { [styles.fullMain]: isFullVersion })}>
          {isFullVersion
            ? <Posts isTabletOrMobile={isTabletOrMobile} isFullVersion/>
            : <CarouselProvider
              isIntrinsicHeight
              visibleSlides={countOfSlide}
              totalSlides={POSTS.length}
              step={step}
              naturalSlideWidth={310}
              naturalSlideHeight={440}
              currentSlide={0}
            >
              <Posts isTabletOrMobile={isTabletOrMobile} isFullVersion={false}/>
              <ButtonBack className={styles.buttonBack}>
                <ArrowBackIosNewIcon color={'secondary'} fontSize={'inherit'}/>
              </ButtonBack>
              <ButtonNext className={styles.buttonNext}>
                <ArrowForwardIosIcon color={'secondary'} fontSize={'inherit'}/>
              </ButtonNext>
            </CarouselProvider>}

        </main>
      </div>
    </section>

  )
}

export default Blog

