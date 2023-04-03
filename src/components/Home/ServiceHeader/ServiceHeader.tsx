import React from 'react'
import styles from './ServiceHeader.module.scss'
import { ServiceHeaderComponent } from './types'


export const ServiceHeader: ServiceHeaderComponent = ({title, introduction}) => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.introduction}>
        {introduction}
      </p>
    </header>
  )
}

export default ServiceHeader