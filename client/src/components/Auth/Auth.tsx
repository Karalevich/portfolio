import React, { useState } from 'react'
import styles from './Auth.module.scss'
import { Box, styled, Tab, Tabs } from '@mui/material'
import { AuthComponent, TabPanelComponent } from './types'
import SignIn from './SignIn'
import SignUp from './SignUp'
import GoogleButton from '../Custom/GoogleButton/GoogleButton'
import { useAppSelector } from '../../hooks/hooks'
import { getIsAuthLoading } from '../../selectors/userSelectors'

export const Auth: AuthComponent = () => {
  const [tabId, setTabId] = useState(0)
  const isAuthLoading = useAppSelector(getIsAuthLoading)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabId(newValue)
  }

  return (
    <Box className={styles.auth}>
      <StyledTabs value={tabId} onChange={handleChange}>
        <Tab className={styles.tab} label='Sign In' disableRipple disabled={isAuthLoading} />
        <Tab className={styles.tab} label='Sign Up' disableRipple disabled={isAuthLoading} />
      </StyledTabs>
      <TabPanel id={tabId} index={0}>
        <header className={styles.tabHeader}>
          <h2>Sign In</h2>
          <GoogleButton disabled={isAuthLoading} />
          <div>
            <p className={styles.or}>or</p>
            <p>Enter your login information</p>
          </div>
        </header>
        <SignIn />
      </TabPanel>
      <TabPanel id={tabId} index={1}>
        <header className={styles.tabHeader}>
          <h2>Sign Up</h2>
          <GoogleButton text={'Sign Up with Google'} disabled={isAuthLoading} />
          <div>
            <p className={styles.or}>or</p>
            <p>Enter your credential information</p>
          </div>
        </header>
        <SignUp />
      </TabPanel>
    </Box>
  )
}
export default Auth

const StyledTabs = styled(Tabs)(({}) => ({
  position: 'relative',
  width: 'fit-content',
  marginBottom: '1.5rem',
  marginRight: 'auto',
  marginLeft: 'auto',
  '.MuiTabs-flexContainer': {
    borderBottom: '2px solid var(--substrate2)',
  },
}))

const TabPanel: TabPanelComponent = ({ children, id, index, ...other }) => {
  return (
    <div hidden={id !== index} {...other}>
      {id === index && children}
    </div>
  )
}
