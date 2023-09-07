import React from 'react'
import styles from './EducationPreview.module.scss'
import { EducationPreviewComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { Box } from '@mui/material'
import { EDUCATION_HISTORY } from 'src/constants/personalInfo'
import EducationItem from './EducationItem/EducationItem'

export const EducationPreview: EducationPreviewComponent = () => {
  return (
    <section className={styles.educationPreview}>
      <SectionHeader
        title={'Education'}
        introduction={`I graduated from the Belarusian National  Technical University 
      and got an engineering diploma with a bachelor's degree, which gave me a good base in Math and Computer Science.`}
      />
      <Box className={styles.wrapper}>
        <ul className={styles.list}>
          {EDUCATION_HISTORY.map((educ) => (
            <EducationItem key={educ.name} {...educ} />
          ))}
        </ul>
      </Box>
    </section>
  )
}

export default EducationPreview
