import React from 'react'
import { render, screen } from '@testing-library/react'
import { useAppDispatch } from '../../../../hooks/hooks'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { MemoryRouter, Route, Routes } from 'react-router-dom'
import PostPageFooter from './PostPageFooter'
import userEvent from '@testing-library/user-event'
import { likePostThunk, postActions } from '../../../../actions/postAction'

// Mock Redux hooks
jest.mock('../../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))

jest.mock('../../../../actions/postAction', () => ({
  postActions: {
    setLikestAC: jest.fn(),
  },
  likePostThunk: jest.fn(),
}))

const mockedInitialState = {
  post: {
    _id: 'test post Id',
    author: {
      _id: 'testId',
      name: 'test author name',
      imageUrl: 'test author imageUrl',
    },
    title: 'test title',
    date: new Date(' 8/30/2023'),
    content: 'test content',
    img: 'test img',
    likes: [],
  },
  user: {
    user: {
      id: 'testId',
    },
  },
  comment: {
    commentsCount: 3,
  },
}

// Mock the PostPageFooter component
jest.mock('../Comments/Comments', () => {
  return {
    __esModule: true,
    default: () => <div data-testid='mock-comments'>Mock Comments</div>,
  }
})

describe('PostPageFooter Component', () => {
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
        <MemoryRouter initialEntries={['/postPageFooter']}>
          <Routes>
            <Route path='/postPageFooter' element={<PostPageFooter />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  }

  test('should render correct components', () => {
    renderComponent(mockedInitialState)

    const commentCountElement = screen.getByRole('heading', { level: 3, name: /3 Comments/i })
    const shareElement = screen.getByText('Share')
    const commentsElement = screen.getByText('Mock Comments')

    expect(commentCountElement).toBeInTheDocument()
    expect(shareElement).toBeInTheDocument()
    expect(commentsElement).toBeInTheDocument()
  })

  test('should render correct ending', () => {
    renderComponent({
      ...mockedInitialState,
      comment: {
        commentsCount: 1,
      },
    })

    const commentCountElement = screen.getByRole('heading', { level: 3, name: /1 Comment/i })

    expect(commentCountElement).toBeInTheDocument()
  })

  test('should trigger correct callbacks', () => {
    renderComponent(mockedInitialState)

    const likeElement = screen.getByRole('checkbox')

    expect(likeElement).toBeInTheDocument()

    userEvent.click(likeElement)

    expect(postActions.setLikestAC).toHaveBeenCalledWith(mockedInitialState.user.user.id)
    expect(likePostThunk).toHaveBeenCalledWith(mockedInitialState.post._id)
  })
})
