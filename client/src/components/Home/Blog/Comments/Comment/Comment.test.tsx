import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Comment from './Comment'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { useAppDispatch } from '../../../../../hooks/hooks'
import { addCommentThunk } from '../../../../../actions/commentAction'
import { modalActions } from '../../../../../actions/modalAction'
import { MODAL_TYPE } from '../../../../../reducers/modal/types'
import { CommentProps } from './types'

// Mock Redux hooks
jest.mock('../../../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))

jest.mock('../../../../../actions/modalAction', () => ({
  modalActions: {
    openModalAC: jest.fn(),
  },
}))

jest.mock('../../../../../actions/commentAction', () => ({
  addCommentThunk: jest.fn(),
  deleteCommentThunk: jest.fn(),
  likeCommentThunk: jest.fn(),
  updateCommentThunk: jest.fn(),
  commentActions: {
    setLikeCommentAC: jest.fn(),
  },
}))

const mockedInitialState = {
  post: {
    _id: 'test post Id',
  },
  user: {
    user: {
      email: 'testEmail',
      id: 'testId',
      name: 'testName',
      isActivated: true,
    },
  },
}

const mockedInitialProps = {
  _id: 'test comment id',
  author: {
    _id: 'test Author id',
    name: 'test Author name',
    imageUrl: '',
  },
  post: 'Test post id',
  children: [],
  likes: [],
  message: 'Test message',
  created_at: new Date('2023-05-21T00:15:39.043Z'),
  updated_at: new Date('2023-05-21T00:15:39.043Z'),
  getReplies: (parentId: string) => ([]),
}

describe('Comment Component', () => {
  // Mocking Redux store and other dependencies
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedState: any, mockedProps: CommentProps) => {
    const reducers = combineReducers({
      post: (state = mockedState.post) => state,
      user: (state = mockedState.user) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <Comment {...mockedProps} />
      </Provider>,
    )
  }

  test('renders comment message correctly', () => {
    renderComponent(mockedInitialState, mockedInitialProps)

    const createdDate = mockedInitialProps.created_at.toLocaleString()

    const authorName = screen.getByText(mockedInitialProps.author.name)
    const message = screen.getByText(mockedInitialProps.message)
    const repliesButton = screen.queryByRole('button', { name: 'Show Replies' })
    const date = screen.getByText(createdDate)


    expect(authorName).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    expect(repliesButton).not.toBeInTheDocument()
    expect(date).toBeInTheDocument()
  })

  test('should open replay form and submits a comment if the user exists and account is activated', async () => {
    renderComponent(mockedInitialState, mockedInitialProps)

    const actionsButton = screen.getByLabelText('SpeedDial controlled open example')
    await act(async () => {
      const delay = new Promise((res) => {
        setTimeout(() => res(''), 500)
      })
      fireEvent.mouseEnter(actionsButton)
      await delay
    })

    const replayElement = screen.getByLabelText('Reply')
    await userEvent.click(replayElement)

    await waitFor(() => {
      const formElement = screen.getByLabelText('comment-form')
      expect(formElement).toBeInTheDocument()

    })

    const buttonElement = screen.getByRole('button', { name: 'Comment' })
    const textareaElement = screen.getByRole('textbox')

    // Type a comment in the textarea
    await act(async () => {
      userEvent.type(textareaElement, 'Test comment')

      // Click the "Comment" button
      await userEvent.click(buttonElement)
    })

    // Assert that the comment is submitted
    await waitFor(() => {
      // Assert that createPostThunk is called with the correct values
      expect(addCommentThunk).toHaveBeenCalledWith(expect.any(Function), 'Test comment', 'test post Id', 'test comment id')
    })
  })

  test('should show error when user does not activated account', async () => {
    renderComponent({
        ...mockedInitialState,
        user: {
          user: {
            ...mockedInitialState.user.user,
            isActivated: false,
          },
        },
      },
      mockedInitialProps)

    const actionsButton = screen.getByLabelText('SpeedDial controlled open example')
    await act(async () => {
      const delay = new Promise((res) => {
        setTimeout(() => res(''), 500)
      })
      fireEvent.mouseEnter(actionsButton)
      await delay
    })

    const replayElement = screen.getByLabelText('Reply')
    await userEvent.click(replayElement)

    await waitFor(() => {
      const formElement = screen.getByLabelText('comment-form')
      expect(formElement).toBeInTheDocument()

    })

    const buttonElement = screen.getByRole('button', { name: 'Comment' })
    const textareaElement = screen.getByRole('textbox')

    // Type a comment in the textarea
    await act(async () => {
      userEvent.type(textareaElement, 'Test comment')

      // Click the "Comment" button
      await userEvent.click(buttonElement)
    })

    // Assert that the comment is submitted
    await waitFor(() => {
      expect(modalActions.openModalAC).toHaveBeenCalledWith(MODAL_TYPE.ACTIVATE_ACCOUNT_INFO)
    })
  })
})
