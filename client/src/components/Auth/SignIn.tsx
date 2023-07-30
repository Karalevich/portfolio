import React, { useEffect } from 'react'
import styles from './Auth.module.scss'
import { SignInComponent, SigninValuesT } from './types'
import * as yup from 'yup'
import { FormikHelpers, useFormik } from 'formik'
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material'
import { SignFormInput } from './SignFormInput'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { signInThunk, userActions } from '../../actions/userAction'
import { getErrSignInMessage, getIsAuthLoading } from '../../selectors/userSelectors'
import LoadingButton from '@mui/lab/LoadingButton'

const validationSigninSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required')
    .max(128, 'Email should not be more then 128 characters length'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .max(32, 'Password should not be more then 32 characters length')
    .required('Password is required'),
})

export const SignIn: SignInComponent = () => {
  const dispatch = useAppDispatch()
  const isAuthLoading = useAppSelector(getIsAuthLoading)
  const errSignInMessage = useAppSelector(getErrSignInMessage)

  useEffect(() => {
    return () => {
      dispatch(userActions.setErrSignInMessageAC(''))
    }
  }, [])

  const formikSignin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSigninSchema,
    onSubmit: (values: SigninValuesT, {}: FormikHelpers<SigninValuesT>) => {
      dispatch(signInThunk(values))
    },
  })

  return (
    <form onSubmit={formikSignin.handleSubmit}>
      {errSignInMessage && <FormHelperText error>{errSignInMessage}</FormHelperText>}
      <SignFormInput
        placeholder={'Username or Email'}
        id='email'
        name='email'
        type='email'
        onChange={formikSignin.handleChange}
        value={formikSignin.values.email.trim()}
        error={formikSignin.touched.email && Boolean(formikSignin.errors.email)}
        helperText={formikSignin.touched.email && formikSignin.errors.email}
        disabled={isAuthLoading}
      />
      <SignFormInput
        placeholder={'Password'}
        type='password'
        id='password'
        name='password'
        value={formikSignin.values.password.trim()}
        onChange={formikSignin.handleChange}
        error={formikSignin.touched.password && Boolean(formikSignin.errors.password)}
        helperText={formikSignin.touched.password && formikSignin.errors.password}
        disabled={isAuthLoading}
      />
      <div className={styles.checkboxWrapper}>
        <FormControlLabel
          control={
            <Checkbox
              disabled={isAuthLoading}
              sx={{
                '.MuiSvgIcon-root': { color: 'var(--main-text)' },
                '&.Mui-checked': {
                  '.MuiSvgIcon-root': { color: '#FFB400' },
                },
              }}
              disableRipple
            />
          }
          label=' Remember Me'
        />
        <span className={styles.forgot}>Forgot Password?</span>
      </div>
      <LoadingButton
        loading={isAuthLoading}
        loadingPosition='center'
        type={'submit'}
        className={styles.signButton}
        disableElevation
        variant='contained'
      >
        Sign In
      </LoadingButton>
    </form>
  )
}

export default SignIn
