import { render, screen } from '@testing-library/react'
import Avatar from './Avatar'

// Mock the image to avoid loading it during tests
jest.mock('../../../assets/img/Me.webp', () => 'avatar-image')

describe('Avatar Component', () => {
  test('displays the user name', () => {
    render(<Avatar />)
    const userNameElement = screen.getByText('Andrei Karalevich')
    expect(userNameElement).toBeInTheDocument()
  })

  test('displays the user occupation', () => {
    render(<Avatar />)
    const userOccupationElement = screen.getByText('Front-End Engineer')
    expect(userOccupationElement).toBeInTheDocument()
  })

  test('displays the user avatar image', () => {
    const { getByAltText } = render(<Avatar />)
    const userAvatarElement = getByAltText('Andrei Karalevich')
    expect(userAvatarElement).toBeInTheDocument()
    expect(userAvatarElement).toHaveAttribute('src', 'avatar-image')
  })
})
