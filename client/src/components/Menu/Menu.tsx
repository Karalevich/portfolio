import React from 'react'
import styles from './Menu.module.scss'
import { MenuComponent } from './types'
import MenuIcon from '@mui/icons-material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material'

export const Menu: MenuComponent = ({ toggleNav, toggleInfo }) => {
  const openNav = () => {
    toggleNav(true)
  }

  const openInfo = () => {
    toggleInfo(true)
  }

  return (
    <header className={styles.menu}>
      <IconButton onClick={openInfo} className={styles.icon} aria-label='MenuIcon'>
        <MenuIcon />
      </IconButton>
      <IconButton onClick={openNav} className={styles.icon} aria-label='MoreVertIcon'>
        <MoreVertIcon />
      </IconButton>
    </header>
  )
}

export default Menu
