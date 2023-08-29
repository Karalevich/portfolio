import React from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import CommentTactics from './CommentTactics'
import { useAppDispatch } from '../../../../../hooks/hooks'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { CommentTacticsProps } from './types'

// Mock Redux hooks
jest.mock('../../../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))

const mockedInitialState = {
  user: {
    user: {
      id: 'testId',
    },
  },
}

const mockedInitialProps = {
  shareAction: jest.fn(),
  replayAction: jest.fn(),
  editAction: jest.fn(),
  deleteAction: jest.fn(),
  author: {
    _id: 'testId',
    name: 'test Author name',
    imageUrl: '',
  },
}

describe('CommentTactics Component', () => {
  // Mocking Redux store and other dependencies
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedState: any, mockedProps: CommentTacticsProps) => {
    const reducers = combineReducers({
      user: (state = mockedState.user) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <CommentTactics {...mockedProps} />
      </Provider>
    )
  }
  test('renders the component correctly', () => {
    renderComponent(mockedInitialState, mockedInitialProps)

    expect(screen.getByLabelText('SpeedDial controlled open example')).toBeInTheDocument()
  })

  test('opens the speed dial on click with 4 elements', async () => {
    renderComponent(mockedInitialState, mockedInitialProps)
    const buttonElement = screen.getByLabelText('SpeedDial controlled open example')

    await act(async () => {
      const delay = new Promise((res) => {
        setTimeout(() => res(''), 500)
      })
      fireEvent.mouseEnter(buttonElement)
      await delay
    })

    const menu = screen.getByRole('menu')
    expect(menu).toBeInTheDocument()

    const listActions = menu.querySelectorAll('button')
    expect(listActions.length).toBe(4)
  })

  test('opens the speed dial only with Share and Reply actions if user does not login', async () => {
    renderComponent(
      {
        user: {
          user: null,
        },
      },
      mockedInitialProps
    )
    const buttonElement = screen.getByLabelText('SpeedDial controlled open example')

    await act(async () => {
      const delay = new Promise((res) => {
        setTimeout(() => res(''), 500)
      })
      fireEvent.mouseEnter(buttonElement)
      await delay
    })

    const menu = screen.getByRole('menu')
    expect(menu).toBeInTheDocument()

    const listActions = menu.querySelectorAll('button')
    expect(listActions.length).toBe(2)

    expect(screen.getByLabelText('Share')).toBeInTheDocument()
    expect(screen.getByLabelText('Reply')).toBeInTheDocument()
  })

  test('calls the appropriate action on speed dial action click', async () => {
    renderComponent(mockedInitialState, mockedInitialProps)
    const buttonElement = screen.getByLabelText('SpeedDial controlled open example')

    await act(async () => {
      const delay = new Promise((res) => {
        setTimeout(() => res(''), 500)
      })
      fireEvent.mouseEnter(buttonElement)
      await delay
    })

    // Click on the "Edit" action
    const editAction = screen.getByLabelText('Edit')
    fireEvent.click(editAction)
    expect(mockedInitialProps.editAction).toHaveBeenCalled()

    // Click on the "Delete" action
    const deleteAction = screen.getByLabelText('Delete')
    fireEvent.click(deleteAction)
    expect(mockedInitialProps.deleteAction).toHaveBeenCalled()

    // Click on the "Share" action
    const shareAction = screen.getByLabelText('Share')
    fireEvent.click(shareAction)
    expect(mockedInitialProps.shareAction).toHaveBeenCalled()

    // Click on the "Replay" action
    const replayAction = screen.getByLabelText('Reply')
    fireEvent.click(replayAction)
    expect(mockedInitialProps.replayAction).toHaveBeenCalled()
  })
})
