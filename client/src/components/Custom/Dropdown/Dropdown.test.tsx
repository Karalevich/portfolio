import * as React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropdown from './Dropdown'

// Sample mock data for testing
const mockSelects = ['Option 1', 'Option 2', 'Option 3']

describe('Dropdown component', () => {
  test('renders the initial selected item correctly', () => {
    render(<Dropdown selects={mockSelects} onSelect={() => {
    }} />)

    const initialSelectedItem = mockSelects[0]
    const buttonElement = screen.getByLabelText('Select display order')

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement.textContent).toMatch(initialSelectedItem)
  })

  test('opens the menu when the button is clicked', () => {
    render(<Dropdown selects={mockSelects} onSelect={() => {
    }} />)

    const dropdownButton = screen.getByRole('button', { name: 'Select display order' })
    const listElement = screen.queryByRole('list')

    expect(listElement).not.toBeInTheDocument() // Menu is initially in the document with styles visibility: hidden

    userEvent.click(dropdownButton) // Open the menu

    expect(screen.getByRole('list')).toBeInTheDocument() // Menu is now open
  })

  test('calls onSelect when an item is clicked', () => {
    const mockOnSelect = jest.fn()
    render(<Dropdown selects={mockSelects} onSelect={mockOnSelect} />)

    const dropdownButton = screen.getByRole('button', { name: 'Select display order' })
    userEvent.click(dropdownButton) // Open the menu

    const optionToSelect = mockSelects[1]
    const optionButtonToSelect = screen.getByRole('button', { name: optionToSelect })

    userEvent.click(optionButtonToSelect)

    expect(mockOnSelect).toHaveBeenCalledWith(optionToSelect) // onSelect is called with the selected item

    const updatedDropdownButton = screen.getByRole('button', { name: 'Select display order' })
    expect(updatedDropdownButton.textContent).toMatch(optionToSelect)
  })

  test('closes the menu when clicking second time on dropdown button', async () => {
    render(<Dropdown selects={mockSelects} onSelect={() => {
    }} />)

    const dropdownButton = screen.getByRole('button', { name: 'Select display order' })

    await userEvent.click(dropdownButton) // Open the menu
    expect(screen.queryByRole('list')).toBeInTheDocument()

    userEvent.click(dropdownButton)

    await act(async () => {
      const delay = new Promise((res) => {
        setTimeout(() => res(''), 500)
      })
      await delay
    })

    expect(screen.queryByRole('list')).not.toBeInTheDocument() // Menu is now closed
  })
})
