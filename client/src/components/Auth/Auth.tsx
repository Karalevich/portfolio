import React, { useState } from 'react'
import styles from './Auth.module.scss'
import { Backdrop, Box, Fade, Modal, styled, Tab, Tabs } from '@mui/material'
import { AuthComponent, TabPanelComponent } from './types'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { userActions } from '../../actions/userAction'
import { getIsOpenModal } from 'src/selectors/userSelectors'
import SignIn from './SignIn'
import SignUp from './SignUp'

export const Auth: AuthComponent = () => {
  const dispatch = useAppDispatch()
  const open = useAppSelector(getIsOpenModal)
  const [tabId, setTabId] = useState(0)

  const handleClose = () => {
    dispatch(userActions.toggleModal(false))
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabId(newValue)
  }

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box className={styles.auth} sx={{ boxShadow: 24 }}>
          <StyledTabs value={tabId} onChange={handleChange}>
            <Tab className={styles.tab} label='Sign In' disableRipple />
            <Tab className={styles.tab} label='Sign Up' disableRipple />
          </StyledTabs>
          <TabPanel id={tabId} index={0}>
            <header className={styles.tabHeader}>
              <h2>Sign In</h2>
              <p>Enter your login information</p>
            </header>
            <SignIn />
          </TabPanel>
          <TabPanel id={tabId} index={1}>
            <header className={styles.tabHeader}>
              <h2>Sign Up</h2>
              <p>Enter your credential information</p>
            </header>
            <SignUp />
          </TabPanel>
        </Box>
      </Fade>
    </Modal>
  )
}
export default Auth

const StyledTabs = styled(Tabs)(({ theme }) => ({
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
