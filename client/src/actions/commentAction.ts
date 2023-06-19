import {
  ADD_COMMENT,
  SET_FETCHING_COMMENTS,
  SET_COMMENTS,
  SET_LOADING_COMMENT,
  SET_COUNT_COMMENTS,
  SET_PAGES_COUNT,
  SET_PAGE,
  DELETE_COMMENT,
  UPDATE_COMMENT, SET_COMMENT_LIKE,
} from '../reducers/comment/commentReducer'
import { ThunkT } from '../reducers/store'
import { CommentActionT, CommentT } from '../reducers/comment/types'
import * as api from '../api'

export const commentActions = {
  addCommentAC: (comment: CommentT) =>
    ({
      type: ADD_COMMENT,
      payload: {
        comment,
      },
    } as const),
  updateCommentAC: (comment: CommentT) =>
    ({
      type: UPDATE_COMMENT,
      payload: {
        comment,
      },
    } as const),
  setIsFetchingCommentsAC: (flag: boolean) =>
    ({
      type: SET_FETCHING_COMMENTS,
      flag,
    } as const),
  setCommentsAC: (comments: Array<CommentT>) =>
    ({
      type: SET_COMMENTS,
      payload: {
        comments,
      },
    } as const),
  setCountCommentsAC: (commentsCount: number) =>
    ({
      type: SET_COUNT_COMMENTS,
      payload: {
        commentsCount,
      },
    } as const),
  setIsLoadingCommentAC: (flag: boolean) =>
    ({
      type: SET_LOADING_COMMENT,
      flag,
    } as const),
  setPagesCountAC: (pagesCount: number) =>
    ({
      type: SET_PAGES_COUNT,
      payload: {
        pagesCount,
      },
    } as const),
  setPageAC: (page: number) =>
    ({
      type: SET_PAGE,
      payload: {
        page,
      },
    } as const),
  deleteCommentAC: (commentId: string) =>
    ({
      type: DELETE_COMMENT,
      payload: {
        commentId,
      },
    } as const),
  setLikeCommentAC: (userId: string, commentId: string) =>
    ({
      type: SET_COMMENT_LIKE,
      payload: {
        userId,
        commentId,
      },
    } as const),
}

export const addCommentThunk =
  (resetInput: () => void, message: string, postId: string, parentId?: string): ThunkT<CommentActionT> =>
    async (dispatch, getState) => {
      try {
        dispatch(commentActions.setIsLoadingCommentAC(true))
        const { data } = await api.comment(message, postId, parentId)
        resetInput()
        dispatch(commentActions.addCommentAC(data))
        dispatch(commentActions.setCountCommentsAC(getState().comment.commentsCount + 1))
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(commentActions.setIsLoadingCommentAC(false))
      }
    }

export const getCommentsThunk =
  (postId: string, page: number, sortQuery: number): ThunkT<CommentActionT> =>
    async (dispatch) => {
      try {
        dispatch(commentActions.setIsFetchingCommentsAC(true))
        const { data } = await api.fetchComments(postId, page, sortQuery)
        dispatch(commentActions.setCommentsAC(data.comments))
        dispatch(commentActions.setCountCommentsAC(data.commentsCount))
        dispatch(commentActions.setPagesCountAC(data.pagesCount))
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(commentActions.setIsFetchingCommentsAC(false))
      }
    }

export const deleteCommentThunk =
  (commentId: string): ThunkT<CommentActionT> =>
    async (dispatch) => {
      try {
        dispatch(commentActions.setIsFetchingCommentsAC(true))
        const { data } = await api.deleteComment(commentId)
        dispatch(commentActions.deleteCommentAC(commentId))
        dispatch(commentActions.setCountCommentsAC(data.commentsCount))
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(commentActions.setIsFetchingCommentsAC(false))
      }
    }

export const updateCommentThunk =
  (resetCallback: () => void, message: string, commentId: string): ThunkT<CommentActionT> =>
    async (dispatch) => {
      try {
        const { data } = await api.updateComment(message, commentId)
        resetCallback()
        dispatch(commentActions.updateCommentAC(data))
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(commentActions.setIsLoadingCommentAC(false))
      }
    }

export const likeCommentThunk =
  (userId: string, commentId: string): ThunkT<CommentActionT> =>
    async (dispatch) => {
      try {
        await api.likeComment(commentId)
      } catch (e) {
        console.log(e)
        // if the response got with an error we cancel action of setting like in global state
        dispatch(commentActions.setLikeCommentAC(userId, commentId))
      }
    }