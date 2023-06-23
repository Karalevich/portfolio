import { NotistackActionT, NotistackStateT } from './types'

export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR'

const initialState = {
  notifications: []
}

export default (state: NotistackStateT = initialState, action: NotistackActionT) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [...state.notifications, action.notification],
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notification => (
          (action.dismissAll || notification.key === action.key)
            ? { ...notification, dismissed: true }
            : { ...notification }
        )),
      }
    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key,
        ),
      }
    default:
      return state
  }
}
