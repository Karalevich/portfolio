import postReducer from './postReducer'
import { postActions } from '../../actions/postAction'

const initialState = {
  relatedPosts: [],
  isFetchingForm: false,
  isFetchingRelatedPosts: false,
  isFetchingPost: false,
  _id: '',

  img: '',
  title: '',
  description: '',
  comments: [],
  likes: [],
  tags: [],
  content: '',
  author: {
    _id: '',
    name: '',
    imageUrl: '',
  },
  date: '',
}

describe('postReducer', () => {
  test('should handle SET_POST', () => {
    const newState = postReducer(
      initialState,
      postActions.setCertainPostAC({
        _id: 'test id',
        img: '',
        title: 'test title',
        description: 'test description',
        comments: [],
        likes: [],
        tags: [],
        content: 'test content',
        author: {
          _id: '',
          name: '',
          imageUrl: '',
        },
        date: '',
      })
    )

    expect(newState).toEqual({
      relatedPosts: [],
      isFetchingForm: false,
      isFetchingRelatedPosts: false,
      isFetchingPost: false,
      _id: 'test id',
      img: '',
      title: 'test title',
      description: 'test description',
      comments: [],
      likes: [],
      tags: [],
      content: 'test content',
      author: {
        _id: '',
        name: '',
        imageUrl: '',
      },
      date: '',
    })
  })

  test('should handle RESET_POST_STATE', () => {
    let newState = postReducer(
      initialState,
      postActions.setCertainPostAC({
        _id: 'test id',
        img: '',
        title: 'test title',
        description: 'test description',
        comments: [],
        likes: [],
        tags: [],
        content: 'test content',
        author: {
          _id: '',
          name: '',
          imageUrl: '',
        },
        date: '',
      })
    )
    newState = postReducer(newState, postActions.resetPostAC())

    expect(newState).toEqual({ ...initialState, isFetchingPost: true })
  })

  test('should handle SET_RELATED_POST', () => {
    const newState = postReducer(
      initialState,
      postActions.setRelatedPostsAC([
        {
          _id: 'test id',
          img: '',
          title: 'test title',
          isFetchingPosts: false,
          author: {
            _id: '',
            name: '',
            imageUrl: '',
          },
          date: '',
        },
      ])
    )

    expect(newState.relatedPosts).toEqual([
      {
        _id: 'test id',
        img: '',
        title: 'test title',
        isFetchingPosts: false,
        author: {
          _id: '',
          name: '',
          imageUrl: '',
        },
        date: '',
      },
    ])
  })

  test('should handle SET_LIKE', () => {
    let newState = postReducer(initialState, postActions.setLikestAC('test id'))

    expect(newState.likes).toEqual(['test id'])

    newState = postReducer(newState, postActions.setLikestAC('test id'))

    expect(newState.likes).toEqual([])
  })

  test('should handle SET_FETCHING_FORM', () => {
    let newState = postReducer(initialState, postActions.setFetchingFormAC(true))

    expect(newState.isFetchingForm).toEqual(true)
  })

  test('should handle SET_FETCHING_CERTAIN_POST', () => {
    let newState = postReducer(initialState, postActions.setFetchingCertainPostAC(true))

    expect(newState.isFetchingPost).toEqual(true)
  })

  test('should handle SET_FETCHING_RELATED_POSTS', () => {
    let newState = postReducer(initialState, postActions.setFetchingRelatedPostsAC(true))

    expect(newState.isFetchingRelatedPosts).toEqual(true)
  })
})
