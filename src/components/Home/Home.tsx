import { HomeComponent } from './types'
import styles from './Home.module.scss'
import Banner from './Banner/Banner'
import React, { forwardRef, useEffect } from 'react'
import ServicesPreview from './ServicesPreview/ServicesPreview'
import Price from './Price/Price'
import Recommendations from './Recommendations/Recommendations'
import WorkPreview from './WorkPreview/WorkPreview'
import EducationPreview from './EducationPreview/EducationPreview'
import Portfolio from './Portfolio/Portfolio'
import Blog from './Blog/Blog'
import Contact from './Contact/Contact'
import Map from './Map/Map'


export const Home: HomeComponent = forwardRef((props, ref) => {
  return (
    <section className={styles.home} ref={ref}>
      <Banner/>
      <ServicesPreview/>
      <Price/>
      <Recommendations/>
      <WorkPreview/>
      <EducationPreview/>
      <Portfolio/>
      <Blog/>
      <Contact/>
      <Map/>
    </section>
  )
})

export default Home