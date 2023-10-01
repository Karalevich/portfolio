import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { sendMessageFromContactFormThunk } from '../../serviceAction'
import { SET_LOADING_CONTACT_FORM } from '../../../reducers/service/serviceReducer'
import axios from 'axios'

// Create axios mock
const axiosMock = new MockAdapter(axios)
const originalEnv = process.env

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const resetFormMock = jest.fn()

describe('sendMessageFromContactFormThunk', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env = {
      ...originalEnv,
      REACT_APP_API_URl: 'http://example.com/api',
    }
  })

  afterEach(() => {
    axiosMock.reset()
    process.env = originalEnv
  })

  const mockData = {
    name: 'test name',
    subject: 'test subject',
    message: 'test message',
    email: 'test email',
  }

  test('dispatches the correct actions when message sent', async () => {
    // Return 200 with mocked data
    axiosMock.onPost(`${process.env.REACT_APP_API_URl}/service/contactForm`, mockData).reply(200)

    const expectedActions = [
      {
        type: SET_LOADING_CONTACT_FORM,
        flag: true,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Message successfully sent!',
            options: {
              variant: 'success',
            },
          },
        },
      },
      {
        type: SET_LOADING_CONTACT_FORM,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(
      sendMessageFromContactFormThunk(mockData, resetFormMock) as unknown as AnyAction
    )
    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[2]).toEqual(expectedActions[2])

    expect(store.getActions()[1].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[1].notification.message).toEqual(
      expectedActions[1].payload?.notification?.message
    )
    expect(store.getActions()[1].notification.options).toEqual(
      expectedActions[1].payload?.notification?.options
    )
    expect(resetFormMock).toHaveBeenCalled()
  })

  test('dispatches the correct actions when sending of message failed', async () => {
    // Return error

    axiosMock.onPost(`${process.env.REACT_APP_API_URl}/service/contactForm`, mockData).networkError()

    const expectedActions = [
      {
        type: SET_LOADING_CONTACT_FORM,
        flag: true,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while sending message',
            options: {
              variant: 'error',
            },
          },
        },
      },
      {
        type: SET_LOADING_CONTACT_FORM,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(
      sendMessageFromContactFormThunk(mockData, resetFormMock) as unknown as AnyAction
    )

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
