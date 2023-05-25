import { FileT } from '../../../../reducers/posts/types'
import { FunctionComponent } from 'react'
import { AuthorT } from '../types'

type CommentT = {
  author: AuthorT
  text: string
}

export type PostT = {
  img: FileT
  title: string
  description: string
  content: string
  author: AuthorT
  date: string
  comments?: Array<CommentT>
  _id: string
  isFullVersion?: boolean
  isFetchingPosts?: boolean
  likes: Array<string>
  tags: Array<string>
}

export type PostCardComponent = FunctionComponent<PostT>
