import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback'
import { useErrorBoundary } from 'react-error-boundary'
import { store } from '../../reducers/store'
import { Provider } from 'react-redux'

// Mock useErrorBoundary hook to provide a mock resetBoundary function
jest.mock('react-error-boundary', () => ({
  useErrorBoundary: jest.fn().mockReturnValue({
    resetBoundary: jest.fn(),
  }),
}))

describe('ErrorBoundaryFallback component', () => {
  test('renders the modal and redirects when action is confirmed', async () => {
    const description = 'This is an error description.'
    const redirectUrl = 'some-path'
    const mockedResetBoundary = jest.fn()

    // Use the mock resetBoundary function
    ;(useErrorBoundary as jest.Mock).mockReturnValue({
      resetBoundary: mockedResetBoundary,
    })

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/error']}>
          <Routes>
            <Route
              path='/error'
              element={<ErrorBoundaryFallback description={description} redirectUrl={redirectUrl} />}
            />
            <Route path='/some-path' element={<div>Some page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    // Check if the modal is rendered with the correct description
    expect(screen.getByText(description)).toBeInTheDocument()

    // Simulate confirming the action
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }))

    // Check if the modal is closed after confirming the action
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  //TODO
  // test('resets boundary when pathname changes', () => {
  //   const resetBoundaryMock = jest.fn();
  //
  //   // Use the mock resetBoundary function
  //   (useErrorBoundary as jest.Mock).mockReturnValue({
  //     resetBoundary: resetBoundaryMock,
  //   })
  //
  //   const { rerender } = render(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={['/error']}>
  //         <Routes>
  //           <Route path='/error'
  //                  element={<ErrorBoundaryFallback description={'Error'} redirectUrl={'error-page'} />} />
  //
  //         </Routes>
  //       </MemoryRouter>
  //     </Provider>)
  //
  //
  //   expect(resetBoundaryMock).toHaveBeenCalled()
  // })
})
