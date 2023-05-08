import React, { forwardRef, KeyboardEvent, MouseEvent } from 'react'
import styles from './Info.module.scss'
import { InfoComponent, InfoDrawerComponent } from './types'
import Avatar from './Avatar/Avatar'
import Skills from './Skills/Skills'
import { EXTRA_SKILLS, LANGUAGES, SKILLS } from '../../constants/personalInfo'
import { Button, SwipeableDrawer, useMediaQuery } from '@mui/material'
import { DownloadIcon } from '../Custom/Icons'
import cv from '../../assets/cv.pdf'
import { Tooltip } from '../Custom/Tooltip'
import classnames from 'classnames'

export const Info: InfoComponent = forwardRef(({ isOpen, toggleInfo, isFixed }, ref) => {
  const isTabletOrMobile = useMediaQuery('(max-width: 1023px)')
  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    toggleInfo(open)
  }

  const closeDrawer = () => {
    toggleInfo(false)
  }

  return (
    <>
      {isTabletOrMobile ? (
        <SwipeableDrawer
          open={isOpen}
          anchor={'left'}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          className={styles.mobile}
        >
          <InfoDrawer isFixed={isFixed} closeDrawer={closeDrawer} />
        </SwipeableDrawer>
      ) : (
        <InfoDrawer isFixed={isFixed} className={styles.fullScreen} ref={ref} />
      )}
    </>
  )
})

export default Info

export const InfoDrawer: InfoDrawerComponent = forwardRef(({ isFixed, closeDrawer, className }, ref) => {
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
