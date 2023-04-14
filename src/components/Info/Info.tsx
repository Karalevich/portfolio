import React, { forwardRef } from 'react'
import styles from './Info.module.scss'
import { InfoComponent } from './types'
import Avatar from './Avatar/Avatar'
import Skills from './Skills/Skills'
import { EXTRA_SKILLS, LANGUAGES, SKILLS } from '../../constants/personalInfo'
import { Button } from '@mui/material'
import { DownloadIcon } from '../Custom/Icons'
import cv from '../../assets/cv.pdf'
import { Tooltip } from '../Custom/Tooltip'


export const Info: InfoComponent = forwardRef(({isFixed, ...other}, ref) => {

  const onClickHandler = async () => {
    const response = await fetch(cv)
    const blob = await response.blob()

    const fileURL = window.URL.createObjectURL(blob)
    let alink = document.createElement('a')
    alink.href = fileURL
    alink.download = cv
    alink.click()
  }
  return (
    <aside className={isFixed ? styles.infoFixed : styles.infoAbsolute} {...other} ref={ref}>
      <Avatar/>
      <Skills title={'Languages'} skills={LANGUAGES} isProgressBar={true}/>
      <Skills title={'Skills'} skills={SKILLS} isProgressBar={true}/>
      <Skills title={'Extra Skills'} skills={EXTRA_SKILLS} isProgressBar={false}/>
      <Tooltip title={'Wish download my resume in pdf format?'} placement={'top'}>
        <Button onClick={onClickHandler} variant="contained" className={styles.download} endIcon={<DownloadIcon/>}>
          Download CV
        </Button>
      </Tooltip>

    </aside>
  )
})

export default Info