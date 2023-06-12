import { ActionT } from '../store'
import { userActions } from '../../actions/userAction'

export type UserT = {
  email: string
  id: string
  name: string
  imageUrl?: string
  isActivated?: boolean
}

export type CreateUserT = Omit<UserT, 'id'> & {
  password: string
  confirmPassword?: string
}

export type GoogleUserT = {
  name: string
  picture: string
  sub: string
  email: string
}

export type UserStateT = {
  user: UserT | null
  token: string | null
  isAuthLoading: boolean
  isFetchingLogout: boolean
  errSignInMessage: string
  errSignUpMessage: string
}

export type UserActionsT = ActionT<typeof userActions>
