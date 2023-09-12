import React, { forwardRef, KeyboardEvent, MouseEvent } from 'react'
import styles from './Info.module.scss'
import { InfoComponent } from './types'
import { Drawer, useMediaQuery } from '@mui/material'
import InfoDrawer from './InfoDrawer/InfoDrawer'

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
        <Drawer open={isOpen} anchor={'left'} onClose={toggleDrawer(false)} className={styles.mobile}>
          <InfoDrawer isFixed={isFixed} closeDrawer={closeDrawer} />
        </Drawer>
      ) : (
        <InfoDrawer isFixed={isFixed} className={styles.fullScreen} ref={ref} />
      )}
    </>
  )
})

export default Info
