import React from 'react'
import styles from './Recommendations.module.scss'
import { RecommendationsComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { RECOMMENDATIONS } from '../../../constants/personalInfo'
import { CarouselProvider, DotGroup } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import SliderContent from './SliderContent/SliderContent'
import DynamicCSS from '../../Custom/DynamicCSS/DynamicCSS'
import { useMediaQuery } from '@mui/material'

export const Recommendations: RecommendationsComponent = () => {
  const isTabletOrMobile = useMediaQuery('(max-width:767px)')
  const countOfSlide = isTabletOrMobile ? 1 : 3

  return (
    <section className={styles.recommendations}>
      <DynamicCSS properties={[{ value: RECOMMENDATIONS.length, prop: 'recommendation-count' }]} />
      <SectionHeader
        title={'Recommendations'}
        introduction={
          'All recommendations are real and left in LinkedIn by my colleagues ' +
          'or managers with whom I have worked before. You can see the original recommendation ' +
          'by clicking on the preview.'
        }
      />
      <main className={styles.main}>
        <CarouselProvider
          isIntrinsicHeight
          visibleSlides={countOfSlide}
          totalSlides={RECOMMENDATIONS.length}
          naturalSlideWidth={310}
          naturalSlideHeight={323}
          currentSlide={0}
        >
          <SliderContent isTabletOrMobile={isTabletOrMobile} />
          <DotGroup className={styles.dots} />
        </CarouselProvider>
      </main>
    </section>
  )
}

export default Recommendations
