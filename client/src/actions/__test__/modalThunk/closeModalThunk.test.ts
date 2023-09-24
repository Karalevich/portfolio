import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { AnyAction } from 'redux'
import { API } from '../../../api'
import { CLOSE_MODAL, RESET_MODAL_DATA } from '../../../reducers/modal/modalReducer'
import { closeModalThunk } from '../../modalAction'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('closeModalThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })

  test('dispatches the correct actions when modal close', async () => {
    const expectedActions = [
      {
        type: CLOSE_MODAL,
        payload: {},
      },
      {
        type: RESET_MODAL_DATA,
        payload: {},
      },
    ]

    const store = mockStore({})

    // Dispatch the thunk action
    await store.dispatch(closeModalThunk() as unknown as AnyAction)

    expect(store.getActions()).toEqual(expectedActions)
  })
})
