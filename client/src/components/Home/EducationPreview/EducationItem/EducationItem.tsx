import styles from './EducationItem.module.scss'
import React from 'react'
import { EducationItemComponent } from './types'

const EducationItem: EducationItemComponent = ({ name, occupation, date, document, description }) => {
  return (
    <li className={styles.item} aria-label='education-item'>
      <header className={styles.header}>
        <h6 className={styles.title}>{name}</h6>
        <div className={styles.spec}>
          <span className={styles.occupation}>{occupation}</span>
          <span className={styles.date}>{date}</span>
        </div>
      </header>
      <main className={styles.main}>
        <h4 className={styles.title}>{document}</h4>
        <p className={styles.description}>{description}</p>
      </main>
    </li>
  )
}

export default EducationItem
