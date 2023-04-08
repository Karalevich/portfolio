import React, { useState } from 'react'
import styles from './Navbar.module.scss'
import { IndexToTabNameT, NavComponent, TabNameToIndexT } from './types'
import { SvgIconProps, Tab, Tabs } from '@mui/material'
import { CvIcon, BlogIcon, ContactIcon, HomeIcon, PortfolioIcon, ServicesIcon } from '../Custom/Icons'
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from '../Custom/Tooltip'

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


export const Nav: NavComponent = () => {
  const params = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState(indexToTabName[params.pathname] || 0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(`${tabNameToIndex[newValue]}`)
    setValue(newValue)
  }

  return (
    <nav className={styles.nav}>
      <ThemeSwitcher/>
      {/*<LanguageSwitcher/>*/}

      <Tabs sx={{
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
        },
        '.MuiTabs-indicator': {
          width: 3,
          borderRadius: '3px'
        }
      }} value={value} onChange={handleChange} orientation="vertical" centered>
        <Tab icon={<IconWrapper name={'Home'}><HomeIcon/></IconWrapper>}/>
        <Tab icon={<IconWrapper name={'Services'}><ServicesIcon/></IconWrapper>}/>
        <Tab icon={<IconWrapper name={'CV'}><CvIcon/></IconWrapper>}/>
        <Tab icon={<IconWrapper name={'Portfolio'}><PortfolioIcon/></IconWrapper>}/>
        <Tab icon={<IconWrapper name={'Blog'}><BlogIcon/></IconWrapper>}/>
        <Tab icon={<IconWrapper name={'Contact'}><ContactIcon/></IconWrapper>}/>
      </Tabs>
    </nav>
  )
}

export default Nav

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