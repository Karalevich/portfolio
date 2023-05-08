import React from 'react'
import styles from './SectionHeader.module.scss'
import { SectionHeaderComponent } from './types'

export const SectionHeader: SectionHeaderComponent = ({ title, introduction }) => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.introduction}>{introduction}</p>
    </header>
  )
}

export default SectionHeader
