import React from 'react'
import styles from './EducationPreview.module.scss'
import { EducationItemComponent, EducationPreviewComponent } from './types'
import ServiceHeader from '../ServiceHeader/ServiceHeader'
import { Box } from '@mui/material'
import { EDUCATION_HISTORY } from 'src/constants/personalInfo'


export const EducationPreview: EducationPreviewComponent = () => {
  const educationList = EDUCATION_HISTORY.map(educ => <EducationItem key={educ.name} {...educ}/>)
  return (
    <section className={styles.educationPreview}>
      <ServiceHeader title={'Education'} introduction={`I graduated from the Belarusian National  Technical University 
      and got an engineering diploma with a bachelor's degree, which gave me a good base in Math and Computer Science.`}/>
      <Box sx={{
        backgroundColor: 'white',
        padding: '5vh 2.43vw',
        borderRadius: '2px',
      }}>
        <ul>
          {educationList}
        </ul>

      </Box>
    </section>
  )
}

export default EducationPreview

const EducationItem: EducationItemComponent = ({ name, occupation, date, document, description }) => {
  return (
    <li className={styles.item}>
      <header className={styles.spec}>
        <h4>{name}</h4>
        <div className={styles.spec}>
          <span className={styles.occupation}>{occupation}</span>
          <span className={styles.date}>{date}</span>
        </div>
      </header>
      <main className={styles.main}>
        <h4>{document}</h4>
        <p>{description}</p>
      </main>

    </li>
  )
}