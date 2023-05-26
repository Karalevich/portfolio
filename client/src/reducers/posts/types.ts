import { ActionT } from '../store'
import { actionsPosts } from '../../actions/postsAction'
import { CertainPostT, PostT, RecommendCardT } from '../../components/Home/Blog/PostCard/types'
import { FileWithPath } from 'react-dropzone'

export type PostsStateT = {
  posts: Array<PostT>
  relatedPosts: Array<RecommendCardT>
  post: CertainPostT | null
  isFetchingPosts: boolean
  isFetchingForm: boolean
  isFetchingRelatedPosts: boolean
  numberOfPages: number
  openedPostId: null | string
}

export type PostsActionT = ActionT<typeof actionsPosts>

export type FileT = string | ArrayBuffer | FileWithPath
