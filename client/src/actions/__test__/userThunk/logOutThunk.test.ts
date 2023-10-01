import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import * as user from '../../userAction'
import { SET_FETCHING_LOGOUT } from '../../../reducers/user/userReducer'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('logOutThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })

  test('dispatches the correct actions when user logout', async () => {
    // Return 200 with mocked data
    jest
      .spyOn(user, 'removeUsedData')
      .mockImplementationOnce(jest.fn().mockReturnValue({ type: 'REMOVE_USER' }))

    axiosMock.onPost('/user/logout').reply(200)

    const expectedActions = [
      {
        type: SET_FETCHING_LOGOUT,
        flag: true,
      },
      {
        type: 'REMOVE_USER',
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Logout successful!',
            options: {
              variant: 'success',
            },
          },
        },
      },
      {
        type: SET_FETCHING_LOGOUT,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(user.logOutThunk() as unknown as AnyAction)
    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[1]).toEqual(expectedActions[1])
    expect(store.getActions()[3]).toEqual(expectedActions[3])

    expect(store.getActions()[2].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[2].notification.message).toEqual(
      expectedActions[2].payload?.notification?.message
    )
    expect(store.getActions()[2].notification.options).toEqual(
      expectedActions[2].payload?.notification?.options
    )
  })

  test('dispatches the correct actions when logout of user failed', async () => {
    // Return error
    axiosMock.onPost('/user/logout').networkError()

    const expectedActions = [
      {
        type: SET_FETCHING_LOGOUT,
        flag: true,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while logout',
            options: {
              variant: 'error',
            },
          },
        },
      },
      {
        type: SET_FETCHING_LOGOUT,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(user.logOutThunk() as unknown as AnyAction)

    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[2]).toEqual(expectedActions[2])

    expect(store.getActions()[1].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[1].notification.message).toEqual(
      expectedActions[1].payload?.notification.message
    )
    expect(store.getActions()[1].notification.options).toEqual(
      expectedActions[1].payload?.notification.options
    )
  })
})
