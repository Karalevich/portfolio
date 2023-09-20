import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

import { deletePostThunk } from '../../blogAction'
import { DELETE } from '../../../reducers/blog/blogReducer'
import { ENQUEUE_SNACKBAR } from '../../../reducers/notistack/notistackReducer'
import { AnyAction } from 'redux'
import { API } from '../../../api'

// Create axios mock
const axiosMock = new MockAdapter(API)

// Mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// Mock the NavigateFunction
const mockNavigate = jest.fn()

describe('deletePostThunk', () => {
  afterEach(() => {
    axiosMock.reset()
  })

  test('dispatches the correct actions when deleting a post succeeds', async () => {
    // Return 200 with mocked data
    const mockId = 'postId'
    axiosMock.onDelete('posts/postId').reply(200)

    const expectedActions = [
      {
        type: DELETE,
        id: mockId,
      },
      {
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Post successfully deleted!',
            options: {
              variant: 'success',
            },
          },
        },
      },
    ]

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(deletePostThunk(mockId, mockNavigate) as unknown as AnyAction)

    expect(store.getActions()[0]).toEqual(expectedActions[0])

    expect(store.getActions()[1].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[1].notification.message).toEqual(
      expectedActions[1].payload?.notification.message
    )
    expect(store.getActions()[1].notification.options).toEqual(
      expectedActions[1].payload?.notification.options
    )

    expect(mockNavigate).toHaveBeenCalledWith('/blog')
  })

  test('dispatches the correct actions when deleting a post fails', async () => {
    // Return error
    const mockId = 'postId'
    axiosMock.onDelete('posts/postId').networkError()

    const expectedAction = {
      type: ENQUEUE_SNACKBAR,
      payload: {
        notification: {
          message: 'Sorry, there was an error while deleting post',
          options: {
            variant: 'error',
          },
        },
      },
    }

    const store = mockStore()

    // Dispatch the thunk action
    await store.dispatch(deletePostThunk(mockId, mockNavigate) as unknown as AnyAction)

    expect(store.getActions()[0].type).toEqual(ENQUEUE_SNACKBAR)
    expect(store.getActions()[0].notification.message).toEqual(
      expectedAction.payload?.notification.message
    )
    expect(store.getActions()[0].notification.options).toEqual(
      expectedAction.payload?.notification.options
    )
  })
})
