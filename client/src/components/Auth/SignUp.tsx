import React from 'react'
import styles from './Auth.module.scss'
import { SignUpComponent, SignupValuesT } from './types'
import * as yup from 'yup'
import { FormikHelpers, useFormik } from 'formik'
import { Button } from '@mui/material'
import { SignFormInput } from './SignFormInput'

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
  const formikSignup = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSignupSchema,
    onSubmit: (values: SignupValuesT, {  }: FormikHelpers<SignupValuesT>) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <form onSubmit={formikSignup.handleSubmit}>
      <SignFormInput
        placeholder={'Full Name'}
        type='text'
        id='name'
        name='name'
        value={formikSignup.values.name}
        onChange={formikSignup.handleChange}
        error={formikSignup.touched.name && Boolean(formikSignup.errors.name)}
        helperText={formikSignup.touched.name && formikSignup.errors.name}
      />
      <SignFormInput
        placeholder={'Username or Email'}
        id='email'
        name='email'
        onChange={formikSignup.handleChange}
        value={formikSignup.values.email}
        error={formikSignup.touched.email && Boolean(formikSignup.errors.email)}
        helperText={formikSignup.touched.email && formikSignup.errors.email}
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
      />
      <Button type={'submit'} className={styles.signButton} disableElevation variant='contained'>
        Sign Up
      </Button>
    </form>
  )
}

export default SignUp
