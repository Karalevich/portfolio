import { BlogActionT, BlogStateT } from './types'

export const FETCH_POSTS = 'FETCH_POSTS'
export const CREATE = 'CREATE'
export const SET_FETCHING_POSTS = 'SET_FETCHING_POSTS'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_SORT_VALUE = 'SET_SORT_VALUE'
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
export const SET_FETCHING_PAGINATED_POSTS = 'SET_FETCHING_PAGINATED_POSTS'
export const ADD_POSTS = 'ADD_POSTS'
export const UPDATE = 'UPDATE'
export const DELETE = 'DELETE'

const initialState = {
  posts: [],
  isFetchingPosts: false,
  isFetchingPaginatedPosts: false,
  allPages: 1,
  currentPage: 1,
  searchValue: '',
  sortValue: 0,
}

export default (state: BlogStateT = initialState, action: BlogActionT) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        allPages: action.payload.allPages,
      }
    case SET_FETCHING_POSTS:
      return {
        ...state,
        isFetchingPosts: action.flag,
      }
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload
          return post
        }),
      }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.id),
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page <= state.allPages ? action.page : state.allPages,
      }
    case SET_SORT_VALUE:
      return {
        ...state,
        sortValue: action.sortValue,
      }
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.searchValue,
      }
    case SET_FETCHING_PAGINATED_POSTS:
      return {
        ...state,
        isFetchingPaginatedPosts: action.flag,
      }
    case ADD_POSTS:
      return {
        ...state,
        allPages: action.payload.allPages,
        posts: [...state.posts, ...action.payload.posts].filter((item, index, self) => {
          return self.findIndex((p) => p._id === item._id) === index
        }),
      }
    default:
      return state
  }
}
