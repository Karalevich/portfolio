import { FileT } from '../../../../reducers/posts/types'
import { FunctionComponent } from 'react'
import { AuthorIdT } from '../types'

type CommentT = {
  author: AuthorIdT
  text: string
}

export type PostT = {
  img: FileT
  title: string
  description: string
  content: string
  author: AuthorIdT
  date: string
  _id: string
  isFullVersion?: boolean
  isFetchingPosts?: boolean
  likes: Array<string>
  tags: Array<string>
}

export type CertainPostT = PostT & {
  authorName: string
  authorImg?: string
  comments?: Array<CommentT>
}

export type PostCardComponent = FunctionComponent<PostT>

export type RecommendCardT = Pick<CertainPostT, 'img' | 'title' | '_id' | 'date' | 'authorName'>

export type RecommendCardComponent = FunctionComponent<RecommendCardT>
