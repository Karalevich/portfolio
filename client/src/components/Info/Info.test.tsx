import { render, fireEvent, screen } from '@testing-library/react'
import Info from './Info'
import { InfoProps } from './types'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'

// Mock the useMediaQuery hook
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: () => false,
}))

const mockedToggleInfo = jest.fn()

const initialMockedProps = {
  isFixed: true,
  toggleInfo: mockedToggleInfo,
  isOpen: false,
}

describe('Info Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = (mockedProps: InfoProps) => {
    const reducers = combineReducers({
      post: (state = {}) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <Info {...mockedProps} />
      </Provider>
    )
  }

  test('renders without crashing', () => {
    renderComponent(initialMockedProps)

    const presentation = screen.queryByRole('presentation')
    expect(presentation).not.toBeInTheDocument()
  })

  test('renders InfoDrawer on mobile', () => {
    jest.spyOn(require('@mui/material'), 'useMediaQuery').mockReturnValue(true)

    renderComponent({ ...initialMockedProps, isOpen: true })

    const infoDrawer = screen.getByRole('presentation')
    expect(infoDrawer).toBeInTheDocument()
  })

  test('calls toggleInfo when Drawer is closed on mobile', () => {
    jest.spyOn(require('@mui/material'), 'useMediaQuery').mockReturnValue(true)

    renderComponent({ ...initialMockedProps, isOpen: true })

    const presentation = screen.getByRole('presentation')
    fireEvent.click(presentation.children[0])
    expect(mockedToggleInfo).toHaveBeenCalledWith(false)
  })
})
