import { HomeComponent } from './types'
import styles from './Home.module.scss'
import Banner from './Banner/Banner'
import React from 'react'
import ServicesPreview from './SrvicesPreview/ServicesPreview'
import Price from './Price/Price'
import Recommendations from './Recommendations/Recommendations'
import WorkPreview from './WorkPreview/WorkPreview'
import EducationPreview from './EducationPreview/EducationPreview'


export const Home: HomeComponent = () => {
  return (
    <section className={styles.home}>
      <Banner/>
      <ServicesPreview/>
      <Price/>
      <Recommendations/>
      <WorkPreview/>
      <EducationPreview/>
    </section>
  )
}

export default Home