import { RootStateT } from '../reducers/store'

export const getSearchValueS = (state: RootStateT) => state.blog.searchValue
export const getSortValueS = (state: RootStateT) => state.blog.sortValue
export const getFetchingPaginatedPostsS = (state: RootStateT) => state.blog.isFetchingPaginatedPosts
export const getPostsS = (state: RootStateT) => state.blog.posts
export const getAllPagesS = (state: RootStateT) => state.blog.allPages
export const getCurrentPageS = (state: RootStateT) => state.blog.currentPage
export const getFetchingPostsS = (state: RootStateT) => state.blog.isFetchingPosts
