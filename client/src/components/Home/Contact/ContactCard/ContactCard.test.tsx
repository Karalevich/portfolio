import { render, screen } from '@testing-library/react'
import ContactCard from './ContactCard'
import { LocationIcon } from '../../../Custom/Icons'

const mockInfo = [
  { title: 'Email', value: 'test@example.com', href: 'mailto:test@example.com' },
  { title: 'Phone', value: '123-456-7890', href: 'tel:123-456-7890' },
]

describe('ContactCard', () => {
  test('renders the card with the provided information', () => {
    render(<ContactCard info={mockInfo} icon={LocationIcon} />)

    // Test for the presence of card content
    expect(screen.getByText('Email:')).toBeInTheDocument()
    expect(screen.getByText('Phone:')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('123-456-7890')).toBeInTheDocument()
  })

  test('renders links with correct href attributes', () => {
    render(<ContactCard info={mockInfo} icon={LocationIcon} />)

    // Test for the href attributes of links
    const emailLink = screen.getByText('test@example.com')
    const phoneLink = screen.getByText('123-456-7890')
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:test@example.com')
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:123-456-7890')
  })
})
