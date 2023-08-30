import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useAppDispatch } from '../../../../hooks/hooks'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import Filter from './Filter'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { blogActions, getPostsThunk } from '../../../../actions/blogAction'
import { modalActions } from '../../../../actions/modalAction'
import { MODAL_TYPE } from '../../../../reducers/modal/types'

// Mock Redux hooks
jest.mock('../../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))

jest.mock('../../../../actions/blogAction', () => ({
  blogActions: {
    setSortValueAC: jest.fn(),
    setSearchValueAC: jest.fn(),
    setCurrentPageAC: jest.fn(),
  },
  getPostsThunk: jest.fn(),
}))

jest.mock('../../../../actions/modalAction', () => ({
  modalActions: {
    openModalAC: jest.fn(),
  },
}))

// Mocking the IntersectionObserver since it's not available in the testing environment
// @ts-ignore
window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))

window.scrollTo = jest.fn()

const mockedInitialState = {
  blog: {
    searchValue: 'search test',
    sortValue: 1,
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

describe('Filter Component', () => {
  // Mocking Redux store and other dependencies
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedState: any) => {
    const reducers = combineReducers({
      blog: (state = mockedState.blog) => state,
      user: (state = mockedState.user) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })

    return render(
      <Provider store={mockedStore}>
        <MemoryRouter initialEntries={['/filter']}>
          <Routes>
            <Route path='/filter' element={<Filter />} />
            <Route path='/blog/addPost' element={<div>Page add post</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  }

  test('render filter correctly', () => {
    renderComponent(mockedInitialState)
    const formElement = screen.getByLabelText('filter')
    const iconElement = screen.getByTestId('SearchIcon')
    const inputElement = screen.getByPlaceholderText('Search…')
    const buttonElement = screen.getByRole('button', { name: 'Add post' })
    const dropdownElement = screen.getByLabelText('dropdown')

    expect(formElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
    expect(inputElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
    expect(dropdownElement).toBeInTheDocument()
  })

  test('should trigger correct actions during typing in search', async () => {
    renderComponent(mockedInitialState)
    const inputElement = screen.getByPlaceholderText('Search…')

    await userEvent.type(inputElement, 'test search')

    expect(inputElement).toBeInTheDocument()
    await waitFor(() => {
      expect(blogActions.setSearchValueAC).toHaveBeenCalled()
      expect(blogActions.setCurrentPageAC).toHaveBeenCalled()
      expect(getPostsThunk).toHaveBeenCalled()
    })
  })

  test('should trigger correct actions after clicking button', async () => {
    renderComponent(mockedInitialState)
    const buttonElement = screen.getByRole('button', { name: 'Add post' })
    expect(buttonElement).toBeInTheDocument()

    await userEvent.click(buttonElement)

    const redirect = screen.getByText('Page add post')

    expect(redirect).toBeInTheDocument()
  })

  test('should trigger correct actions after clicking button if user does not login', async () => {
    renderComponent({
      ...mockedInitialState,
      user: {
        user: {
          ...mockedInitialState.user.user,
          isActivated: false,
        },
      },
    })
    const buttonElement = screen.getByRole('button', { name: 'Add post' })
    expect(buttonElement).toBeInTheDocument()

    await userEvent.click(buttonElement)

    await waitFor(() => {
      expect(modalActions.openModalAC).toHaveBeenCalledWith(MODAL_TYPE.ACTIVATE_ACCOUNT_INFO)
    })
  })

  test('should trigger correct actions after selecting option in dropdown', async () => {
    renderComponent(mockedInitialState)

    const dropdownButton = screen.getByLabelText('Select display order')
    expect(dropdownButton).toBeInTheDocument()

    await userEvent.click(dropdownButton)

    const dropdownOption = screen.getByRole('button', { name: 'By title' })

    await userEvent.click(dropdownOption)

    await waitFor(() => {
      expect(blogActions.setCurrentPageAC).toHaveBeenCalledWith(1)
      expect(getPostsThunk).toHaveBeenCalledWith(
        mockedInitialState.blog.searchValue,
        mockedInitialState.blog.sortValue,
        1
      )
      expect(blogActions.setSortValueAC).toHaveBeenCalledWith(1)
    })
  })
})
