import { render, screen } from '@testing-library/react'
import RecommendCard from './RecommendCard'
import { RecommendCardT } from './types'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'

const mockedInitialProps = {
  author: {
    _id: 'test author',
    name: 'test name',
    imageUrl: 'test img',
  },
  date: '7/30/2023',
  img: 'test url',
  title: 'Test title',
  _id: 'test id',
  isFetchingPosts: false,
}

describe('PostPageFooter Component', () => {
  const renderComponent = (mockedProps: RecommendCardT) => {
    const reducers = combineReducers({
      post: (state = {}) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })

    return render(
      <Provider store={mockedStore}>
        <MemoryRouter initialEntries={['/recommendCard']}>
          <Routes>
            <Route path='/recommendCard' element={<RecommendCard {...mockedProps} />} />
            <Route path={`/blog/post/${mockedInitialProps._id}`} element={<div>Test post</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    )
  }

  test('should render correct components', () => {
    renderComponent(mockedInitialProps)

    const recommendElement = screen.getByLabelText('recommend-card')
    const imgElement = screen.getByAltText(mockedInitialProps.title)
    const titleElement = screen.getByText(mockedInitialProps.title)
    const dateElement = screen.getByText(new Date(mockedInitialProps.date).toLocaleDateString())
    const nameElement = screen.getByText(mockedInitialProps.author.name)

    expect(recommendElement).toBeInTheDocument()
    expect(imgElement).toBeInTheDocument()
    expect(titleElement).toBeInTheDocument()
    expect(dateElement).toBeInTheDocument()
    expect(nameElement).toBeInTheDocument()
  })

  test('should not render nothing but skeletons', () => {
    renderComponent({
      ...mockedInitialProps,
      isFetchingPosts: true,
    })

    const recommendElement = screen.getByLabelText('recommend-card')
    const imgElement = screen.queryByAltText(mockedInitialProps.title)
    const titleElement = screen.queryByText(mockedInitialProps.title)
    const dateElement = screen.queryByText(new Date(mockedInitialProps.date).toLocaleDateString())
    const nameElement = screen.queryByText(mockedInitialProps.author.name)

    expect(recommendElement).toBeInTheDocument()
    expect(imgElement).not.toBeInTheDocument()
    expect(titleElement).not.toBeInTheDocument()
    expect(dateElement).not.toBeInTheDocument()
    expect(nameElement).not.toBeInTheDocument()
  })

  test('should redirect to /blog/post/id', () => {
    renderComponent(mockedInitialProps)

    const recommendElement = screen.getByRole('button')

    userEvent.click(recommendElement)

    const postElement = screen.getByText('Test post')

    expect(postElement).toBeInTheDocument()
  })

  test('should add styles on hover', async () => {
    renderComponent(mockedInitialProps)

    const recommendElement = screen.getByLabelText('recommend-card')

    expect(recommendElement).toBeInTheDocument()
    expect(recommendElement).toHaveStyle('box-shadow: none')

    // Simulate a mouse hover event on the element
    await userEvent.hover(recommendElement)

    // Check style after hover, box shadow should not be 'none'
    expect(recommendElement).not.toHaveStyle('box-shadow: none')

    // Simulate a mouse unhover event on the element
    await userEvent.unhover(recommendElement)
    expect(recommendElement).toHaveStyle('box-shadow: none')
  })


})
