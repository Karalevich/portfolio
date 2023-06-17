import { RootStateT } from '../reducers/store'

export const getFetchingCommentsS = (state: RootStateT) => state.comment.isFetchingComments
export const getLoadingCommentsS = (state: RootStateT) => state.comment.isLoadingComment
export const getCommentsS = (state: RootStateT) => state.comment.comments
export const getCountCommentsS = (state: RootStateT) => state.comment.commentsCount
export const getCountPagesPagesS = (state: RootStateT) => state.comment.pagesCount
