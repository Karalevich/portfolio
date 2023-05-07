import { Backdrop, Box, Button, Checkbox, Fade, Modal, styled, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import styles from './Auth.module.scss'
import { AuthComponent, TabPanelComponent } from './types'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { userActions } from '../../actions/userAction'
import { getIsOpenModal } from 'src/selectors/userSelectors'
import Input from '../Custom/Inputs/Input'


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
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
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
            <Tab label="Sign In" disableRipple/>
            <Tab label="Sign Up" disableRipple/>
          </StyledTabs>
          <TabPanel id={tabId} index={0}>
            <header>
              <h3>Sign In</h3>
              <p>Enter your login information</p>
            </header>
            <main>
              <Input placeholder={'Username or Email'}/>
              <Input placeholder={'Password'}/>
              <div>
                <Checkbox/>
                <span>Forgot Password?</span>
              </div>
              <Button className={styles.button} variant="contained">
                Sign In
              </Button>
            </main>

          </TabPanel>
          <TabPanel id={tabId} index={1}>
            <header>
              <h3>Sign Up</h3>
              <p>Enter your credential information</p>
            </header>
            <main>
              <Input placeholder={'Full Name'}/>
              <Input placeholder={'Username or Email'}/>
              <Input placeholder={'Password'}/>
              <Input placeholder={'Confirm Password'}/>
              <Button className={styles.button} variant="contained">
                Sign Up
              </Button>
            </main>
          </TabPanel>
        </Box>
      </Fade>
    </Modal>
  )
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  position: 'relative',
  width: 'fit-content',
  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  '.MuiTabs-flexContainer': {},
}))

export default Auth

const TabPanel: TabPanelComponent = ({ children, id, index, ...other }) => {

  return (
    <div
      hidden={id !== index}
      {...other}
    >
      {id === index && children}
    </div>
  )
}