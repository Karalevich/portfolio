import React from 'react'
import { render } from '@testing-library/react'
import { useLocation } from 'react-router-dom'
import ScrollToTop from '../ScrollToTop'

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}))

// Mock window.scrollTo
const originalScrollTo = window.scrollTo
beforeAll(() => {
  window.scrollTo = jest.fn()
})

afterAll(() => {
  window.scrollTo = originalScrollTo
})

describe('ScrollToTop component', () => {
  beforeEach(() => {
    // Mock the useLocation hook to return a mock pathname
    ;(useLocation as jest.Mock).mockReturnValue({ pathname: '/example' })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should scroll to top when mounted', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo')
    render(<ScrollToTop />)

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  test('should scroll to top when pathname changes', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo')
    const { rerender } = render(<ScrollToTop />)

    // Rerender the component with a different pathname
    ;(useLocation as jest.Mock).mockReturnValue({ pathname: '/new-page' })
    rerender(<ScrollToTop />)

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
