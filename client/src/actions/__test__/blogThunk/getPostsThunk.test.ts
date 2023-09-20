import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { getPostsThunk } from '../../blogAction'
import { FETCH_POSTS, SET_FETCHING_POSTS } from '../../../reducers/blog/blogReducer'
import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { API } from '../../../api'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getPostsThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })

  test('dispatches the correct actions when posts received', async () => {
    // Return 200 with mocked data
    const searchQuery = ''
    const sortQuery = 0
    const page = 0

    const mockData = {
      posts: [
        {
          _id: '64991dfb7d0083687eee1c18',
          title: 'Simplify Your React Snackbar Implementation with Notistack',
          description:
            'Snackbar notifications are an essential component in web applications for displaying important messages or alerts to users.',
          img: 'test',
          likesCount: 1,
        },
      ],
      allPages: 1,
    }
    axiosMock
      .onGet(`/posts?page=${page}&searchQuery=${searchQuery}&sortQuery=${sortQuery}`)
      .reply(200, mockData)

    const expectedActions = [
      {
        type: SET_FETCHING_POSTS,
        flag: true,
      },
      {
        type: FETCH_POSTS,
        payload: {
          ...mockData,
        },
      },
      {
        type: SET_FETCHING_POSTS,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(getPostsThunk(searchQuery, sortQuery, page) as unknown as AnyAction)

    expect(store.getActions()).toEqual(expectedActions)
  })

  test('dispatches the correct actions when posts failed', async () => {
    // Return error
    const searchQuery = ''
    const sortQuery = 0
    const page = 0

    axiosMock
      .onGet(`/posts?page=${page}&searchQuery=${searchQuery}&sortQuery=${sortQuery}`)
      .networkError()

    const expectedActions = [
      {
        type: SET_FETCHING_POSTS,
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
        type: SET_FETCHING_POSTS,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(getPostsThunk(searchQuery, sortQuery, page) as unknown as AnyAction)

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
