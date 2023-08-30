import React from 'react'
import { render, screen } from '@testing-library/react'
import { useAppDispatch } from '../../../../hooks/hooks'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import PostPage from './PostPage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

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

jest.mock('../../../../actions/postAction', () => ({
  postActions: {
    resetPostAC: jest.fn(),
  },
  getCertainPostThunk: jest.fn(),
}))

// Mock the PostPageFooter component
jest.mock('../PostPageFooter/PostPageFooter', () => {
  return {
    __esModule: true,
    default: () => <div data-testid='mock-post-page-footer'>Mock PostPageFooter</div>,
  }
})

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
    relatedPosts: [
      {
        img: 'test related img',
        title: 'test related title',
        _id: 'test related id',
        date: new Date(' 7/30/2023'),
        author: {
          _id: 'test related author id',
          name: 'test related author name',
          imageUrl: 'test related author imageUrl',
        },
        isFetchingPosts: false,
      },
    ],
    isFetchingRelatedPosts: false,
    isFetchingPost: false,
  },
  user: {
    user: {
      email: 'testEmail',
      id: 'testId',
      name: 'testName',
      isActivated: true,
      imageUrl: '',
    },
  },
}

describe('PostPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedState: any) => {
    const reducers = combineReducers({
      post: (state = mockedState.post) => state,
      user: (state = mockedState.user) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })

    return render(
      <Provider store={mockedStore}>
        <MemoryRouter initialEntries={['/posts/1']}>
          <Routes>
            <Route path='/posts/:id' element={<PostPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  }

  test('should render correct components', async () => {
    renderComponent(mockedInitialState)

    //title use twice in h2 and breadcrumbs
    const titleElement = screen.getAllByText(mockedInitialState.post.title)
    const avatarElement = screen.getByLabelText('post-author')
    const nameElement = screen.getByText(mockedInitialState.post.author.name)
    const dateElement = screen.getByText(mockedInitialState.post.date.toLocaleDateString())
    const editButton = screen.getByRole('button', { name: 'Edit' })
    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    const previewElement = screen.getByLabelText('post preview')
    const shareGroupElement = screen.getByLabelText('share-group')
    const relatedElement = screen.getByText('You may like this too')
    const postPageFooterElement = screen.getByText('Mock PostPageFooter')
    const recommendElement = screen.getAllByLabelText('recommend-card')

    expect(titleElement.length).toBe(2)
    expect(recommendElement.length).toBe(1)
    expect(avatarElement).toBeInTheDocument()
    expect(nameElement).toBeInTheDocument()
    expect(dateElement).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
    expect(shareGroupElement).toBeInTheDocument()
    expect(previewElement).toBeInTheDocument()
    expect(relatedElement).toBeInTheDocument()
    expect(postPageFooterElement).toBeInTheDocument()
  })

  test('should render skeleton', async () => {
    renderComponent({
      ...mockedInitialState,
      post: {
        ...mockedInitialState.post,
        isFetchingPost: true,
      },
    })

    const skeletonElement = screen.getByLabelText('skeleton post page')

    expect(skeletonElement).toBeInTheDocument()
  })

  test('should render first letter of name', async () => {
    renderComponent({
      ...mockedInitialState,
      post: {
        ...mockedInitialState.post,
        author: {
          ...mockedInitialState.post.author,
          imageUrl: '',
        },
      },
    })

    const avatarElement = screen.getByText(mockedInitialState.user.user.name[0].toUpperCase())

    expect(avatarElement).toBeInTheDocument()
  })

  test('should not render edit and delete buttons', async () => {
    renderComponent({
      ...mockedInitialState,
      post: {
        ...mockedInitialState.post,
        author: {
          ...mockedInitialState.post.author,
          _id: 'test',
        },
      },
    })

    const editButton = screen.queryByRole('button', { name: 'Edit' })
    const deleteButton = screen.queryByRole('button', { name: 'Delete' })

    expect(editButton).not.toBeInTheDocument()
    expect(deleteButton).not.toBeInTheDocument()
  })

  test('should not render image and content while fetching post', async () => {
    renderComponent({
      ...mockedInitialState,
      post: {
        ...mockedInitialState.post,
        isFetchingPost: true,
      },
    })

    const imgElement = screen.queryByLabelText('post preview')
    const contentElement = screen.queryByLabelText('content')

    expect(imgElement).not.toBeInTheDocument()
    expect(contentElement).not.toBeInTheDocument()
  })

  test('should render skeleton while fetching recommended posts', async () => {
    renderComponent({
      ...mockedInitialState,
      post: {
        ...mockedInitialState.post,
        isFetchingRelatedPosts: true,
      },
    })

    const element = screen.queryByText('You may like this too')

    expect(element).not.toBeInTheDocument()
  })
})
