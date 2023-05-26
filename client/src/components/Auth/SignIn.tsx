import React from 'react'
import styles from './Auth.module.scss'
import { SignInComponent, SigninValuesT } from './types'
import * as yup from 'yup'
import { FormikHelpers, useFormik } from 'formik'
import { Button, Checkbox, FormControlLabel } from '@mui/material'
import { SignFormInput } from './SignFormInput'

const validationSigninSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
})

export const SignIn: SignInComponent = () => {
  const formikSignin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSigninSchema,
    onSubmit: (values: SigninValuesT, { setSubmitting }: FormikHelpers<SigninValuesT>) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <form onSubmit={formikSignin.handleSubmit}>
      <SignFormInput
        placeholder={'Username or Email'}
        id='email'
        name='email'
        onChange={formikSignin.handleChange}
        value={formikSignin.values.email}
        error={formikSignin.touched.email && Boolean(formikSignin.errors.email)}
        helperText={formikSignin.touched.email && formikSignin.errors.email}
      />
      <SignFormInput
        placeholder={'Password'}
        type='password'
        id='password'
        name='password'
        value={formikSignin.values.password}
        onChange={formikSignin.handleChange}
        error={formikSignin.touched.password && Boolean(formikSignin.errors.password)}
        helperText={formikSignin.touched.password && formikSignin.errors.password}
      />
      <div className={styles.checkboxWrapper}>
        <FormControlLabel
          control={
            <Checkbox
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
      <Button type={'submit'} className={styles.signButton} sx={{ boxShadow: 0 }} variant='contained'>
        Sign In
      </Button>
    </form>
  )
}

export default SignIn
