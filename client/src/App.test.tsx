import { render, screen } from '@testing-library/react'
import App from './App'

test('App', () => {
  render(<App />)
  const linkElement = screen.getByText(/Copyright © 2023 Portfolio Andrei Karalevich/i)
  expect(linkElement).toBeInTheDocument()
})
