import React from 'react'
import { render } from '@testing-library/react'
import AxiosInterceptor from './AxiosInterceptor'
import { API } from '../../api'
import { store } from '../../reducers/store'
import { Provider } from 'react-redux'

jest.mock('../../actions/userAction')
jest.mock('../../actions/modalAction')
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('AxiosInterceptor Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <AxiosInterceptor>Test</AxiosInterceptor>
      </Provider>
    )
  }

  test('should set interceptors on mount and remove on unmount', () => {
    const interceptorsResponseUseMock = jest.spyOn(API.interceptors.response, 'use')
    const interceptorsResponseEjectMock = jest.spyOn(API.interceptors.response, 'eject')

    const { unmount } = renderComponent()

    expect(interceptorsResponseUseMock).toHaveBeenCalledTimes(1)
    unmount()
    expect(interceptorsResponseEjectMock).toHaveBeenCalledTimes(1)
  })

  // TODO
  // test('should handle specific error codes correctly', async () => {
  //   const mockDispatch = jest.fn();
  //
  //   (userActions.setErrSignInMessageAC as jest.Mock).mockReturnValue({ type: 'SET_ERROR_SIGN_IN_MESSAGE' });
  //
  //   renderComponent();
  //
  //   // Simulate an error response with specific error codes
  //   const errorResponse = {
  //     response: {
  //       data: {
  //         code: 4011,
  //         message: 'Unauthorized',
  //       },
  //     },
  //   };
  //   (API.get as jest.Mock).mockReturnValue(errorResponse)
  //   await fetchCertainPost('is')
  //
  //   // Assert dispatch functions are called with correct messages
  //   expect(API.get).toHaveBeenCalled();
  //   expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_ERROR_SIGN_IN_MESSAGE', payload: 'Unauthorized' })
  //
  // })
})
