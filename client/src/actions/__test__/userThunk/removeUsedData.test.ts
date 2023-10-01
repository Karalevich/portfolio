import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { removeUsedData } from '../../userAction'
import { LOGOUT } from '../../../reducers/user/userReducer'

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('removeUsedData', () => {
  test('dispatches the correct actions when user data removed correctly', async () => {
    const expectedActions = [
      {
        type: LOGOUT,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(removeUsedData() as unknown as AnyAction)
    expect(store.getActions()).toEqual(expectedActions)
  })

  test('dispatches the correct actions when removing of user failed', async () => {
    // Mock localStorage to throw an error
    const localStorageMock = {
      getItem: jest.fn(),
      removeItem: jest.fn(() => {
        throw new Error('Test error')
      }),
    }

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    })

    const expectedActions = [
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while removing user',
            options: {
              variant: 'error',
            },
          },
        },
      },
    ]

    const store = mockStore()

    await store.dispatch(removeUsedData() as unknown as AnyAction)

    // Dispatch the thunk action
    expect(store.getActions()[0].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[0].notification.message).toEqual(
      expectedActions[0].payload?.notification.message
    )
    expect(store.getActions()[0].notification.options).toEqual(
      expectedActions[0].payload?.notification.options
    )
  })
})
