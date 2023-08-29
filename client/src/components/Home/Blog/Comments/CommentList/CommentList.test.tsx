import { render, screen } from '@testing-library/react'
import CommentList from './CommentList'
import { CommentListProps } from './types'
import { useAppDispatch } from '../../../../../hooks/hooks'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'

// Mock Redux hooks
jest.mock('../../../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
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
  comments: [
    {
      _id: '6492412baf92bbd0b161c77c',
      message: 'Thank you so much :)',
      author: { _id: '6477f0fb9bfa48073dcbd26b', name: 'Andrei Karalevich', imageUrl: '' },
      post: '6483c7419199bba8b90cbf01',
      parent: '6492403faf92bbd0b161c760',
      children: [],
      likes: ['64769e4fa10f0ce7324a50fe'],
      created_at: new Date(),
      updated_at: new Date(),
      __v: 3,
    },
    {
      _id: '6492403faf92bbd0b161c760',
      message: 'Great article! keep it up ;)',
      author: { _id: '64923facaf92bbd0b161c730', name: 'John Doe', imageUrl: '' },
      post: '6483c7419199bba8b90cbf01',
      children: [],
      likes: ['6477f0fb9bfa48073dcbd26b', '64769e4fa10f0ce7324a50fe', '649e11ed4f8f4ee2d1fb268c'],
      created_at: new Date(),
      updated_at: new Date(),
      __v: 4,
    },
  ],
  getReplies: jest.fn(),
}

describe('CommentList Component', () => {
  // Mocking Redux store and other dependencies
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedState: any, mockedProps: CommentListProps) => {
    const reducers = combineReducers({
      post: (state = mockedState.post) => state,
      user: (state = mockedState.user) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <CommentList {...mockedProps} />,
      </Provider>
    )
  }

  test('should render correct elements', () => {
    renderComponent(mockedInitialState, mockedInitialProps)
    const commentElements = screen.getAllByLabelText('comment')
    const wrapperElements = screen.getByLabelText('comment-list')

    expect(wrapperElements).toBeInTheDocument()

    expect(commentElements.length).toBe(2)
  })
})
