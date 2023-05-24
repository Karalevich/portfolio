import { ActionT } from '../store'
import { actionsPosts } from '../../actions/postsAction'
import { PostT } from '../../components/Home/Blog/types'

export type PostsStateT = {
  posts: Array<PostT>
  relatedPosts: Array<PostT>
  post: PostT | null
  isFetchingPosts: boolean
  isFetchingForm: boolean
  isFetchingRelatedPosts: boolean
  numberOfPages: number
  openedPostId: null | string
}

export type PostsActionT = ActionT<typeof actionsPosts>

export type SelectedFileT = Array<string | ArrayBuffer> | string

export interface PostFormDataI {
  title: string
  message: string
  tags: string | Array<string>
  selectedFile: SelectedFileT
}

export interface PostDataInterface extends PostFormDataI {
  name: string | undefined
}