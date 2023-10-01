import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import { resentActivationLinkThunk } from '../../userAction'

// Create axios mock
const apiMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('resentActivationLinkThunk', () => {
  afterEach(() => {
    apiMock.reset()
  })

  const email = 'test@gmail.com'

  test('dispatches the correct actions when the link resent correctly', async () => {
    // Return 200 with mocked data
    apiMock.onPut(`/user/resentActivationLink`, { email }).reply(200)

    const expectedActions = [
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Link successfully sent!',
            options: {
              variant: 'success',
            },
          },
        },
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(resentActivationLinkThunk(email) as unknown as AnyAction)
    expect(store.getActions()[0].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[0].notification.message).toEqual(
      expectedActions[0].payload?.notification?.message
    )
    expect(store.getActions()[0].notification.options).toEqual(
      expectedActions[0].payload?.notification?.options
    )
  })

  test('dispatches the correct actions when the link resent failed', async () => {
    // Return error
    apiMock.onPut(`/user/resentActivationLink`, { email }).networkError()

    const expectedActions = [
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while resent link',
            options: {
              variant: 'error',
            },
          },
        },
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(resentActivationLinkThunk(email) as unknown as AnyAction)

    expect(store.getActions()[0].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[0].notification.message).toEqual(
      expectedActions[0].payload?.notification?.message
    )
    expect(store.getActions()[0].notification.options).toEqual(
      expectedActions[0].payload?.notification?.options
    )
  })
})
