import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { getCommentsThunk } from '../../commentAction'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import {
  SET_COMMENTS,
  SET_COUNT_COMMENTS,
  SET_FETCHING_COMMENTS,
  SET_PAGES_COUNT,
} from '../../../reducers/comment/commentReducer'
import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getCommentsThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })
  const postId = '123321'
  const page = 0
  const sortQuery = 0

  const mockData = {
    comments: {
      0: {
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
    },
    commentsCount: 1,
    pagesCount: 1,
  }

  test('dispatches the correct actions when comments received', async () => {
    // Return 200 with mocked data
    axiosMock.onGet(`/comment/${postId}?page=${page}&sortQuery=${sortQuery}`).reply(200, mockData)

    const expectedActions = [
      {
        type: SET_FETCHING_COMMENTS,
        flag: true,
      },
      {
        type: SET_COMMENTS,
        payload: {
          comments: {
            ...mockData.comments,
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
        type: SET_PAGES_COUNT,
        payload: {
          pagesCount: 1,
        },
      },
      {
        type: SET_FETCHING_COMMENTS,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(getCommentsThunk(postId, page, sortQuery) as unknown as AnyAction)

    expect(store.getActions()).toEqual(expectedActions)
  })

  test('dispatches the correct actions when comments failed', async () => {
    // Return error

    axiosMock.onGet(`/comment/${postId}?page=${page}&sortQuery=${sortQuery}`).networkError()

    const expectedActions = [
      {
        type: SET_FETCHING_COMMENTS,
        flag: true,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while fetching comments',
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
    await store.dispatch(getCommentsThunk(postId, page, sortQuery) as unknown as AnyAction)

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
