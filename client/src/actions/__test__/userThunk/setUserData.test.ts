import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { setUsedData } from '../../userAction'
import { SET_USER } from '../../../reducers/user/userReducer'

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('setUsedData', () => {
  const user = {
    email: 'user@gmail.com',
    id: 'testId',
    name: 'userName',
  }
  const mockedToken = '123312'

  test('dispatches the correct actions when user set correctly', async () => {
    const expectedActions = [
      {
        type: SET_USER,
        payload: {
          user: user,
          token: mockedToken,
        },
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(setUsedData(user, mockedToken) as unknown as AnyAction)
    expect(store.getActions()).toEqual(expectedActions)
  })

  test('dispatches the correct actions when setting of user failed', async () => {
    // Mock localStorage to throw an error
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(() => {
        throw new Error('Test error')
      }),
    }
    // @ts-ignore

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    })

    const expectedActions = [
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error saving user',
            options: {
              variant: 'error',
            },
          },
        },
      },
    ]

    const store = mockStore()

    await store.dispatch(setUsedData(user, mockedToken) as unknown as AnyAction)

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
