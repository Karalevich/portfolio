import React, { forwardRef } from 'react'
import { useAppDispatch } from '../../../hooks/hooks'
import cv from '../../../assets/Andrei_Karalevich_CV.pdf'
import { notistackActions } from '../../../actions/notistackAction'
import classnames from 'classnames'
import styles from './InfoDrawer.module.scss'
import Avatar from '../Avatar/Avatar'
import Skills from '../Skills/Skills'
import { EXTRA_SKILLS, LANGUAGES, SKILLS } from '../../../constants/personalInfo'
import { Tooltip } from '../../Custom/Tooltip'
import { Button } from '@mui/material'
import { DownloadIcon } from '../../Custom/Icons'
import { InfoDrawerComponent } from './types'

const InfoDrawer: InfoDrawerComponent = forwardRef(({ isFixed, closeDrawer, className }, ref) => {
  const dispatch = useAppDispatch()

  const onClickHandler = async () => {
    const response = await fetch(cv)
    const blob = await response.blob()

    const fileURL = window.URL.createObjectURL(blob)
    let alink = document.createElement('a')
    alink.href = fileURL
    alink.download = 'Andrei_Karalevich_CV.pdf'
    alink.click()
    dispatch(
      notistackActions.enqueueSnackbarAC({
        message: 'Resume successfully downloaded',
        options: {
          variant: 'success',
        },
      })
    )
  }

  return (
    <aside
      ref={ref}
      className={classnames({
        [styles.infoFixed]: isFixed,
        [styles.infoAbsolute]: !isFixed,
        [`${className}`]: className,
      })}
    >
      <Avatar />
      <Skills title={'Languages'} skills={LANGUAGES} isProgressBar={true} />
      <Skills title={'Skills'} skills={SKILLS} isProgressBar={true} />
      <Skills title={'Extra Skills'} skills={EXTRA_SKILLS} isProgressBar={false} />
      <Tooltip title={'Wish download my resume in pdf format?'} placement={'top'}>
        <Button
          onClick={onClickHandler}
          variant='contained'
          className={styles.download}
          endIcon={<DownloadIcon />}
        >
          Download CV
        </Button>
      </Tooltip>
    </aside>
  )
})

export default InfoDrawer
