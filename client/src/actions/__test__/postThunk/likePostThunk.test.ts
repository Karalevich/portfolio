import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import { likePostThunk } from '../../postAction'
import { SET_POST } from '../../../reducers/post/postReducer'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('likePostThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })

  const id = '123321'
  const mockData = {
    img: 'test',
    title: 'Title',
    description: 'description',
    _id: id,
    comments: [],
    likes: [],
    tags: [],
    content: 'test content',
    author: {
      _id: 'author id',
      name: 'test name',
      imageUrl: 'user img',
    },
    date: '11/9/2023',
  }

  test('dispatches the correct actions when post liked', async () => {
    // Return 200 with mocked data
    axiosMock.onPatch(`/posts/${id}/likePost`).reply(200, mockData)

    const expectedActions = [
      {
        type: SET_POST,
        payload: {
          post: {
            ...mockData,
          },
        },
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(likePostThunk(id) as unknown as AnyAction)
    expect(store.getActions()).toEqual(expectedActions)
  })

  test('dispatches the correct actions when liking of post failed', async () => {
    // Return error
    axiosMock.onPatch(`/posts/${id}/likePost`).networkError()

    const expectedActions = [
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
    await store.dispatch(likePostThunk(id) as unknown as AnyAction)

    expect(store.getActions()[0].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[0].notification.message).toEqual(
      expectedActions[0].payload?.notification.message
    )
    expect(store.getActions()[0].notification.options).toEqual(
      expectedActions[0].payload?.notification.options
    )
  })
})
