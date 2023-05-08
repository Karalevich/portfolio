import { FunctionComponent, ReactNode } from 'react'

type AuthProps = {}
export type AuthComponent = FunctionComponent<AuthProps>

interface TabPanelProps {
  children?: ReactNode
  index: number
  id: number
}

export type TabPanelComponent = FunctionComponent<TabPanelProps>

type SignInProps = {}
export type SignInComponent = FunctionComponent<SignInProps>

type SignUpProps = {}
export type SignUpComponent = FunctionComponent<SignUpProps>

export type SigninValuesT = {
  password: string
  email: string
}
export type SignupValuesT = {
  password: string
  name: string
  email: string
  confirmPassword: string
}
