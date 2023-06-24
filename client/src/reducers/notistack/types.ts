import { ActionT } from '../store'
import { OptionsObject, SnackbarKey } from 'notistack'
import { notistackActions } from '../../actions/notistackAction'

export type NotistackT = {
  key: SnackbarKey
  message: string
  options: OptionsObject
  dismissed?: boolean
}

export type NotistackStateT = {
  notifications: Array<NotistackT>
}

export type NotistackActionT = ActionT<typeof notistackActions>
