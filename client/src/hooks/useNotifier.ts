import React from 'react'

import { SnackbarKey, useSnackbar } from 'notistack'
import { useAppDispatch, useAppSelector } from './hooks'
import { notistackActions } from '../actions/notistackAction'
import { getNotificationsS } from '../selectors/notistackSelector'

let displayed: Array<SnackbarKey> = []

const useNotifier = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(getNotificationsS)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key) => id !== key)]
  }

  React.useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key)
        return
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey)
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(notistackActions.removeSnackbarAC(myKey))
          removeDisplayed(myKey)
        },
      })

      // keep track of snackbars that we've displayed
      storeDisplayed(key)
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])
}

export default useNotifier
