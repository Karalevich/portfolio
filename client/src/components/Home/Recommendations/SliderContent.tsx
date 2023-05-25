import React, { ReactElement, useContext, useEffect, useState } from 'react'

import { CarouselContext, Slide, Slider } from 'pure-react-carousel'
import { SliderContentComponent } from './types'
import { StarIcon } from '../../Custom/Icons'
import styles from './Recommendations.module.scss'
import Card from '@mui/material/Card/Card'
import { Avatar, Button } from '@mui/material'
import { linkedInRecommendations, RECOMMENDATIONS } from '../../../constants/personalInfo'
import MovingIcon from '@mui/icons-material/Moving'
import classnames from 'classnames'

const SliderContent: SliderContentComponent = ({ isTabletOrMobile }) => {
  const carouselContext = useContext(CarouselContext)
  const [currentSlide, setCurrentSlide] = useState(carouselContext?.state?.currentSlide)

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide)
    }

    carouselContext?.subscribe(onChange)
    return () => carouselContext?.unsubscribe(onChange)
  }, [])

  const stars: Array<ReactElement> = []
  for (let i = 0; i < 5; i++) {
    stars.push(<StarIcon className={styles.star} key={i} />)
  }
  const recommendations = RECOMMENDATIONS.map(
    ({ title, author, occupation, description, image }, index) => (
      <Slide key={title} index={index || 0} innerClassName={styles.innerSlide}>
        <Card className={styles.card} elevation={0}>
          <header>
            <ul className={styles.stars}>{stars}</ul>
            <h4 className={styles.title}>{title}</h4>
          </header>
          <main>
            <p className={styles.description}>{description}</p>
          </main>
          <footer className={styles.footer}>
            <Avatar className={styles.avatar} alt={author} src={image} />
            <div className={styles.info}>
              <h4 className={styles.author}>{author}</h4>
              <p className={styles.occupation}>{occupation}</p>
            </div>
          </footer>
          <div className={styles.redirect}>
            <a onClick={() => window.open(linkedInRecommendations, '_system')} target='_blank'>
              <Button className={styles.linkedin} variant='outlined' endIcon={<MovingIcon />}>
                Read on LinkedIn
              </Button>
            </a>
          </div>
        </Card>
      </Slide>
    )
  )

  return (
    <Slider
      classNameAnimation={classnames({
        [styles.lastSlide]: currentSlide === RECOMMENDATIONS.length - 1,
        [styles.sliderTray]: isTabletOrMobile,
      })}
    >
      {recommendations}
    </Slider>
  )
}
export default SliderContent
