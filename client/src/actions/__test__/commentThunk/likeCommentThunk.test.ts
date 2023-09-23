import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { likeCommentThunk } from '../../commentAction'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import { SET_COMMENT_LIKE } from '../../../reducers/comment/commentReducer'
import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('likeCommentThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })
  const commentId = '64991dfb7d0083687eee1c18'
  const userId = '123123vxcvf123'

  test('dispatches the correct actions when comment like failed', async () => {
    // Return error
    axiosMock.onPatch(`/comment/${commentId}/likeComment`).networkError()

    const expectedActions = [
      {
        type: SET_COMMENT_LIKE,
        payload: {
          userId,
          commentId,
        },
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while liking',
            options: {
              variant: 'error',
            },
          },
        },
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(likeCommentThunk(userId, commentId) as unknown as AnyAction)

    expect(store.getActions()[0]).toEqual(expectedActions[0])

    expect(store.getActions()[1].notification.message).toEqual(
      expectedActions[1].payload?.notification?.message
    )
    expect(store.getActions()[1].notification.options).toEqual(
      expectedActions[1].payload?.notification?.options
    )
  })
})
