import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Comments from './Comments'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { useAppDispatch } from '../../../../hooks/hooks'
import { addCommentThunk } from '../../../../actions/commentAction'
import { modalActions } from '../../../../actions/modalAction'
import { MODAL_TYPE } from '../../../../reducers/modal/types'

// Mock Redux hooks
jest.mock('../../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))

jest.mock('../../../../actions/modalAction', () => ({
  modalActions: {
    openModalAC: jest.fn(),
  },
}))

jest.mock('../../../../actions/commentAction', () => ({
  addCommentThunk: jest.fn(),
  getCommentsThunk: jest.fn(),
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
  comment: {
    isFetchingComments: false,
    isLoadingComment: false,
    comments: [],
  },
}

describe('Comments Component', () => {
  // Mocking Redux store and other dependencies
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedState: any) => {
    const reducers = combineReducers({
      post: (state = mockedState.post) => state,
      user: (state = mockedState.user) => state,
      comment: (state = mockedState.comment) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <Comments />
      </Provider>
    )
  }

  test('renders comment form and list', () => {
    renderComponent(mockedInitialState)

    const buttonElement = screen.getByRole('button', { name: 'Comment' })
    const textareaElement = screen.getByRole('textbox')

    // Assert that the comment form and list are rendered
    expect(buttonElement).toBeInTheDocument()
    expect(textareaElement).toBeInTheDocument()
  })

  test('should submits a comment is user exist account is activated', async () => {
    renderComponent(mockedInitialState)

    const buttonElement = screen.getByRole('button', { name: 'Comment' })
    const textareaElement = screen.getByRole('textbox')

    // Type a comment in the textarea
    await userEvent.type(textareaElement, 'Test comment')

    // Click the "Comment" button
    await userEvent.click(buttonElement)

    // Assert that the comment is submitted
    await waitFor(() => {
      // Assert that createPostThunk is called with the correct values
      expect(addCommentThunk).toHaveBeenCalledWith(expect.any(Function), 'Test comment', 'test post Id')
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
    })

    const buttonElement = screen.getByRole('button', { name: 'Comment' })
    const textareaElement = screen.getByRole('textbox')

    // Type a comment in the textarea
    await userEvent.type(textareaElement, 'Test comment')

    // Click the "Comment" button
    await userEvent.click(buttonElement)

    expect(modalActions.openModalAC).toHaveBeenCalledWith(MODAL_TYPE.ACTIVATE_ACCOUNT_INFO)
  })
  test('button should be disabled if user did not login', () => {
    renderComponent({
      ...mockedInitialState,
      user: {
        user: null,
      },
    })

    const buttonElement = screen.getByRole('button', { name: 'Comment' })

    expect(buttonElement).toBeDisabled()
  })
  test('commentGroupByParent should group in correct order', () => {
    const { container } = renderComponent({
      ...mockedInitialState,
      comment: {
        ...mockedInitialState.comment,
        comments: [
          {
            _id: '6492412baf92bbd0b161c77c',
            message: 'Thank you so much :)',
            author: { _id: '6477f0fb9bfa48073dcbd26b', name: 'Andrei Karalevich', imageUrl: '' },
            post: '6483c7419199bba8b90cbf01',
            parent: '6492403faf92bbd0b161c760',
            children: [],
            likes: ['64769e4fa10f0ce7324a50fe'],
            created_at: '2023-06-21T00:15:39.043Z',
            updated_at: '2023-07-08T23:25:20.087Z',
            __v: 3,
          },
          {
            _id: '6492403faf92bbd0b161c760',
            message: 'Great article! keep it up ;)',
            author: { _id: '64923facaf92bbd0b161c730', name: 'John Doe', imageUrl: '' },
            post: '6483c7419199bba8b90cbf01',
            children: ['6492412baf92bbd0b161c77c'],
            likes: ['6477f0fb9bfa48073dcbd26b', '64769e4fa10f0ce7324a50fe', '649e11ed4f8f4ee2d1fb268c'],
            created_at: '2023-06-21T00:11:43.074Z',
            updated_at: '2023-07-13T02:22:02.701Z',
            __v: 4,
          },
        ],
      },
    })

    const textElement1 = screen.getByText('Thank you so much :)')
    const textElement2 = screen.getByText('Great article! keep it up ;)')

    expect(textElement1).toBeInTheDocument()
    expect(textElement2).toBeInTheDocument()

    const messageElement = container.querySelector('[class*="message"]')
    const textElement = messageElement?.querySelector('[class*="commentMessage"]')

    // Assert that the main element contains a <p> element with the specified text
    expect(textElement).toContainElement(textElement2)

    const nestedComment = messageElement?.querySelector('[class*="nestedCommentsStack"]')

    expect(nestedComment).toContainElement(textElement1)
  })
})
