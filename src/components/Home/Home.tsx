import { HomeComponent } from './types'
import styles from './Home.module.scss'
import Banner from './Banner/Banner'
import React from 'react'
import ServicesPreview from './SrvicesPreview/ServicesPreview'


export const Home: HomeComponent = () => {
  return (
    <section className={styles.home}>
      <Banner/>
      <ServicesPreview/>
    </section>
  )
}

export default Home