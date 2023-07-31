import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AnimatedRoutes from './AnimatedRoutes'
import { useAppSelector } from '../../hooks/hooks'

// Mock the custom hooks and actions
jest.mock('../../hooks/hooks')

// Define a custom type for the mocked useAppSelector hook
type MockedUseAppSelector<T> = (arg: T) => ReturnType<typeof useAppSelector>

// Cast useAppSelector as the custom mocked type
const mockedUseAppSelector = useAppSelector as jest.MockedFunction<MockedUseAppSelector<any>>

jest.mock('../Home/Home', () => {
  return () => <div>Home page</div>
})

jest.mock('../Home/Blog/Blog', () => {
  return () => <div>Blog page</div>
})

jest.mock('../Home/Contact/Contact', () => {
  return () => <div>Contact Us</div>
})

jest.mock('../Home/Blog/AddPost/AddPost', () => {
  return () => <div>Add post page</div>
})

describe('AnimatedRoutes component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('renders the home page when the URL is /home', async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <AnimatedRoutes />
      </MemoryRouter>
    )

    // Check if Home component is rendered
    await waitFor(() => {
      expect(screen.getByText('Home page')).toBeInTheDocument()
    })
  })

  test('renders the services page when the URL is /services', async () => {
    render(
      <MemoryRouter initialEntries={['/services']}>
        <AnimatedRoutes />
      </MemoryRouter>
    )

    // Check if Services component is rendered
    await waitFor(() => {
      expect(screen.getByText('My Services')).toBeInTheDocument()
    })
  })

  test('renders the blog page when the URL is /blog', async () => {
    render(
      <MemoryRouter initialEntries={['/blog']}>
        <AnimatedRoutes />
      </MemoryRouter>
    )

    // Check if Blog component is rendered
    await waitFor(() => {
      expect(screen.getByText('Blog page')).toBeInTheDocument()
    })
  })

  test('renders the contact page when the URL is /contact', async () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <AnimatedRoutes />
      </MemoryRouter>
    )

    // Check if Blog component is rendered
    await waitFor(() => {
      expect(screen.getByText('Contact Us')).toBeInTheDocument()
    })
  })

  test('renders the addPost page when the URL is blog/addPost ans user is logIn', async () => {
    mockedUseAppSelector.mockReturnValueOnce({ isActivated: true }) // User is logIn
    render(
      <MemoryRouter initialEntries={['/blog/addPost']}>
        <AnimatedRoutes />
      </MemoryRouter>
    )

    // Check if Blog component is rendered
    await waitFor(() => {
      expect(screen.getByText('Add post page')).toBeInTheDocument()
    })
  })

  test('renders the notFound page when the URL is blog/addPost ans user is not logIn', async () => {
    mockedUseAppSelector.mockReturnValueOnce(null) // User is logIn
    render(
      <MemoryRouter initialEntries={['/blog/addPost']}>
        <AnimatedRoutes />
      </MemoryRouter>
    )

    // Check if Blog component is rendered
    await waitFor(() => {
      expect(screen.getByText('Sorry, page not found!')).toBeInTheDocument()
    })
  })

  test('renders the notFound page when the URL is blog/addPost ans user is logIn but account is not activated', async () => {
    mockedUseAppSelector.mockReturnValueOnce({ isActivated: false }) // User is logIn
    render(
      <MemoryRouter initialEntries={['/blog/addPost']}>
        <AnimatedRoutes />
      </MemoryRouter>
    )

    // Check if Blog component is rendered
    await waitFor(() => {
      expect(screen.getByText('Sorry, page not found!')).toBeInTheDocument()
    })
  })

  test('renders the notFound page when the URL is invalid', async () => {
    render(
      <MemoryRouter initialEntries={['/invalid-url']}>
        <AnimatedRoutes />
      </MemoryRouter>
    )

    // Check if NotFound component is rendered
    await waitFor(() => {
      expect(screen.getByText('Sorry, page not found!')).toBeInTheDocument()
    })
  })

  // TODO
  // test('triggers onHandleAnimation event when onAnimationEnd is called', async () => {
  //   render(
  //     <MemoryRouter initialEntries={['/services']}>
  //       <AnimatedRoutes />
  //     </MemoryRouter>,
  //   )
  //
  //   let wrapperElement: Element | null = null
  //   // Check if NotFound component is rendered
  //   await waitFor(() => {
  //     wrapperElement = screen.getByLabelText('animation-routes-wrapper')
  //
  //     // Assert that the animation class is present
  //     // @ts-ignore
  //     expect(wrapperElement.classList).toContain('fadeIn')
  //
  //     const buttonElement = screen.getAllByRole('button')
  //     fireEvent.click(buttonElement[0])
  //   })
  //
  //   // Advance time by a sufficient amount for the animation to complete
  //   jest.advanceTimersByTime(1000)
  //
  //   // Change location to trigger fadeOut
  //   await waitFor(() => {
  //     // @ts-ignore
  //     expect(wrapperElement.classList).toContain('fadeOut');
  //   })
  //
  //
  //   // Wait for the animation to end and onHandleAnimation to trigger the fadeIn again
  //   await waitFor(() => {
  //     // Assert that the fadeIn class is now present again
  //     // @ts-ignore
  //     expect(wrapperElement.classList).toContain('fadeIn');
  //   });
  //
  // })
})
