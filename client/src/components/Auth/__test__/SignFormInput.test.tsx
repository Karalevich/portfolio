import React from 'react'
import { render } from '@testing-library/react'
import { SignFormInput } from '../SignFormInput'

describe('SignFormInput', () => {
  test('applies the correct styling', async () => {
    render(<SignFormInput />)
    const inputElement = document.querySelector('.MuiFormControl-root')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveStyle('margin-bottom: 0.5rem')
  })
})
