import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Switch } from '../Switch'

describe('Switch component', () => {
  test('renders the switch correctly', () => {
    render(<Switch />)

    // Check if the switch is rendered correctly
    const switchElement = screen.getByRole('checkbox')
    expect(switchElement).toBeInTheDocument()
  })

  test('toggles the switch when clicked', () => {
    render(<Switch />)

    // Get the switch element
    const switchElement = screen.getByRole('checkbox')

    // Check if the switch is unchecked initially
    expect(switchElement).not.toBeChecked()

    // Simulate clicking on the switch
    fireEvent.click(switchElement)

    // Check if the switch is checked after clicking
    expect(switchElement).toBeChecked()

    // Click again to toggle it off
    fireEvent.click(switchElement)

    // Check if the switch is unchecked again
    expect(switchElement).not.toBeChecked()
  })

  test('disables the switch when disabled prop is true', () => {
    render(<Switch disabled checked={false} />)

    // Get the disabled switch element
    const switchElement = screen.getByRole('checkbox')

    // Check if the switch is initially disabled
    expect(switchElement).toBeDisabled()

    // Simulate clicking on the disabled switch
    fireEvent.click(switchElement)

    // Check if the switch is still unchecked (should not be toggled)
    expect(switchElement).not.toBeChecked()
  })
})
