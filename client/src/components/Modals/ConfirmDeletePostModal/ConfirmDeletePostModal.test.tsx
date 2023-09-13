import { render, fireEvent, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { useAppDispatch } from '../../../hooks/hooks'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ConfirmDeletePostModal from './ConfirmDeletePostModal'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { deletePostThunk } from '../../../actions/blogAction'

// Mock Redux hooks
jest.mock('../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))

jest.mock('../../../actions/blogAction', () => ({
  deletePostThunk: jest.fn(),
}))

const initialMockedState = {
  _id: 'test id',
}

describe('ConfirmDeletePostModal component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedState: any) => {
    const reducers = combineReducers({
      post: (state = mockedState) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <MemoryRouter initialEntries={['/modal']}>
          <Routes>
            <Route path='/modal' element={<ConfirmDeletePostModal />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  }

  test('should render the ConfirmDeletePostModal component with the correct content', () => {
    renderComponent(initialMockedState)

    // Check if the description contains the user's email
    expect(screen.getByText(/Are you sure you want to delete the post/)).toBeInTheDocument()

    // Check if the "Send" button is present
    expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument()
  })

  test('should call the dispatch function with the correct action when the "delete" button is clicked', () => {
    renderComponent(initialMockedState)
    const deleteButton = screen.getByText('delete')

    // Simulate a click on the "Send" button
    fireEvent.click(deleteButton)

    // Check if the dispatch function was called with the expected action
    expect(deletePostThunk).toHaveBeenCalledWith(initialMockedState._id, expect.any(Function))
  })
})
