import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import Nav from './Navbar'
import { useAppDispatch } from '../../hooks/hooks'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { NavProps } from './types'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { notistackActions } from '../../actions/notistackAction'

// Mock Redux hooks
jest.mock('../../hooks/hooks', () => ({
  ...jest.requireActual('../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))

jest.mock('../../actions/notistackAction', () => ({
  notistackActions: {
    enqueueSnackbarAC: jest.fn(),
  },
}))

// Mock the useMediaQuery hook
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: () => false,
}))

// Mock the required props and dependencies
const props = {
  toggleNav: jest.fn(),
  isOpen: false,
}

describe('Nav component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedProps: NavProps) => {
    const reducers = combineReducers({
      user: (state = {}) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <MemoryRouter initialEntries={['/nav']}>
          <Routes>
            <Route path='/nav' element={<Nav {...mockedProps} />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  }

  test('toggles the drawer when clicking the switch theme button', async () => {
    renderComponent(props)
    const switchThemeButton = screen.getByRole('checkbox')

    fireEvent.click(switchThemeButton)

    // Assert that the toggleNav function is called with the expected value (true or false).
    // Also, check if the theme is updated accordingly.
    await waitFor(() => {
      expect(notistackActions.enqueueSnackbarAC).toHaveBeenCalledWith({
        message: 'Theme successfully changed',
        options: {
          variant: 'success',
        },
      })
    })
  })

  test('closes the drawer when clicking the close button', () => {
    jest.spyOn(require('@mui/material'), 'useMediaQuery').mockReturnValue(true)
    renderComponent({
      ...props,
      isOpen: true,
    })

    const presentation = screen.getByRole('presentation')
    fireEvent.click(presentation.children[0])

    // Assert that the toggleNav function is called with the value 'false'.
    expect(props.toggleNav).toHaveBeenCalledWith(false)
  })
})
