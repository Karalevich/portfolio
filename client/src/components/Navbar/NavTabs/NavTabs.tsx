import React, { useEffect, useState } from 'react'
import styles from './NavTabs.module.scss'
import { NavTabsComponent } from './types'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { removeUsedData } from '../../../actions/userAction'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import { BlogIcon, ContactIcon, CvIcon, HomeIcon, PortfolioIcon, ServicesIcon } from '../../Custom/Icons'
import { Tooltip } from '../../Custom/Tooltip'
import { useLocation, useNavigate } from 'react-router-dom'
import { IndexToTabNameT, TabNameToIndexT } from '../types'
import { styled } from '@mui/material/styles'
import classnames from 'classnames'
import { Button, SvgIconProps, Tab, Tabs } from '@mui/material'
import { getUserS } from '../../../selectors/userSelectors'
import { actionsModal } from '../../../actions/modalAction'
import { MODAL_TYPE } from '../../../reducers/modal/types'

const tabNameToIndex: TabNameToIndexT = {
  0: 'home',
  1: 'services',
  2: 'cv',
  3: 'portfolio',
  4: 'blog',
  5: 'contact',
}

const indexToTabName: IndexToTabNameT = {
  home: 0,
  services: 1,
  cv: 2,
  portfolio: 3,
  blog: 4,
  contact: 5,
}

export const NavTabs: NavTabsComponent = ({
  className,
  closeDrawer,
  handleSwitchTheme,
  isLightTheme,
}) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState(indexToTabName[pathname.split('/')[1]] || 0)
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUserS)

  useEffect(() => {
    setValue(indexToTabName[pathname.split('/')[1]] || 0)
  }, [pathname])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(`/${tabNameToIndex[newValue]}`)
    setValue(newValue)
    closeDrawer && setTimeout(() => closeDrawer(), 400)
  }

  const handleOpenLogin = () => {
    if(user){
      dispatch(removeUsedData())
    }else{
      dispatch(actionsModal.openModalAC(MODAL_TYPE.AUTH))
    }
  }

  return (
    <nav className={classnames(styles.nav, { [`${className}`]: className })}>
      <Button onClick={handleOpenLogin} variant='contained' className={styles.loginButton}>
        {user ? 'Log Out' : 'Sign In'}
      </Button>
      <ThemeSwitcher handleSwitchTheme={handleSwitchTheme} isLightTheme={isLightTheme} />
      {/*<LanguageSwitcher/>*/}

      <StyledTabs value={value} onChange={handleChange} orientation='vertical' centered>
        <Tab
          icon={
            <IconWrapper name={'Home'}>
              <HomeIcon />
            </IconWrapper>
          }
        />
        <Tab
          icon={
            <IconWrapper name={'Services'}>
              <ServicesIcon />
            </IconWrapper>
          }
        />
        <Tab
          icon={
            <IconWrapper name={'CV'}>
              <CvIcon />
            </IconWrapper>
          }
        />
        <Tab
          icon={
            <IconWrapper name={'Portfolio'}>
              <PortfolioIcon />
            </IconWrapper>
          }
        />
        <Tab
          icon={
            <IconWrapper name={'Blog'}>
              <BlogIcon />
            </IconWrapper>
          }
        />
        <Tab
          icon={
            <IconWrapper name={'Contact'}>
              <ContactIcon />
            </IconWrapper>
          }
        />
      </StyledTabs>
    </nav>
  )
}

const StyledTabs = styled(Tabs)(({  }) => ({
  '.Mui-selected': {
    color: 'var(--main-text) !important',
    'div[class*="iconWrapper"]': {
      backgroundColor: '#ffb400',
      '&:hover': {
        svg: {
          fill: 'var(--main-text)',
        },
      },
    },
  },
  '.MuiButtonBase-root': {
    boxShadow:
      '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    width: '2.25rem',
    borderRadius: '50% !important',
    marginBottom: '4.7vh',
    minHeight: '0',
    minWidth: '0',
    padding: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
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
      <div className={styles.iconWrapper}>{renderChildren()}</div>
    </Tooltip>
  )
}

export default NavTabs
