import { render, screen } from '@testing-library/react'
import Input from './Input'
import { mainTheme } from '../../../styles/themes/mainTheme'
import { ThemeProvider } from '@mui/material/styles'
import userEvent from '@testing-library/user-event'

describe('Input', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider theme={mainTheme}>
        <Input label={'Username'} id={'username'} helperText='Enter your username' />
      </ThemeProvider>
    )
    const inputElement = screen.getByLabelText('Username')
    const helperTextElement = screen.getByText('Enter your username')

    expect(inputElement).toBeInTheDocument()
    expect(helperTextElement).toBeInTheDocument()
  })

  test('displays error helper when error prop is passed', () => {
    render(<Input label='Email' error helperText='Invalid email' id='email' />)

    const formHelperTexElement = screen.getByText('Invalid email')

    expect(formHelperTexElement).toBeInTheDocument()
    expect(formHelperTexElement).toHaveClass('Mui-error')
  })

  test('triggers onChange callback when the input value changes', () => {
    const handleChange = jest.fn()
    render(<Input label='Name' id='name' onChange={handleChange} />)

    const inputElement = screen.getByLabelText('Name')
    userEvent.type(inputElement, 'John Doe')

    expect(handleChange).toHaveBeenCalledTimes(8) // Number of characters typed
  })
})
