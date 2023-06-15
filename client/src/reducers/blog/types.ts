import { ActionT } from '../store'
import { blogActions } from '../../actions/blogAction'
import { PostT } from '../../components/Home/Blog/PostCard/types'
import { FileWithPath } from 'react-dropzone'

export type BlogStateT = {
  posts: Array<PostT>
  isFetchingPosts: boolean
  isFetchingPaginatedPosts: boolean
  allPages: number
  currentPage: number
  searchValue: string
  sortValue: number
}

export type BlogActionT = ActionT<typeof blogActions>

export type FileT = string | ArrayBuffer | FileWithPath
