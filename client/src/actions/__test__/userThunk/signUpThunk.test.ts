import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import { TOGGLE_IS_AUTH_LOADING } from '../../../reducers/user/userReducer'
import { CLOSE_MODAL } from '../../../reducers/modal/modalReducer'
import { signUpThunk } from '../../userAction'

// Create axios mock
const apiMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('signUpThunk', () => {
  afterEach(() => {
    apiMock.reset()
  })

  const mockData = {
    email: 'test@gmail.com',
    name: 'test',
    password: 'test',
    confirmPassword: 'test',
  }

  test('dispatches the correct actions when user signup correctly', async () => {
    // Return 200 with mocked data
    apiMock.onPost('/user/signup', mockData).reply(200, { user: '', token: '' })

    const expectedActions = [
      {
        type: TOGGLE_IS_AUTH_LOADING,
      },
      {
        type: 'SET_USER',
        payload: {
          user: '',
        },
      },
      {
        type: CLOSE_MODAL,
        payload: {},
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Account successfully created!',
            options: {
              variant: 'success',
            },
          },
        },
      },
      {
        type: TOGGLE_IS_AUTH_LOADING,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(signUpThunk(mockData) as unknown as AnyAction)
    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[1]).toEqual(expectedActions[1])
    expect(store.getActions()[2]).toEqual(expectedActions[2])
    expect(store.getActions()[4]).toEqual(expectedActions[4])

    expect(store.getActions()[3].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[3].notification.message).toEqual(
      expectedActions[3].payload?.notification?.message,
    )
    expect(store.getActions()[3].notification.options).toEqual(
      expectedActions[3].payload?.notification?.options,
    )
  })

  test('dispatches the correct actions when signup failed', async () => {
    // Return error
    apiMock.onPost('/user/signup', mockData).networkError()

    const expectedActions = [
      {
        type: TOGGLE_IS_AUTH_LOADING,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while creating account',
            options: {
              variant: 'error',
            },
          },
        },
      },
      {
        type: TOGGLE_IS_AUTH_LOADING,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(signUpThunk(mockData) as unknown as AnyAction)

    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[2]).toEqual(expectedActions[2])

    expect(store.getActions()[1].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[1].notification.message).toEqual(
      expectedActions[1].payload?.notification.message,
    )
    expect(store.getActions()[1].notification.options).toEqual(
      expectedActions[1].payload?.notification.options,
    )
  })
})
