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
    </section>
  )
}

export default Home