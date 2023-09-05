import { render, screen } from '@testing-library/react'
import { BlogProps } from './types'
import React from 'react'
import Blog from './Blog'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const mockedInitialProps = {
  isFullVersion: true,
}

const mockedInitialState = {
  posts: [
    {
      img: 'post test img 1',
      title: 'test title 1',
      description: 'test description 1',
      _id: 'test id 1',
    },
    {
      img: 'post test img 2',
      title: 'test title 2',
      description: 'test description 2',
      _id: 'test id 2',
    },
  ],
}

// Mock the Posts component
jest.mock('./Posts/Posts', () => {
  return {
    __esModule: true,
    default: () => <div data-testid='mock-posts'>Mock Posts</div>,
  }
})

// Mock the Filter component
jest.mock('./Filter/Filter', () => {
  return {
    __esModule: true,
    default: () => <div data-testid='mock-filter'>Mock Filter</div>,
  }
})

describe('Blog Component', () => {
  const renderComponent = (mockedState: any, mockedProps: BlogProps) => {
    const reducers = combineReducers({
      blog: (state = mockedState) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <Blog {...mockedProps} />
      </Provider>,
    )
  }

  test('should render correct components', () => {
    renderComponent(mockedInitialState, mockedInitialProps)

    const titleElement = screen.getByText('Blog')
    const postsElement = screen.getByTestId('mock-posts')
    const filterElement = screen.getByTestId('mock-filter')
    const carouselElement = screen.queryByLabelText('carousel')

    expect(titleElement).toBeInTheDocument()
    expect(postsElement).toBeInTheDocument()
    expect(filterElement).toBeInTheDocument()
    expect(carouselElement).not.toBeInTheDocument()
  })

  test('should wrap in  carousel wrapper', () => {
    renderComponent(mockedInitialState, { ...mockedInitialProps, isFullVersion: false })

    const carouselElement = screen.queryByLabelText('carousel')

    expect(carouselElement).toBeInTheDocument()
  })

})
