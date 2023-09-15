import notistackReducer from './notistackReducer'
import { notistackActions } from '../../actions/notistackAction'

const initialState = {
  notifications: [],
}

describe('notistackReducer', () => {
  test('should handle ENQUEUE_SNACKBAR', () => {
    const newState = notistackReducer(
      initialState,
      notistackActions.enqueueSnackbarAC({
        message: 'test message',
        options: {
          key: 123123,
        },
        dismissed: false,
      })
    )

    expect(newState.notifications).toEqual([
      {
        key: 123123,
        message: 'test message',
        options: {
          key: 123123,
        },
        dismissed: false,
      },
    ])
  })

  test('should handle CLOSE_SNACKBAR', () => {
    const newState = notistackReducer(
      {
        notifications: [
          {
            key: 123123,
            message: 'test message',
            options: {
              key: 123123,
            },
            dismissed: false,
          },
        ],
      },
      notistackActions.closeSnackbarAC(123123)
    )

    expect(newState.notifications).toEqual([
      {
        key: 123123,
        message: 'test message',
        options: {
          key: 123123,
        },
        dismissed: true,
      },
    ])
  })

  test('should handle REMOVE_SNACKBAR', () => {
    const newState = notistackReducer(
      {
        notifications: [
          {
            key: 123123,
            message: 'test message',
            options: {
              key: 123123,
            },
            dismissed: false,
          },
        ],
      },
      notistackActions.removeSnackbarAC(123123)
    )

    expect(newState.notifications).toEqual([])
  })
})
