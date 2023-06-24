import {
  CLOSE_SNACKBAR,
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
} from '../reducers/notistack/notistackReducer'
import { SnackbarKey } from 'notistack'
import { NotistackT } from '../reducers/notistack/types'

export const notistackActions = {
  enqueueSnackbarAC: (notification: Omit<NotistackT, 'key'> & { key?: SnackbarKey }) => {
    const key = notification.options && notification.options.key
    return {
      type: ENQUEUE_SNACKBAR,
      notification: {
        ...notification,
        key: key || new Date().getTime() + Math.random(),
      },
    } as const
  },
  closeSnackbarAC: (key: SnackbarKey) =>
    ({
      type: CLOSE_SNACKBAR,
      dismissAll: !key, // dismiss all if no key has been defined
      key,
    } as const),
  removeSnackbarAC: (key: SnackbarKey) =>
    ({
      type: REMOVE_SNACKBAR,
      key,
    } as const),
}
