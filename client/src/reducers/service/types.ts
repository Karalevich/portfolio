import { ActionT } from '../store'
import { serviceActions } from '../../actions/serviceAction'

export type ServiceStateT = {
  isLoadingContactForm: boolean
}

export type ServiceActionT = ActionT<typeof serviceActions>
