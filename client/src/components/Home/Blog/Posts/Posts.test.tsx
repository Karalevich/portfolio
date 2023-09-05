import { render, screen } from '@testing-library/react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { useAppDispatch } from '../../../../hooks/hooks'
import Posts from './Posts'
import { PostsProps } from './types'
import { PLACEHOLDER_COUNT_POSTS } from '../../../../constants/personalInfo'
import { CarouselProvider } from 'pure-react-carousel'


// Mock Redux hooks
jest.mock('../../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))

jest.mock('../../../../actions/blogAction', () => ({
  blogActions: {
    setCurrentPageAC: jest.fn(),
  },
  getPaginatedPostsThunk: jest.fn(),
  getPostsThunk: jest.fn(),
}))

const mockedInitialState = {
  posts: [
    {
      img: 'post test img 1',
      title: 'test title 1',
      description: 'test description 1',
      _id: 'test id 1',
    },
    {
      img: 'post test img 2',
      title: 'test title 2',
      description: 'test description 2',
      _id: 'test id 2',
    },
  ],
  isFetchingPosts: false,
  isFetchingPaginatedPosts: false,
  currentPage: 1,
  allPages: 1,
  searchValue: '',
  sortValue: 0,
}

const mockedInitialProps = {
  isTabletOrMobile: false,
  isFullVersion: true,
}

// Mock the PostCard component
jest.mock('../PostCard/PostCard', () => {
  return {
    __esModule: true,
    default: () => <div data-testid='mock-card'>Mock Card</div>,
  }
})

describe('Posts Component', () => {
  // Mocking Redux store and other dependencies
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedState: any, mockedProps: PostsProps) => {
    const reducers = combineReducers({
      blog: (state = mockedState) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <CarouselProvider
          isIntrinsicHeight
          visibleSlides={1}
          totalSlides={2}
          step={1}
          naturalSlideWidth={310}
          naturalSlideHeight={440}
          currentSlide={0}
        >
          <Posts {...mockedProps} />
        </CarouselProvider>
      </Provider>,
    )
  }

  test('render correct count of post card', async () => {
    renderComponent(mockedInitialState, mockedInitialProps)

    const cardElements = screen.getAllByTestId('mock-card')

    expect(cardElements.length).toBe(2)
  })

  test('render correct count of placeholder post card', () => {
    renderComponent({
      ...mockedInitialState,
      isFetchingPosts: true,
    }, mockedInitialProps)

    const cardElements = screen.getAllByTestId('mock-card')

    expect(cardElements.length).toBe(PLACEHOLDER_COUNT_POSTS)
  })

  test('should wrap post card in slide wrapper', () => {
    renderComponent(mockedInitialState, {
      ...mockedInitialProps,
      isFullVersion: false,
    })

    const cardElements = screen.getAllByLabelText('slide')
    const sliderElements = screen.getByLabelText('slider')

    expect(cardElements.length).toBe(2)
    expect(sliderElements).toBeInTheDocument()
  })
})
