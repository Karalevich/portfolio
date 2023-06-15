import { RootStateT } from '../reducers/store'
import { PostFromFormWithArrayImgT } from '../components/Home/Blog/AddPost/types'
import { dataURLtoFileWithPath } from '../utils/dataUPLtoFileWithPath'

export const getFetchingFormS = (state: RootStateT) => state.post.isFetchingForm
export const getOpenedPostIdS = (state: RootStateT) => state.post._id
export const getOpenPostS = (state: RootStateT) => ({
  author: state.post.author,
  _id: state.post._id,
  title: state.post.title,
  date: state.post.date,
  content: state.post.content,
  img: state.post.img,
  comments: state.post.comments,
  likes: state.post.likes,
})
export const getRelatedPostsS = (state: RootStateT) => state.post.relatedPosts
export const getFetchingRelatedPostsS = (state: RootStateT) => state.post.isFetchingRelatedPosts
export const getFetchingPostS = (state: RootStateT) => state.post.isFetchingPost
export const getPostDataForFormS = (state: RootStateT): PostFromFormWithArrayImgT => {
  const img = state.post.img ? [dataURLtoFileWithPath(state.post.img as string)] : [] // Convert data URL to FileWithPath
  return {
    title: state.post.title,
    description: state.post.description,
    content: state.post.content,
    tags: state.post.tags.join(','),
    img,
  }
}
