import { RootStateT } from '../reducers/store'

export const getPostsS = (state: RootStateT) => state.posts.posts
export const getCertainPostS = (state: RootStateT) => state.posts.post
export const getRelatedPostsS = (state: RootStateT) => state.posts.relatedPosts
export const getFetchingRelatedPostsS = (state: RootStateT) => state.posts.isFetchingRelatedPosts
export const getNumberOfPagesS = (state: RootStateT) => state.posts.numberOfPages
export const getFetchingPostsS = (state: RootStateT) => state.posts.isFetchingPosts
export const getOpenedPostIdS = (state: RootStateT) => state.posts.openedPostId
// export const getOpenedPostS = (state: RootStateT): null | PostFormDataInterface => {
//   const post = state.posts.posts.find(post => post._id === state.posts.openedPostId)
//   if (post === undefined) {
//     return null
//   } else {
//     return {
//       title: post.title,
//       message: post.message,
//       tags: post.tags.join(','),
//       selectedFile: post.selectedFile
//     }
//   }
// }

