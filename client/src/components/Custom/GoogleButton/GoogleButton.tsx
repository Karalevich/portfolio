import React, { MouseEventHandler } from 'react'
import styles from './GoogleButton.module.scss'
import { GoogleButtonComponent } from './types'
import { Button } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google'
import { useAppDispatch } from '../../../hooks/hooks'
import { googleSuccessThunk } from '../../../actions/userAction'
import { GoogleIcon } from '../Icons'

export const GoogleButton: GoogleButtonComponent = ({ text, ...other }) => {
  const dispatch = useAppDispatch()
  // @ts-ignore
  const login: MouseEventHandler<HTMLButtonElement> = useGoogleLogin({
    onSuccess: (respose) => {
      dispatch(googleSuccessThunk(respose))
    },
  })

  return (
    <div className={styles.googleButton}>
      <Button
        {...other}
        disableElevation
        disableFocusRipple
        disableRipple
        variant='outlined'
        onClick={login}
        sx={{
          textTransform: 'none',
          border: '1px solid #dadce0',
          color: '#3c4043',
          backgroundColor: '#fff',
          width: '100%',

          '&:hover': {
            boxShadow: 'none',
            borderColor: '#d2e3fc',
            background: 'rgba(66,133,244,.04)',
            outline: 'none',
          },

          '&:focus': {
            boxShadow: 'none',
            borderColor: '#d2e3fc',
            background: 'rgba(66,133,244,.04)',
            outline: 'none',
          },
        }}
        startIcon={<GoogleIcon />}
      >
        {text ? text : 'Sign In with Google'}
      </Button>
    </div>
  )
}

export default GoogleButton
