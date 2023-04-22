import React, { useEffect, useState } from 'react'
import styles from './Recommendations.module.scss'
import { RecommendationsComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { RECOMMENDATIONS } from '../../../constants/personalInfo'
import { CarouselProvider, DotGroup } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { MOBILE_SIZE } from 'src/constants/settings'
import SliderContent from './SliderContent'
import DynamicCSS from '../../Custom/DynamicCSS/DynamicCSS'


export const Recommendations: RecommendationsComponent = () => {
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
    <section className={styles.recommendations}>
      <DynamicCSS properties={[{ value: RECOMMENDATIONS.length, prop: 'recommendation-count' }]}/>
      <SectionHeader title={'Recommendations'}
                     introduction={'All recommendations are real and left in LinkedIn by my colleagues ' +
                     'or managers with whom I have worked before. You can see the original recommendation ' +
                     'by clicking on the preview.'}/>
      <main className={styles.main}>
        <CarouselProvider
          isIntrinsicHeight
          visibleSlides={countOfSlide}
          totalSlides={RECOMMENDATIONS.length}
          naturalSlideWidth={310}
          naturalSlideHeight={323}
          currentSlide={0}
        >
          <SliderContent widthOfWindow={widthOfWindow}/>
          <DotGroup className={styles.dots}/>
        </CarouselProvider>
      </main>
    </section>
  )
}

export default Recommendations
