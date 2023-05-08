import React, { useState, KeyboardEvent, MouseEvent } from 'react'
import styles from './Navbar.module.scss'
import { NavComponent } from './types'
import { SwipeableDrawer, useMediaQuery } from '@mui/material'
import DynamicCSS from '../Custom/DynamicCSS/DynamicCSS'
import { CSSProp } from '../Custom/DynamicCSS/types'
import { DARK, LIGHT } from 'src/constants/settings'
import NavTabs from './NavTabs/NavTabs'

export const Nav: NavComponent = ({ toggleNav, isOpen }) => {
  const [theme, setTheme] = useState<Array<CSSProp>>(LIGHT)
  const [isLightTheme, setIsLightTheme] = useState(true)
  const isTabletOrMobile = useMediaQuery('(max-width: 1023px)')

  const handleSwitchTheme = () => {
    setIsLightTheme(!isLightTheme)
    if (isLightTheme) {
      setTheme(DARK)
    } else {
      setTheme(LIGHT)
    }
  }
  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    toggleNav(open)
  }

  const closeDrawer = () => {
    toggleNav(false)
  }

  return (
    <>
      <DynamicCSS properties={theme} />
      {isTabletOrMobile ? (
        <SwipeableDrawer
          open={isOpen}
          anchor={'right'}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          className={styles.mobile}
        >
          <NavTabs
            handleSwitchTheme={handleSwitchTheme}
            closeDrawer={closeDrawer}
            isLightTheme={isLightTheme}
          />
        </SwipeableDrawer>
      ) : (
        <NavTabs
          handleSwitchTheme={handleSwitchTheme}
          className={styles.fullScreen}
          isLightTheme={isLightTheme}
        />
      )}
    </>
  )
}

export default Nav
