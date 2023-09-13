import { render, fireEvent, screen } from '@testing-library/react'
import Menu from './Menu'
import { MenuProps } from './types'

const toggleInfoMock = jest.fn()
const toggleNavMock = jest.fn()

const initialMockedProps = {
  toggleNav: toggleNavMock,
  toggleInfo: toggleInfoMock,
}

describe('Menu', () => {
  const renderComponent = (mockedProps: MenuProps) => {
    render(<Menu {...mockedProps} />)
  }
  test('should render the Menu component with buttons', () => {
    renderComponent(initialMockedProps)
    // Check if MenuIcon and MoreVertIcon buttons are rendered
    expect(screen.getByTestId('MenuIcon')).toBeInTheDocument()
    expect(screen.getByTestId('MoreVertIcon')).toBeInTheDocument()
  })

  test('should call toggleNav when the MenuIcon button is clicked', () => {
    renderComponent(initialMockedProps)

    const moreVertButton = screen.getByLabelText('MenuIcon')

    // Click the MenuIcon button
    fireEvent.click(moreVertButton)

    // Check if toggleNav has been called with true as an argument
    expect(toggleInfoMock).toHaveBeenCalledWith(true)
  })

  test('should call toggleInfo when the MoreVertIcon button is clicked', () => {
    renderComponent(initialMockedProps)

    const navButton = screen.getByLabelText('MoreVertIcon')

    // Click the MoreVertIcon button
    fireEvent.click(navButton)

    // Check if toggleInfo has been called with true as an argument
    expect(toggleNavMock).toHaveBeenCalledWith(true)
  })
})
