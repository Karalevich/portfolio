import { render, screen } from '@testing-library/react';
import Copyright from './Copyright'

test('renders copyright portfolio Andrei Karalevich', () => {
  render(<Copyright />)
  const linkElement = screen.getByText(/Copyright © 2023 Portfolio Andrei Karalevich/i)
  expect(linkElement).toBeInTheDocument()
});