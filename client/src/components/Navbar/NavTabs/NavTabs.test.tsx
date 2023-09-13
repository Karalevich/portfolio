import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import NavTabs from './NavTabs'
import { useAppDispatch } from '../../../hooks/hooks'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { NavTabsProps } from './types'
import { logOutThunk } from '../../../actions/userAction'
import { modalActions } from '../../../actions/modalAction'
import { MODAL_TYPE } from '../../../reducers/modal/types'

jest.mock('../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))
jest.mock('../../../actions/userAction', () => ({
  logOutThunk: jest.fn(),
}))

jest.mock('../../../actions/modalAction', () => ({
  modalActions: {
    openModalAC: jest.fn(),
  },
}))

const initialMockedProps = {
  className: 'tests class',
  closeDrawer: jest.fn(),
  handleSwitchTheme: jest.fn(),
  isLightTheme: true,
}

const initialMockedState = {
  user: {
    email: 'test@gmai.com',
    id: 'test id',
    name: 'test name',
    isActivated: true,
  },
  isFetchingLogout: false,
}

describe('NavTabs component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedProps: NavTabsProps, mockedState: any) => {
    const reducers = combineReducers({
      user: (state = mockedState) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <MemoryRouter initialEntries={['/nav']}>
          <Routes>
            <Route path='/nav' element={<NavTabs {...mockedProps} />} />
            <Route path='/services' element={<div>Mock Services</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  }

  test('displays "Log Out" when the user is logged in', () => {
    renderComponent(initialMockedProps, initialMockedState)
    expect(screen.getByText('Log Out')).toBeInTheDocument()
  })

  test('displays "Sign In" when the user is not logged in', () => {
    renderComponent(initialMockedProps, {
      ...initialMockedState,
      user: null,
    })

    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  test('calls logOutThunk when the "Log Out" button is clicked', () => {
    renderComponent(initialMockedProps, initialMockedState)

    const logOutButton = screen.getByRole('button', { name: 'Log Out' })

    fireEvent.click(logOutButton)
    expect(logOutThunk).toHaveBeenCalled()
  })

  test('calls openModalAC when the "Sign In" button is clicked', () => {
    renderComponent(initialMockedProps, {
      ...initialMockedState,
      user: null,
    })
    const signInButton = screen.getByRole('button', { name: 'Sign In' })

    fireEvent.click(signInButton)
    expect(modalActions.openModalAC).toHaveBeenCalledWith(MODAL_TYPE.AUTH)
  })

  test('calls navigate with the correct URL when a tab is clicked', () => {
    renderComponent(initialMockedProps, initialMockedState)
    const servicesTab = screen.getByRole('tab', { name: 'Services' })

    fireEvent.click(servicesTab)
    expect(screen.getByText('Mock Services')).toBeInTheDocument()
  })
})
