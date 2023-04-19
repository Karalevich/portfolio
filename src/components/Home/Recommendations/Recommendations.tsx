import React, { useEffect, useState } from 'react'
import styles from './Recommendations.module.scss'
import { DynamicCSSComponent, RecommendationsComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { RECOMMENDATIONS } from '../../../constants/personalInfo'
import { CarouselProvider, DotGroup } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { MOBILE_SIZE } from 'src/constants/settings'
import SliderContent from './SliderContent'


export const Recommendations: RecommendationsComponent = () => {
  const [countOfSlide, setCountOfSlide] = useState(3)
  const [countOfStep, setCountOfStep] = useState(2)
  const [widthOfWindow, setWidthOfWindow] = useState(0)

  const setSettingsOfSlide = () => {
    const innerWidth = window.innerWidth
    setWidthOfWindow(innerWidth)
    if (innerWidth < MOBILE_SIZE && widthOfWindow >= MOBILE_SIZE) {
      setCountOfSlide(1)
      setCountOfStep(1)
    }else if(innerWidth >= MOBILE_SIZE && widthOfWindow < MOBILE_SIZE){
      setCountOfSlide(3)
      setCountOfStep(2)
    }
  }


  useEffect(() => {
    setSettingsOfSlide()
    window.addEventListener('resize', setSettingsOfSlide)
    return () => window.removeEventListener('resize', setSettingsOfSlide)
  }, [widthOfWindow])


  return (
    <section className={styles.recommendations}>
      <DynamicCSS slideCount={RECOMMENDATIONS.length} windowWidth={widthOfWindow}/>
      <SectionHeader title={'Recommendations'}
                     introduction={'All recommendations are real and left in LinkedIn by my colleagues ' +
                     'or managers with whom I have worked before. You can see the original recommendation ' +
                     'by clicking on the preview.'}/>
      <main className={styles.main}>
        <CarouselProvider
          isIntrinsicHeight
          visibleSlides={countOfSlide}
          totalSlides={RECOMMENDATIONS.length}
          step={countOfStep}
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


const DynamicCSS: DynamicCSSComponent = ({ slideCount, windowWidth }) => {
  const windowWidthRm = (windowWidth / 12).toFixed(2)
  const css = `:root { --slide-count: ${slideCount}; --window-width: ${windowWidthRm} }`

  return (
    <style>
      {css}
    </style>
  )
}

