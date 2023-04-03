import React from 'react'
import styles from './Recommendations.module.scss'
import { RecommendationsComponent } from './types'
import ServiceHeader from '../ServiceHeader/ServiceHeader'


export const Recommendations: RecommendationsComponent = () => {
  return (
     <section className={styles.recommendations}>
      <ServiceHeader title={'Recommendations'}
                     introduction={''}/>
      <main>

      </main>
    </section>
  )
}

export default Recommendations