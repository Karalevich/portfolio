import blogReducer from './blogReducer'
import { blogActions } from '../../actions/blogAction'

const initialState = {
  posts: [],
  isFetchingPosts: false,
  isFetchingPaginatedPosts: false,
  allPages: 1,
  currentPage: 1,
  searchValue: '',
  sortValue: 0,
}

describe('blogReducer', () => {
  test('should handle FETCH_POSTS', () => {
    const newState = blogReducer(
      initialState,
      blogActions.setPostsAC(
        [
          {
            _id: 'id',
            title: 'Post 1',
            img: '',
            description: 'test description',
          },
        ],
        1
      )
    )
    expect(newState.posts).toEqual([
      {
        _id: 'id',
        title: 'Post 1',
        img: '',
        description: 'test description',
      },
    ])
    expect(newState.allPages).toEqual(1)
  })

  test('should handle SET_FETCHING_POSTS', () => {
    const newState = blogReducer(initialState, blogActions.setFetchingPostsAC(true))
    expect(newState.isFetchingPosts).toEqual(true)
  })

  test('should handle CREATE', () => {
    const newState = blogReducer(
      initialState,
      blogActions.createPostAC({
        _id: 'id',
        title: 'Post 1',
        img: '',
        description: 'test description',
      })
    )
    expect(newState.posts).toEqual([
      {
        _id: 'id',
        title: 'Post 1',
        img: '',
        description: 'test description',
      },
    ])
  })

  test('should handle UPDATE', () => {
    const newState = blogReducer(
      {
        ...initialState,
        posts: [
          {
            _id: 'id',
            title: 'Post 1',
            img: '',
            description: 'test description',
          },
        ],
      },
      blogActions.updatePostAC({
        _id: 'id',
        title: 'Post 1',
        img: '',
        description: 'New test description',
      })
    )
    expect(newState.posts).toEqual([
      {
        _id: 'id',
        title: 'Post 1',
        img: '',
        description: 'New test description',
      },
    ])
  })

  test('should handle DELETE', () => {
    const newState = blogReducer(
      {
        ...initialState,
        posts: [
          {
            _id: 'id',
            title: 'Post 1',
            img: '',
            description: 'test description',
          },
        ],
      },
      blogActions.deletePostAC('id')
    )
    expect(newState.posts).toEqual([])
  })

  test('should handle SET_CURRENT_PAGE', () => {
    const newState = blogReducer(initialState, blogActions.setCurrentPageAC(0))
    expect(newState.currentPage).toEqual(0)
  })

  test('should handle SET_SORT_VALUE', () => {
    const newState = blogReducer(initialState, blogActions.setSortValueAC(1))
    expect(newState.sortValue).toEqual(1)
  })

  test('should handle SET_SEARCH_VALUE', () => {
    const newState = blogReducer(initialState, blogActions.setSearchValueAC('test'))
    expect(newState.searchValue).toEqual('test')
  })

  test('should handle SET_FETCHING_PAGINATED_POSTS', () => {
    const newState = blogReducer(initialState, blogActions.setFetchingPaginatedPostsAC(true))
    expect(newState.isFetchingPaginatedPosts).toEqual(true)
  })

  test('should handle ADD_POSTS with deduplication', () => {
    let newState = blogReducer(
      initialState,
      blogActions.addPostsAC(
        [
          {
            _id: 'id 1',
            title: 'Post 1',
            img: '',
            description: 'test description',
          },
        ],
        1
      )
    )
    newState = blogReducer(
      newState,
      blogActions.addPostsAC(
        [
          {
            _id: 'id 1',
            title: 'Post 1',
            img: '',
            description: 'test description',
          },
        ],
        1
      )
    )

    newState = blogReducer(
      newState,
      blogActions.addPostsAC(
        [
          {
            _id: 'id 2',
            title: 'Post 2',
            img: '',
            description: 'test description',
          },
        ],
        1
      )
    )

    expect(newState.posts).toEqual([
      {
        _id: 'id 1',
        title: 'Post 1',
        img: '',
        description: 'test description',
      },
      {
        _id: 'id 2',
        title: 'Post 2',
        img: '',
        description: 'test description',
      },
    ])
    expect(newState.allPages).toEqual(1)
  })
})
