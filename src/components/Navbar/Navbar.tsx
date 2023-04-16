import React, { useState, KeyboardEvent, MouseEvent } from 'react'
import styles from './Navbar.module.scss'
import { IndexToTabNameT, NavComponent, NavTabsComponent, TabNameToIndexT } from './types'
import { SvgIconProps, SwipeableDrawer, Tab, Tabs } from '@mui/material'
import { CvIcon, BlogIcon, ContactIcon, HomeIcon, PortfolioIcon, ServicesIcon } from '../Custom/Icons'
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from '../Custom/Tooltip'
import { styled } from '@mui/material/styles'
import classnames from 'classnames'

const tabNameToIndex: TabNameToIndexT = {
  0: '/home',
  1: '/services',
  2: '/cv',
  3: '/portfolio',
  4: '/blog',
  5: '/contact',
}

const indexToTabName: IndexToTabNameT = {
  '/home': 0,
  '/services': 1,
  '/cv': 2,
  '/portfolio': 3,
  '/blog': 4,
  '/contact': 5,
}


export const Nav: NavComponent = ({ toggleNav, isOpen }) => {

  const toggleDrawer = (open: boolean) =>
    (event: KeyboardEvent | MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
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
      <SwipeableDrawer
        open={isOpen}
        anchor={'right'}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        className={styles.mobile}
      >
        <NavTabs closeDrawer={closeDrawer}/>
      </SwipeableDrawer>
      <NavTabs  className={styles.fullScreen}/>
    </>
  )
}

export default Nav

export const NavTabs: NavTabsComponent = ({ className, closeDrawer }) => {
  const params = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState(indexToTabName[params.pathname] || 0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(`${tabNameToIndex[newValue]}`)
    setValue(newValue)
    closeDrawer && setTimeout(() => closeDrawer(), 400)
  }

  return (
    <nav className={classnames(styles.nav, { [`${className}`]: className })}>
      <ThemeSwitcher/>
      {/*<LanguageSwitcher/>*/}

      <StyledTabs value={value} onChange={handleChange} orientation="vertical" centered>
        <Tab icon={<IconWrapper name={'Home'}><HomeIcon/></IconWrapper>}/>
        <Tab icon={<IconWrapper name={'Services'}><ServicesIcon/></IconWrapper>}/>
        <Tab icon={<IconWrapper name={'CV'}><CvIcon/></IconWrapper>}/>
        <Tab icon={<IconWrapper name={'Portfolio'}><PortfolioIcon/></IconWrapper>}/>
        <Tab icon={<IconWrapper name={'Blog'}><BlogIcon/></IconWrapper>}/>
        <Tab icon={<IconWrapper name={'Contact'}><ContactIcon/></IconWrapper>}/>
      </StyledTabs>
    </nav>
  )
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '.Mui-selected': {
    color: '#2B2B2B !important',
    'div[class*="iconWrapper"]': {
      backgroundColor: '#ffb400',
      '&:hover': {
        'svg': {
          fill: '#2B2B2B',
        },
      },
    },
  },
  '.MuiButtonBase-root': {
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    width: '2.25rem',
  },
  '.MuiTabs-indicator': {
    width: 3,
    borderRadius: '3px',
  },
}))


function IconWrapper(props: SvgIconProps) {
  const renderChildren = () => {
    return React.Children.map(props.children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, props)
      }
    })
  }
  return (
    <Tooltip title={props.name} placement='top' arrow>
      <div className={styles.iconWrapper}>
        {renderChildren()}
      </div>
    </Tooltip>
  )
}