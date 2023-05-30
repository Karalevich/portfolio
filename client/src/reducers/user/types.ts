import { ActionT } from '../store'
import { userActions } from '../../actions/userAction'

export type UserT = {
  email: string
  _id: string
  name?: string,
  imageUrl?: string
}

export type GoogleUserT = {
  name: string, picture: string, sub: string, email: string
}

export type UserStateT = {
  user: UserT | null
  token: string | null
}

export type UserActionsT = ActionT<typeof userActions>
