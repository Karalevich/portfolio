import { CommentActionT, CommentStateT } from './types'

export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_FETCHING_COMMENTS = 'SET_FETCHING_COMMENTS'
export const SET_COMMENTS = 'SET_COMMENTS'
export const SET_LOADING_COMMENT = 'SET_LOADING_COMMENT'
export const SET_COUNT_COMMENTS = 'SET_COUNT_COMMENTS'
export const SET_PAGES_COUNT = 'SET_PAGES_COUNT'
export const SET_PAGE = 'SET_PAGE'
export const DELETE_COMMENT = 'DELETE_COMMENT'

const initialState = {
  comments: [],
  isFetchingComments: true,
  isLoadingComment: false,
  commentsCount: 0,
  pagesCount: 1,
  page: 1,
}

export default (state: CommentStateT = initialState, action: CommentActionT) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload.comment, ...state.comments],
      }
    case SET_FETCHING_COMMENTS:
      return {
        ...state,
        isFetchingComments: action.flag,
      }
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload.comments,
      }
    case SET_LOADING_COMMENT:
      return {
        ...state,
        isLoadingComment: action.flag,
      }
    case SET_COUNT_COMMENTS:
      return {
        ...state,
        commentsCount: action.payload.commentsCount,
      }
    case SET_PAGES_COUNT:
      return {
        ...state,
        pagesCount: action.payload.pagesCount,
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.payload.page,
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== action.payload.commentId),
      }
    default:
      return state
  }
}
