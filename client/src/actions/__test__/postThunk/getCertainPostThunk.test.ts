import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import { getCertainPostThunk } from '../../postAction'
import * as post from '../../postAction'
import { SET_FETCHING_CERTAIN_POST, SET_POST } from '../../../reducers/post/postReducer'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getCertainPostThunk', () => {
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

  test('dispatches the correct actions when certain post received', async () => {
    // Return 200 with mocked data
    // @ts-ignore
    jest
      .spyOn(post, 'getPostsByTagsThunk')
      .mockImplementationOnce(jest.fn().mockReturnValue({ type: 'TAGS' }))

    axiosMock.onGet(`/posts/${id}`).reply(200, mockData)

    const expectedActions = [
      {
        type: SET_FETCHING_CERTAIN_POST,
        flag: true,
      },
      {
        type: 'TAGS',
      },
      {
        type: SET_POST,
        payload: {
          post: {
            ...mockData,
          },
        },
      },
      {
        type: SET_FETCHING_CERTAIN_POST,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(post.getCertainPostThunk(id) as unknown as AnyAction)

    expect(store.getActions()).toEqual(expectedActions)
  })

  test('dispatches the correct actions when posts failed', async () => {
    // Return error

    axiosMock.onGet(`/posts/${id}`).networkError()

    const expectedActions = [
      {
        type: SET_FETCHING_CERTAIN_POST,
        flag: true,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while fetching post',
            options: {
              variant: 'error',
            },
          },
        },
      },
      {
        type: SET_FETCHING_CERTAIN_POST,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(post.getCertainPostThunk(id) as unknown as AnyAction)

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
