import commentReducer from './commentReducer'
import { commentActions } from '../../actions/commentAction'

const date = new Date()
const initialState = {
  comments: [
    {
      _id: 'id 1',
      author: {
        _id: 'author id',
        name: 'author name',
        imageUrl: 'author img',
      },
      post: 'post id',
      parent: 'parent id',
      children: ['child id'],
      likes: ['like id'],
      message: 'test message',
      created_at: date,
      updated_at: date,
    },
  ],
  isFetchingComments: true,
  isLoadingComment: false,
  commentsCount: 0,
  pagesCount: 1,
  page: 1,
}

describe('commentReducer', () => {
  test('should handle ADD_COMMENT', () => {
    const newState = commentReducer(
      initialState,
      commentActions.addCommentAC({
        _id: 'id 2',
        author: {
          _id: 'author id',
          name: 'author name',
          imageUrl: 'author img',
        },
        post: 'post id',
        parent: 'parent id',
        children: ['child id'],
        likes: ['like id'],
        message: 'test message',
        created_at: date,
        updated_at: date,
      })
    )
    expect(newState.comments).toEqual([
      {
        _id: 'id 2',
        author: {
          _id: 'author id',
          name: 'author name',
          imageUrl: 'author img',
        },
        post: 'post id',
        parent: 'parent id',
        children: ['child id'],
        likes: ['like id'],
        message: 'test message',
        created_at: date,
        updated_at: date,
      },
      {
        _id: 'id 1',
        author: {
          _id: 'author id',
          name: 'author name',
          imageUrl: 'author img',
        },
        post: 'post id',
        parent: 'parent id',
        children: ['child id'],
        likes: ['like id'],
        message: 'test message',
        created_at: date,
        updated_at: date,
      },
    ])
  })

  test('should handle UPDATE_COMMENT', () => {
    const newState = commentReducer(
      initialState,
      commentActions.updateCommentAC({
        _id: 'id 1',
        author: {
          _id: 'author id',
          name: 'author name',
          imageUrl: 'author img',
        },
        post: 'post id',
        parent: 'parent id',
        children: ['child id'],
        likes: ['like id'],
        message: 'new message test',
        created_at: date,
        updated_at: date,
      })
    )
    expect(newState.comments).toEqual([
      {
        _id: 'id 1',
        author: {
          _id: 'author id',
          name: 'author name',
          imageUrl: 'author img',
        },
        post: 'post id',
        parent: 'parent id',
        children: ['child id'],
        likes: ['like id'],
        message: 'new message test',
        created_at: date,
        updated_at: date,
      },
    ])
  })

  test('should handle SET_COMMENT_LIKE', () => {
    let newState = commentReducer(initialState, commentActions.setLikeCommentAC('123', 'id 1'))
    expect(newState.comments).toEqual([
      {
        _id: 'id 1',
        author: {
          _id: 'author id',
          name: 'author name',
          imageUrl: 'author img',
        },
        post: 'post id',
        parent: 'parent id',
        children: ['child id'],
        likes: ['like id', '123'],
        message: 'test message',
        created_at: date,
        updated_at: date,
      },
    ])

    newState = commentReducer(newState, commentActions.setLikeCommentAC('123', 'id 1'))
    expect(newState.comments).toEqual([
      {
        _id: 'id 1',
        author: {
          _id: 'author id',
          name: 'author name',
          imageUrl: 'author img',
        },
        post: 'post id',
        parent: 'parent id',
        children: ['child id'],
        likes: ['like id'],
        message: 'test message',
        created_at: date,
        updated_at: date,
      },
    ])
  })

  test('should handle SET_FETCHING_COMMENTS', () => {
    const newState = commentReducer(initialState, commentActions.setIsFetchingCommentsAC(false))
    expect(newState.isFetchingComments).toEqual(false)
  })

  test('should handle SET_COMMENTS', () => {
    const newState = commentReducer(
      initialState,
      commentActions.setCommentsAC([
        {
          _id: 'id 123',
          author: {
            _id: 'author id',
            name: 'author name',
            imageUrl: 'author img',
          },
          post: 'post id',
          parent: 'parent id',
          children: ['child id'],
          likes: ['like id'],
          message: 'test message',
          created_at: date,
          updated_at: date,
        },
      ])
    )
    expect(newState.comments).toEqual([
      {
        _id: 'id 123',
        author: {
          _id: 'author id',
          name: 'author name',
          imageUrl: 'author img',
        },
        post: 'post id',
        parent: 'parent id',
        children: ['child id'],
        likes: ['like id'],
        message: 'test message',
        created_at: date,
        updated_at: date,
      },
    ])
  })

  test('should handle SET_LOADING_COMMENT', () => {
    const newState = commentReducer(initialState, commentActions.setIsLoadingCommentAC(true))
    expect(newState.isLoadingComment).toEqual(true)
  })

  test('should handle SET_COUNT_COMMENTS', () => {
    const newState = commentReducer(initialState, commentActions.setCountCommentsAC(10))
    expect(newState.commentsCount).toEqual(10)
  })

  test('should handle SET_PAGES_COUNT', () => {
    const newState = commentReducer(initialState, commentActions.setPagesCountAC(10))
    expect(newState.pagesCount).toEqual(10)
  })

  test('should handle SET_PAGE', () => {
    const newState = commentReducer(initialState, commentActions.setPageAC(3))
    expect(newState.page).toEqual(3)
  })

  test('should handle DELETE_COMMENT', () => {
    const newState = commentReducer(initialState, commentActions.deleteCommentAC('id 1'))
    expect(newState.comments).toEqual([])
  })
})
