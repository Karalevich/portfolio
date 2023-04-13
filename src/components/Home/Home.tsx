import { HomeComponent } from './types'
import styles from './Home.module.scss'
import Banner from './Banner/Banner'
import React from 'react'
import ServicesPreview from './SrvicesPreview/ServicesPreview'
import Price from './Price/Price'
import Recommendations from './Recommendations/Recommendations'
import WorkPreview from './WorkPreview/WorkPreview'
import EducationPreview from './EducationPreview/EducationPreview'
import Portfolio from './Portfolio/Portfolio'
import Blog from './Blog/Blog'
import Contact from './Contact/Contact'
import Map from './Map/Map'


export const Home: HomeComponent = () => {
  return (
    <section className={styles.home}>
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
      <cite className={styles.copyright}>
        <p className={styles.text}>Copyright © 2023 Portfolio Andrei Karalevich</p>
      </cite>
    </section>
  )
}

export default Home