import React, { useEffect } from 'react'
import styles from './Auth.module.scss'
import { SignUpComponent, SignupValuesT } from './types'
import * as yup from 'yup'
import { FormikHelpers, useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import { SignFormInput } from './SignFormInput'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { signUpThunk, userActions } from '../../actions/userAction'
import { getErrSignUpMessage, getIsAuthLoading } from '../../selectors/userSelectors'
import { FormHelperText } from '@mui/material'

const validationSignupSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be in rage from 3 to 24 characters')
    .max(24, 'Name should be in rage from 3 to 24 characters'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
})

export const SignUp: SignUpComponent = () => {
  const dispatch = useAppDispatch()
  const isAuthLoading = useAppSelector(getIsAuthLoading)
  const errSignUpMessage = useAppSelector(getErrSignUpMessage)

  const formikSignup = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSignupSchema,
    onSubmit: (values: SignupValuesT, {}: FormikHelpers<SignupValuesT>) => {
      dispatch(signUpThunk(values))
    },
  })

  useEffect(() => {
    return () => {
      dispatch(userActions.setErrSignUpMessageAC(''))
      formikSignup.resetForm()
    }
  }, [])

  return (
    <form onSubmit={formikSignup.handleSubmit}>
      {errSignUpMessage && <FormHelperText error>{errSignUpMessage}</FormHelperText>}
      <SignFormInput
        placeholder={'Full Name'}
        type='text'
        id='name'
        name='name'
        value={formikSignup.values.name}
        onChange={formikSignup.handleChange}
        error={formikSignup.touched.name && Boolean(formikSignup.errors.name)}
        helperText={formikSignup.touched.name && formikSignup.errors.name}
        disabled={isAuthLoading}
      />
      <SignFormInput
        placeholder={'Username or Email'}
        id='email'
        name='email'
        onChange={formikSignup.handleChange}
        value={formikSignup.values.email}
        error={formikSignup.touched.email && Boolean(formikSignup.errors.email)}
        helperText={formikSignup.touched.email && formikSignup.errors.email}
        disabled={isAuthLoading}
      />
      <SignFormInput
        placeholder={'Password'}
        type='password'
        id='password'
        name='password'
        value={formikSignup.values.password}
        onChange={formikSignup.handleChange}
        error={formikSignup.touched.password && Boolean(formikSignup.errors.password)}
        helperText={formikSignup.touched.password && formikSignup.errors.password}
        disabled={isAuthLoading}
      />
      <SignFormInput
        placeholder={'Confirm Password'}
        type='password'
        id='confirmPassword'
        name='confirmPassword'
        value={formikSignup.values.confirmPassword}
        onChange={formikSignup.handleChange}
        error={formikSignup.touched.confirmPassword && Boolean(formikSignup.errors.confirmPassword)}
        helperText={formikSignup.touched.confirmPassword && formikSignup.errors.confirmPassword}
        disabled={isAuthLoading}
      />
      <LoadingButton
        type={'submit'}
        className={styles.signButton}
        disableElevation
        variant='contained'
        loading={isAuthLoading}
        loadingPosition='center'
      >
        Sign Up
      </LoadingButton>
    </form>
  )
}

export default SignUp
