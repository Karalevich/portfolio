import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Like from './Like'

describe('Input', () => {
  const mockOnClick = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly', () => {
    render(<Like isLiked={false} onClick={mockOnClick} count={42} disabled={false} />)
    const likeButton = screen.getByRole('checkbox')
    const countElement = screen.getByText('42')

    expect(likeButton).toBeInTheDocument()
    expect(countElement).toBeInTheDocument()
  })

  test('calls onClick handler when the like button is clicked', () => {
    render(<Like isLiked={false} onClick={mockOnClick} count={42} disabled={false} />)

    const likeButton = screen.getByRole('checkbox')
    fireEvent.click(likeButton)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  test('renders the correct icon based on isLiked prop', () => {
    render(<Like isLiked={true} onClick={mockOnClick} count={42} disabled={false} />)
    const likedIcon = screen.getByTestId('FavoriteIcon')
    expect(likedIcon).toBeInTheDocument()

    render(<Like isLiked={false} onClick={mockOnClick} count={42} disabled={false} />)
    const notLikedIcon = screen.getByTestId('FavoriteBorderIcon')
    expect(notLikedIcon).toBeInTheDocument()
  })

  test('displays the tooltip when the component is disabled and on hover', async () => {
    render(<Like isLiked={false} onClick={mockOnClick} count={42} disabled={true} />)

    const likeButton = screen.getByRole('checkbox')

    fireEvent.mouseEnter(likeButton)
    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toBeInTheDocument()

    fireEvent.mouseLeave(likeButton)
    await waitForElementToBeRemoved(() => screen.queryByRole('tooltip'))
    expect(tooltip).not.toBeInTheDocument()
  })
})