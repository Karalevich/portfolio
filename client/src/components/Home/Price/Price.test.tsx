import { render, screen } from '@testing-library/react'
import Price from './Price'
import { PRICES } from 'src/constants/personalInfo'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Price Component', () => {
  const renderComponent = () => {
    return render(
      <Router>
        <Price />
      </Router>
    )
  }
  test('Price component renders correctly with mocked PriceItem and SectionHeader', () => {
    renderComponent()

    // Check if the component renders the title and introduction
    expect(screen.getByText('Price Plan')).toBeInTheDocument()
    expect(
      screen.getByText(/This is the typical base pay range for this role across the U.S./)
    ).toBeInTheDocument()

    // Check if PriceItem is rendered for each item in PRICES
    const priceItems = screen.getAllByLabelText('price-item')
    expect(priceItems.length).toBe(PRICES.length)
  })
})
