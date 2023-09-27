import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { API } from '../../../api'
import { createPostThunk } from '../../postAction'
import { SET_FETCHING_FORM } from '../../../reducers/post/postReducer'
import { CREATE } from '../../../reducers/blog/blogReducer'
import { FileWithPath } from 'react-dropzone'

// Create axios mock
const axiosMock = new MockAdapter(API)
const mockNavigate = jest.fn()
const mockFile = new File(['file contents'], 'file1.png', { type: 'image/png' }) as FileWithPath

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('createPostThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })

  const mockData = {
    img: [mockFile],
    title: 'Title',
    description: 'description',
    _id: '122212',
    content: 'content',
    tags: ['tag'],
  }

  test('dispatches the correct actions when post created', async () => {
    // Return 200 with mocked data
    axiosMock.onPost('/posts').reply(200, mockData)

    const expectedActions = [
      {
        type: SET_FETCHING_FORM,
        flag: true,
      },
      {
        type: CREATE,
        payload: {
          ...mockData,
          img: [{}],
        },
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Post successfully created!',
            options: {
              variant: 'success',
            },
          },
        },
      },
      {
        type: SET_FETCHING_FORM,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(createPostThunk(mockData, mockNavigate) as unknown as AnyAction)
    expect(store.getActions()[0]).toEqual(expectedActions[0])
    expect(store.getActions()[1]).toEqual(expectedActions[1])
    expect(store.getActions()[3]).toEqual(expectedActions[3])

    expect(store.getActions()[2].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[2].notification.message).toEqual(
      expectedActions[2].payload?.notification?.message
    )
    expect(store.getActions()[2].notification.options).toEqual(
      expectedActions[2].payload?.notification?.options
    )
    expect(mockNavigate).toHaveBeenCalledWith('/blog')
  })

  test('dispatches the correct actions when creation of post failed', async () => {
    // Return error

    axiosMock.onPost('/posts').networkError()

    const expectedActions = [
      {
        type: SET_FETCHING_FORM,
        flag: true,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Sorry, there was an error while creating post',
            options: {
              variant: 'error',
            },
          },
        },
      },
      {
        type: SET_FETCHING_FORM,
        flag: false,
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(createPostThunk(mockData, mockNavigate) as unknown as AnyAction)

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
