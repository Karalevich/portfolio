import React from 'react'
import styles from './EducationPreview.module.scss'
import { EducationItemComponent, EducationPreviewComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { Box } from '@mui/material'
import { EDUCATION_HISTORY } from 'src/constants/personalInfo'

export const EducationPreview: EducationPreviewComponent = () => {
  const educationList = EDUCATION_HISTORY.map((educ) => <EducationItem key={educ.name} {...educ} />)
  return (
    <section className={styles.educationPreview}>
      <SectionHeader
        title={'Education'}
        introduction={`I graduated from the Belarusian National  Technical University 
      and got an engineering diploma with a bachelor's degree, which gave me a good base in Math and Computer Science.`}
      />
      <Box className={styles.wrapper}>
        <ul className={styles.list}>{educationList}</ul>
      </Box>
    </section>
  )
}

export default EducationPreview

const EducationItem: EducationItemComponent = ({ name, occupation, date, document, description }) => {
  return (
    <li className={styles.item}>
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
