import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import * as user from '../../userAction'
import { SET_USER, TOGGLE_IS_AUTH_LOADING } from '../../../reducers/user/userReducer'
import axios from 'axios'
import { CLOSE_MODAL } from '../../../reducers/modal/modalReducer'

// Create axios mock
const apiMock = new MockAdapter(API)
const axiosMock = new MockAdapter(axios)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('googleSuccessThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })

  const mockGoogleData = {
    name: 'name',
    picture: 'test ing',
    sub: 'test sub',
    email: 'test@gmail.com',
  }

  test('dispatches the correct actions when user login through google', async () => {
    // Return 200 with mocked data
    jest
      .spyOn(user, 'setUsedData')
      .mockImplementationOnce(jest.fn().mockReturnValue({ type: 'SET_USER' }))

    axiosMock.onGet('https://www.googleapis.com/oauth2/v3/userinfo').reply(200, mockGoogleData)
    apiMock.onPost('/user/google').reply(200, { user: '', token: '' })

    const expectedActions = [
      {
        type: TOGGLE_IS_AUTH_LOADING,
      },
      {
        type: SET_USER,
        payload: {
          token: undefined,
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
            message: 'Login successful!',
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
    await store.dispatch(
      user.googleSuccessThunk({
        access_token: '',
        expires_in: 12,
        prompt: '',
        token_type: '',
        scope: '',
      }) as unknown as AnyAction,
    )
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

  test('dispatches the correct actions when login of user through google failed', async () => {
    // Return error
    apiMock.onPost('/user/google').networkError()

    const expectedActions = [
      {
        type: TOGGLE_IS_AUTH_LOADING,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while login',
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
    await store.dispatch(
      user.googleSuccessThunk({
        access_token: '',
        expires_in: 12,
        prompt: '',
        token_type: '',
        scope: '',
      }) as unknown as AnyAction,
    )

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
