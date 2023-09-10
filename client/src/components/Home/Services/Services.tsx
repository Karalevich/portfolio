import React from 'react'
import styles from './Services.module.scss'
import { ServicesComponent } from './types'
import { SERVICES } from 'src/constants/personalInfo'
import SectionHeader from '../SectionHeader/SectionHeader'
import Service from './Service/Service'

export const Services: ServicesComponent = () => {
  const serviceList = []
  for (const [key, value] of Object.entries(SERVICES)) {
    serviceList.push(<Service title={key} {...value} key={key} />)
  }

  return (
    <section className={styles.services}>
      <SectionHeader
        title={'My Services'}
        introduction={`Based on commercial experience with a wide range of diverse projects and a constant desire to learn and
           master new technologies, I provide the following services`}
      />
      <main>
        <ul className={styles.list}>{serviceList}</ul>
      </main>
    </section>
  )
}

export default Services
