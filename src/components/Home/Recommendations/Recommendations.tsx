import React, { useState } from 'react'
import styles from './Recommendations.module.scss'
import { RecommendationComponent, RecommendationsComponent } from './types'
import ServiceHeader from '../ServiceHeader/ServiceHeader'
import Card from '@mui/material/Card/Card'
import { linkedInRecommendations, RECOMMENDATIONS } from '../../../constants/personalInfo'
import { CarouselProvider, DotGroup, Slide, Slider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { StarIcon } from 'src/components/Custom/Icons'
import { Avatar, Button } from '@mui/material'
import MovingIcon from '@mui/icons-material/Moving';


export const Recommendations: RecommendationsComponent = () => {
  const recommendations = RECOMMENDATIONS.map((rec, index) => <Recommendation key={rec.title} {...rec} index={index}/>)
  return (
    <section className={styles.recommendations}>
      <ServiceHeader title={'Recommendations'}
                     introduction={'All recommendations are real and left in LinkedIn by my colleagues ' +
                     'or managers with whom I have worked before. You can see the original recommendation ' +
                     'by clicking on the preview.'}/>
      <main>
        <CarouselProvider
          visibleSlides={3}
          totalSlides={RECOMMENDATIONS.length}
          step={2}
          naturalSlideWidth={310}
          naturalSlideHeight={323}
          currentSlide={0}
        >
          <Slider>
            {recommendations}
          </Slider>
          <DotGroup className={styles.dots}/>
        </CarouselProvider>
      </main>
    </section>
  )
}

const Recommendation: RecommendationComponent = ({ index, title, author, occupation, description, image }) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(<StarIcon className={styles.star} key={i}/>)
  }


  return (
    <Slide index={index || 0}>
      <Card className={styles.card} elevation={0}>
        <header>
          <ul className={styles.stars}>
            {stars}
          </ul>
          <h4 className={styles.title}>{title}</h4>
        </header>
        <main>
          <p className={styles.description}>{description}</p>
        </main>
        <footer className={styles.footer}>
          <Avatar className={styles.avatar} alt={author} src={image}/>
          <div className={styles.info}>
            <h4>{author}</h4><p>{occupation}</p>
          </div>
        </footer>
        <div className={styles.redirect}>
                <a href={linkedInRecommendations} target="_blank">
          <Button className={styles.linkedin} variant="outlined" endIcon={<MovingIcon/>}>
            Read on LinkedIn
          </Button>
      </a>
        </div>
      </Card>
    </Slide>
  )
}

export default Recommendations