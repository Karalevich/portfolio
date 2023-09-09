import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import PriceItem from './PriceItem'
import { PriceItemProps } from './types'
import userEvent from '@testing-library/user-event'

// Sample props for testing
const initialMockedProps = {
  title: 'Sample Title',
  description: 'Sample Description',
  price: 10,
  isPopular: true,
  duties: [
    { name: 'Duty 1', isRequired: true },
    { name: 'Duty 2', isRequired: false },
  ],
}

describe('PriceItem Component', () => {
  const renderComponent = (mockedProps: PriceItemProps) => {
    return render(
      <Router>
        <PriceItem {...mockedProps} />
      </Router>
    )
  }
  test('PriceItem renders with correct content', async () => {
    renderComponent(initialMockedProps)

    // Check if the component renders the title, description, and price correctly
    expect(screen.getByText(initialMockedProps.title)).toBeInTheDocument()
    expect(screen.getByText(initialMockedProps.description)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Order now' })).toBeInTheDocument()
    expect(screen.getAllByLabelText('duty').length).toBe(2)

    // Check if the "Most Popular" label is present
    expect(screen.getByText('Most Popular')).toBeInTheDocument()

    // Check if duties are rendered correctly
    expect(screen.getByText('Duty 1')).toBeInTheDocument()
    expect(screen.getByText('Duty 2')).toBeInTheDocument()
  })

  test('PriceItem redirects to /contact when "Order now" button is clicked', () => {
    renderComponent(initialMockedProps)

    // Find the "Order now" button and click it
    const orderButton = screen.getByRole('button', { name: 'Order now' })
    fireEvent.click(orderButton)

    // Check if the component redirects to the /contact page
    expect(window.location.pathname).toBe('/contact')
  })

  test('PriceItem toggles elevation on mouse enter and leave', async () => {
    renderComponent(initialMockedProps)

    const cardElement = screen.getByLabelText('price-item')

    expect(cardElement).toBeInTheDocument()
    // Check initial style, box shadow should be 'none'
    expect(cardElement).toHaveStyle('box-shadow: none')

    // Simulate a mouse hover event on the element
    await userEvent.hover(cardElement)

    // Check style after hover, box shadow should not be 'none'
    expect(cardElement).not.toHaveStyle('box-shadow: none')

    // Simulate a mouse unhover event on the element
    await userEvent.unhover(cardElement)

    expect(cardElement).toHaveStyle('box-shadow: none')
  })
})
