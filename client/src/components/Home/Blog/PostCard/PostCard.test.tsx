import { render, screen } from '@testing-library/react'
import { useAppDispatch } from '../../../../hooks/hooks'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PostT } from './types'
import PostCard from './PostCard'
import userEvent from '@testing-library/user-event'

// Mock Redux hooks
jest.mock('../../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))

const mockedInitialProps = {
  img: 'test url',
  title: 'Test title',
  description: 'Test description',
  _id: 'test id',
  isFullVersion: true,
  isFetchingPosts: false,
}

describe('PostCard Component', () => {
  // Mocking Redux store and other dependencies
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedSProps: PostT) => {
    return render(
      <MemoryRouter initialEntries={['/card']}>
        <Routes>
          <Route path='/card' element={<PostCard {...mockedSProps} />} />
          <Route path='/blog/post/:id' element={<div>Blog</div>} />
        </Routes>
      </MemoryRouter>
    )
  }

  test('render component correctly', () => {
    renderComponent(mockedInitialProps)
    const imgElement = screen.getByRole('img', { name: mockedInitialProps.title })
    const buttonElement = screen.getByRole('button', { name: 'Learn More' })
    const titleElement = screen.getByText(mockedInitialProps.title)
    const descriptionElement = screen.getByText(mockedInitialProps.description)

    expect(imgElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
    expect(titleElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()
  })

  test('should render skeleton', () => {
    renderComponent({
      ...mockedInitialProps,
      isFetchingPosts: true,
    })
    const imgElement = screen.getByTestId('post-card-media-skeleton')
    const buttonElement = screen.getByTestId('post-card-button-skeleton')
    const titleElement = screen.getByTestId('post-card-title-skeleton')
    const descriptionElement = screen.getAllByTestId('post-card-description-skeleton')

    expect(imgElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
    expect(titleElement).toBeInTheDocument()
    expect(descriptionElement.length).toBe(3)
  })

  test('should redirect to /blog/post/${_id}', async () => {
    renderComponent(mockedInitialProps)
    const buttonElement = screen.getByRole('button', { name: 'Learn More' })

    expect(buttonElement).toBeInTheDocument()

    await userEvent.click(buttonElement)

    const blogPage = screen.getByText('Blog')

    expect(blogPage).toBeInTheDocument()
  })

  test('should toggle elevation', async () => {
    renderComponent(mockedInitialProps)
    const cardElement = screen.getByLabelText('post-card')

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
