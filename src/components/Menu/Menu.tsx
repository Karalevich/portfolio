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
      <IconButton onClick={openInfo}><MenuIcon/></IconButton>
      <IconButton onClick={openNav}><MoreVertIcon/></IconButton>
    </header>
  )
}

export default Menu