import { RootStateT } from '../reducers/store'
import { PostFromFormWithArrayImgT } from '../components/Home/Blog/AddPost/types'
import { dataURLtoFileWithPath } from '../utils/dataUPLtoFileWithPath'

export const getSearchValueS = (state: RootStateT) => state.posts.searchValue
export const getSortValueS = (state: RootStateT) => state.posts.sortValue
export const getFetchingPaginatedPostsS = (state: RootStateT) => state.posts.isFetchingPaginatedPosts
export const getPostsS = (state: RootStateT) => state.posts.posts
export const getCertainPostS = (state: RootStateT) => state.posts.post
export const getRelatedPostsS = (state: RootStateT) => state.posts.relatedPosts
export const getFetchingRelatedPostsS = (state: RootStateT) => state.posts.isFetchingRelatedPosts
export const getFetchingCertainPostS = (state: RootStateT) => state.posts.isFetchingCertainPost
export const getAllPagesS = (state: RootStateT) => state.posts.allPages
export const getCurrentPageS = (state: RootStateT) => state.posts.currentPage
export const getFetchingPostsS = (state: RootStateT) => state.posts.isFetchingPosts
export const getFetchingFormS = (state: RootStateT) => state.posts.isFetchingForm
export const getOpenedPostIdS = (state: RootStateT) => state.posts.openedPostId
export const getOpenedPostS = (state: RootStateT): null | PostFromFormWithArrayImgT => {
  const post = state.posts.post
  if (!post) {
    return null
  } else {
    const img = dataURLtoFileWithPath(post.img as string) // Convert data URL to FileWithPath
    return {
      title: post.title,
      description: post.description,
      content: post.content,
      tags: post.tags.join(','),
      img: [img],
    }
  }
}
