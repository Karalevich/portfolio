import { useEffect } from 'react'
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
import { ROUTES_ANIMATIONS } from '../../AminatedRoutes/types'

export const Blog: BlogComponent = ({ isFullVersion }) => {
  const isTabletOrMobile = useMediaQuery('(max-width:767px)')
  const countOfSlide = isTabletOrMobile ? 1 : 3
  const step = isTabletOrMobile ? 1 : 2

  useEffect(() => {
    /* find wrapper that use around all routes and add animation during changing routes*/
    const fadeIn = document.querySelector(`.${ROUTES_ANIMATIONS.FADE_IN}`) as HTMLDivElement

    const animationHandler = (event: AnimationEvent) => {
      if (event.animationName === ROUTES_ANIMATIONS.FADE_IN) {
        /* delete class that added animation in Blog pare after it finished. The problem that this class block styles for filter that has sticky position */
        fadeIn?.classList.remove( ROUTES_ANIMATIONS.FADE_IN)
      }
    }

    if (isFullVersion) {
      fadeIn?.addEventListener('animationend', animationHandler)
    }

    return () => fadeIn?.removeEventListener('animationend', animationHandler)
  }, [isFullVersion])


  return (
    <section className={styles.blog}>
      <DynamicCSS properties={[{ value: POSTS.length, prop: 'posts-count' }]}/>
      <SectionHeader title={'Blog'}
                     introduction={`I like to share my experience and knowledge, that is why I decided to create my own small blog.`}/>
      {isFullVersion && <Filter/>}
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
    </section>

  )
}

export default Blog

