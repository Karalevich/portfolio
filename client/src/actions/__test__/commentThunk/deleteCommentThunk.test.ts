import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { deleteCommentThunk } from '../../commentAction'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import {
  DELETE_COMMENT,
  SET_COUNT_COMMENTS,
  SET_FETCHING_COMMENTS,
} from '../../../reducers/comment/commentReducer'
import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('deleteCommentThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })
  const commentId = '64991dfb7d0083687eee1c18'

  const mockData = {
    commentId,
    commentsCount: 2,
  }

  test('dispatches the correct actions when comment deleted', async () => {
    // Return 200 with mocked data

    axiosMock.onDelete(`/comment/${commentId}`).reply(200, mockData)

    const expectedActions = [
      {
        type: SET_FETCHING_COMMENTS,
        flag: true,
      },
      {
        type: DELETE_COMMENT,
        payload: {
          commentId,
        },
      },
      {
        type: SET_COUNT_COMMENTS,
        payload: {
          commentsCount: mockData.commentsCount,
        },
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Comment successfully deleted!',
            options: {
              variant: 'success',
            },
          },
        },
      },

      {
        type: SET_FETCHING_COMMENTS,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(deleteCommentThunk(commentId) as unknown as AnyAction)

    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[1]).toEqual(expectedActions[1])
    expect(store.getActions()[2]).toEqual(expectedActions[2])
    expect(store.getActions()[4]).toEqual(expectedActions[4])

    expect(store.getActions()[3].notification.message).toEqual(
      expectedActions[3].payload?.notification?.message
    )
    expect(store.getActions()[3].notification.options).toEqual(
      expectedActions[3].payload?.notification?.options
    )
  })

  test('dispatches the correct actions when comment delete failed', async () => {
    // Return error
    axiosMock.onDelete(`/comment/${commentId}`).networkError()

    const expectedActions = [
      {
        type: SET_FETCHING_COMMENTS,
        flag: true,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while deleting',
            options: {
              variant: 'error',
            },
          },
        },
      },
      {
        type: SET_FETCHING_COMMENTS,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(deleteCommentThunk(commentId) as unknown as AnyAction)

    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[2]).toEqual(expectedActions[2])

    expect(store.getActions()[1].notification.message).toEqual(
      expectedActions[1].payload?.notification?.message
    )
    expect(store.getActions()[1].notification.options).toEqual(
      expectedActions[1].payload?.notification?.options
    )
  })
})
