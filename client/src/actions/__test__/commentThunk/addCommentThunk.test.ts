import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { addCommentThunk } from '../../commentAction'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import {
  ADD_COMMENT,
  SET_COUNT_COMMENTS,
  SET_LOADING_COMMENT,
} from '../../../reducers/comment/commentReducer'
import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('addCommentThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })
  const message = 'Test'
  const postId = '123321'
  const parentId = '3123123'

  const mockData = {
    comment: {
      _id: '64991dfb7d0083687eee1c18',
      author: {},
      post: '123321',
      parent: '3123123',
      children: [],
      likes: [],
      message: 'Some test message',
      created_at: '11.09.2022',
      updated_at: '11.09.2022',
    },
  }

  test('dispatches the correct actions when comment added', async () => {
    // Return 200 with mocked data

    axiosMock.onPost(`/comment/${postId}/addComment`, { message, parentId }).reply(200, mockData)

    const expectedActions = [
      {
        type: SET_LOADING_COMMENT,
        flag: true,
      },
      {
        type: ADD_COMMENT,
        payload: {
          comment: {
            ...mockData,
          },
        },
      },
      {
        type: SET_COUNT_COMMENTS,
        payload: {
          commentsCount: 1,
        },
      },
      {
        type: SET_LOADING_COMMENT,
        flag: false,
      },
    ]

    const store = mockStore({
      comment: {
        commentsCount: 0,
      },
    })

    // Dispatch the thunk action
    await store.dispatch(addCommentThunk(() => {}, message, postId, parentId) as unknown as AnyAction)

    expect(store.getActions()).toEqual(expectedActions)
  })

  test('dispatches the correct actions when comment failed', async () => {
    // Return error

    axiosMock.onPost(`/comment/${postId}/addComment`, { message, parentId }).networkError()

    const expectedActions = [
      {
        type: SET_LOADING_COMMENT,
        flag: true,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while commenting',
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
    await store.dispatch(addCommentThunk(() => {}, message, postId, parentId) as unknown as AnyAction)

    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[2]).toEqual(expectedActions[2])

    expect(store.getActions()[1].notification.message).toEqual(
      expectedActions[1].payload?.notification.message
    )
    expect(store.getActions()[1].notification.options).toEqual(
      expectedActions[1].payload?.notification.options
    )
  })
})
