import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import { getPostsByTagsThunk } from '../../postAction'
import { SET_FETCHING_RELATED_POSTS, SET_RELATED_POST } from '../../../reducers/post/postReducer'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getPostsByTagsThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })
  const tags = 'test'
  const mockData = {
    posts: [
      {
        img: 'test img',
        title: 'test title',
        _id: '123321',
        date: '02/03/2012',
        author: {
          name: 'test name',
        },
      },
    ],
  }

  test('dispatches the correct actions when related posts received', async () => {
    // Return 200 with mocked data

    axiosMock.onGet(`/posts/tags?searchQuery=${tags}`).reply(200, mockData)

    const expectedActions = [
      {
        type: SET_FETCHING_RELATED_POSTS,
        flag: true,
      },
      {
        type: SET_RELATED_POST,
        payload: {
          posts: {
            ...mockData,
          },
        },
      },
      {
        type: SET_FETCHING_RELATED_POSTS,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(getPostsByTagsThunk(tags) as unknown as AnyAction)

    expect(store.getActions()).toEqual(expectedActions)
  })

  test('dispatches the correct actions when related posts failed', async () => {
    // Return error

    axiosMock.onGet(`/posts/tags?searchQuery=${tags}`).networkError()

    const expectedActions = [
      {
        type: SET_FETCHING_RELATED_POSTS,
        flag: true,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while fetching posts',
            options: {
              variant: 'error',
            },
          },
        },
      },
      {
        type: SET_FETCHING_RELATED_POSTS,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(getPostsByTagsThunk(tags) as unknown as AnyAction)

    expect(store.getActions()[0]).toEqual(expectedActions[0])

    expect(store.getActions()[1].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[1].notification.message).toEqual(
      expectedActions[1].payload?.notification.message
    )
    expect(store.getActions()[1].notification.options).toEqual(
      expectedActions[1].payload?.notification.options
    )
  })
})
