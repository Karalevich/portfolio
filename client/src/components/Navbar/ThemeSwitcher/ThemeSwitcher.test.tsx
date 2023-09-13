import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ThemeSwitcher from './ThemeSwitcher'

const handleSwitchThemeMock = jest.fn()
const mockedProps = {
  handleSwitchTheme: handleSwitchThemeMock,
  isLightTheme: true,
}

describe('ThemeSwitcher component', () => {
  test('renders correct components', () => {
    render(<ThemeSwitcher {...mockedProps} />)

    const checkbox = screen.getByRole('checkbox')
    const switchThemeIcon = screen.getByLabelText('switch-theme-icon')

    expect(switchThemeIcon).toBeInTheDocument()
    expect(switchThemeIcon).toHaveClass('light')

    expect(checkbox).toBeInTheDocument()
  })

  test('applies the "dark" class when isLightTheme is false', () => {
    const props = {
      ...mockedProps,
      isLightTheme: false,
    }
    render(<ThemeSwitcher {...props} />)
    const switchThemeIcon = screen.getByLabelText('switch-theme-icon')
    expect(switchThemeIcon).toHaveClass('dark')
  })

  test('calls handleSwitchTheme when the checkbox is clicked', () => {
    render(<ThemeSwitcher {...mockedProps} />)

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)
    expect(handleSwitchThemeMock).toHaveBeenCalledTimes(1)
  })
})
