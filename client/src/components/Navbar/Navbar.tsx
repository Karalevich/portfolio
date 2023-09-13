import React, { useState, KeyboardEvent, MouseEvent } from 'react'
import styles from './Navbar.module.scss'
import { NavComponent } from './types'
import { Drawer, useMediaQuery } from '@mui/material'
import DynamicCSS from '../Custom/DynamicCSS/DynamicCSS'
import { CSSProp } from '../Custom/DynamicCSS/types'
import { DARK, LIGHT } from 'src/constants/settings'
import NavTabs from './NavTabs/NavTabs'
import { useAppDispatch } from '../../hooks/hooks'
import { notistackActions } from '../../actions/notistackAction'

const Nav: NavComponent = ({ toggleNav, isOpen }) => {
  const [theme, setTheme] = useState<Array<CSSProp>>(LIGHT)
  const [isLightTheme, setIsLightTheme] = useState(true)
  const isTabletOrMobile = useMediaQuery('(max-width: 1023px)')
  const dispatch = useAppDispatch()

  const handleSwitchTheme = () => {
    setIsLightTheme(!isLightTheme)
    dispatch(
      notistackActions.enqueueSnackbarAC({
        message: 'Theme successfully changed',
        options: {
          variant: 'success',
        },
      })
    )
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
        <Drawer open={isOpen} anchor={'right'} onClose={toggleDrawer(false)} className={styles.mobile}>
          <NavTabs
            handleSwitchTheme={handleSwitchTheme}
            closeDrawer={closeDrawer}
            isLightTheme={isLightTheme}
          />
        </Drawer>
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
