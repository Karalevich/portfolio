// Import required testing utilities
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // For jest-dom custom matchers
import Canvas from './Canvas'
import { animationConfetti } from '../../utils/animation'

// Mock the animationConfetti function to avoid unwanted side effects in tests
jest.mock('../../utils/animation', () => ({
  animationConfetti: jest.fn(),
}))

// Mock the confetti.create function to avoid canvas-confetti's side effects
jest.mock('canvas-confetti', () => ({
  create: jest.fn(),
}))

// Spy on the addEventListener and removeEventListener
let addEventListenerSpy: jest.SpyInstance
let removeEventListenerSpy: jest.SpyInstance
let requestAnimationFrameSpy: jest.SpyInstance<number, [FrameRequestCallback]>
let cancelAnimationFrameSpy: jest.SpyInstance<void, [number]>

describe('Canvas component', () => {
  // Clear all mocks and reset variables before each test
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame')
    cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame')
  })

  // Helper function to create and cleanup the component's instance in each test
  const renderComponent = () => {
    return render(<Canvas />)
  }

  test('renders the canvas element', () => {
    renderComponent()
    const canvasElement = screen.getByLabelText('canvas-cofetti')
    expect(canvasElement).toBeInTheDocument()
  })

  test('sets up event listeners on mount', () => {
    renderComponent()
    expect(window.addEventListener).toHaveBeenCalledTimes(2)
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function), false)
    expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
  })

  test('cleans up event listeners on unmount', () => {
    const { unmount } = renderComponent()
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledTimes(2)
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function), false)
    expect(window.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
  })

  test('triggers the animationConfetti function on mount', () => {
    renderComponent()
    jest.advanceTimersByTime(1000) // Advance the timers to trigger the setTimeout

    // Now we can manually trigger the animation frame updates
    // For simplicity, let's assume we trigger the animation for 60 frames (1 second).
    for (let i = 0; i < 60; i++) {
      requestAnimationFrameSpy.mock.calls[0][0](i * 16.66) // Simulate 60 FPS (16.66 ms per frame)
    }

    // We can also assert if the animationConfetti function is called as expected.
    // You can add more specific assertions based on your use case.
    expect(window.requestAnimationFrame).toHaveBeenCalled()
    expect(animationConfetti).toHaveBeenCalled()
  })

  test('cancels the animation frame on unmount', () => {
    const { unmount } = renderComponent()
    unmount()
    expect(window.cancelAnimationFrame).toHaveBeenCalled()
  })
})
