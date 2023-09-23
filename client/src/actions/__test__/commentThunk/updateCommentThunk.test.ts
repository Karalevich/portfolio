import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { updateCommentThunk } from '../../commentAction'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import { SET_LOADING_COMMENT, UPDATE_COMMENT } from '../../../reducers/comment/commentReducer'
import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('updateCommentThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })
  const commentId = '64991dfb7d0083687eee1c18'
  const message = 'Some test message'

  const mockData = {
    _id: '64991dfb7d0083687eee1c18',
    author: {},
    post: '123321',
    parent: '3123123',
    children: [],
    likes: [],
    message: 'Some test message',
    created_at: '11.09.2022',
    updated_at: '11.09.2022',
  }

  test('dispatches the correct actions when comment updated', async () => {
    // Return 200 with mocked data

    axiosMock.onPatch(`/comment/${commentId}/updateComment`, { message, commentId }).reply(200, mockData)

    const expectedActions = [
      {
        type: UPDATE_COMMENT,
        payload: {
          comment: {
            ...mockData,
          },
        },
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            key: '11',
            message: 'Comment successfully updated!',
            options: {
              variant: 'success',
            },
          },
        },
      },
      {
        type: SET_LOADING_COMMENT,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(updateCommentThunk(() => {}, message, commentId) as unknown as AnyAction)

    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[2]).toEqual(expectedActions[2])

    expect(store.getActions()[1].notification.message).toEqual(
      expectedActions[1].payload?.notification?.message
    )
    expect(store.getActions()[1].notification.options).toEqual(
      expectedActions[1].payload?.notification?.options
    )
  })

  test('dispatches the correct actions when comment update failed', async () => {
    // Return error

    axiosMock.onPatch(`/comment/${commentId}/updateComment`, { message, commentId }).networkError()

    const expectedActions = [
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while updating',
            options: {
              variant: 'error',
            },
          },
        },
      },
      {
        type: SET_LOADING_COMMENT,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(updateCommentThunk(() => {}, message, commentId) as unknown as AnyAction)

    expect(store.getActions()[1]).toEqual(expectedActions[1])

    expect(store.getActions()[0].notification.message).toEqual(
      expectedActions[0].payload?.notification?.message
    )
    expect(store.getActions()[0].notification.options).toEqual(
      expectedActions[0].payload?.notification?.options
    )
  })
})
