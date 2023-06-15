import { PostActionT, PostStateT } from './types'

export const COMMENTS = 'COMMENTS'
export const SET_POST = 'SET_POST'
export const SET_LIKE = 'SET_LIKE'
export const RESET_POST_STATE = 'RESET_POST_STATE'
export const SET_FETCHING_CERTAIN_POST = 'SET_FETCHING_CERTAIN_POST'
export const SET_RELATED_POST = 'SET_RELATED_POST'
export const SET_FETCHING_FORM = 'SET_FETCHING_FORM'
export const SET_FETCHING_RELATED_POSTS = 'SET_FETCHING_RELATED_POSTS'

const initialState = {
  relatedPosts: [],
  isFetchingForm: false,
  isFetchingRelatedPosts: false,
  isFetchingPost: true,
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

export default (state: PostStateT = initialState, action: PostActionT) => {
  switch (action.type) {
    case SET_POST:
      return {
        ...state,
        ...action.payload.post,
      }
    case RESET_POST_STATE:
      return {
        ...initialState,
      }
    case SET_RELATED_POST:
      return {
        ...state,
        relatedPosts: action.payload.posts,
      }
    case SET_LIKE:
      return {
        ...state,
        likes: state.likes.includes(action.userId)
          ? state.likes.filter((id) => id !== action.userId)
          : [...state.likes, action.userId],
      }
    case SET_FETCHING_FORM:
      return {
        ...state,
        isFetchingForm: action.flag,
      }
    case SET_FETCHING_CERTAIN_POST:
      return {
        ...state,
        isFetchingPost: action.flag,
      }
    case SET_FETCHING_RELATED_POSTS:
      return {
        ...state,
        isFetchingRelatedPosts: action.flag,
      }
    default:
      return state
  }
}
