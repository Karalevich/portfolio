import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { AnyAction } from 'redux'
import axios from 'axios'
import * as user from '../../userAction'
import { SET_FETCHING_LOGOUT } from '../../../reducers/user/userReducer'

// Create axios mock
const axiosMock = new MockAdapter(axios)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('checkAuth', () => {
  afterEach(() => {
    axiosMock.reset()
  })

  test('dispatches the correct actions when user checked', async () => {
    // Return 200 with mocked data
    jest
      .spyOn(user, 'setUsedData')
      .mockImplementationOnce(jest.fn().mockReturnValue({ type: 'SET_USER' }))

    axiosMock
      .onGet(`${process.env.REACT_APP_API_URl}/user/refresh`)
      .reply(200, { user: {}, accessToken: '' })

    const expectedActions = [
      {
        type: SET_FETCHING_LOGOUT,
        flag: true,
      },
      {
        type: 'SET_USER',
      },
      {
        type: SET_FETCHING_LOGOUT,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(user.checkAuth() as unknown as AnyAction)
    expect(store.getActions()).toEqual(expectedActions)
  })
})
