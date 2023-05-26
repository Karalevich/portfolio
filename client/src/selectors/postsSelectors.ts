import { RootStateT } from '../reducers/store'
import { CreatePostT } from '../components/Home/Blog/AddPost/types'

export const getPostsS = (state: RootStateT) => state.posts.posts
export const getCertainPostS = (state: RootStateT) => state.posts.post
export const getRelatedPostsS = (state: RootStateT) => state.posts.relatedPosts
export const getFetchingRelatedPostsS = (state: RootStateT) => state.posts.isFetchingRelatedPosts
export const getNumberOfPagesS = (state: RootStateT) => state.posts.numberOfPages
export const getFetchingPostsS = (state: RootStateT) => state.posts.isFetchingPosts
export const getFetchingFormS = (state: RootStateT) => state.posts.isFetchingForm
export const getOpenedPostIdS = (state: RootStateT) => state.posts.openedPostId
export const getOpenedPostS = (state: RootStateT): null | CreatePostT => {
  const post = state.posts.posts.find((post) => post._id === state.posts.openedPostId)
  if (post === undefined) {
    return null
  } else {
    return {
      title: post.title,
      description: post.description,
      content: post.content,
      tags: post.tags.join(','),
      img: post.img,
    }
  }
}
