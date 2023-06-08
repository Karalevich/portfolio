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
  date: string
  _id: string
  isFullVersion?: boolean
  isFetchingPosts?: boolean
}

export type CertainPostT = PostT & {
  authorName: string
  authorImg?: string
  comments?: Array<CommentT>
  likes: Array<string>
  tags: Array<string>
  content: string
  author: AuthorIdT
}

export type PostCardComponent = FunctionComponent<PostT>

export type RecommendCardT = Pick<
  CertainPostT,
  'img' | 'title' | '_id' | 'date' | 'authorName' | 'isFetchingPosts'
>

export type RecommendCardComponent = FunctionComponent<RecommendCardT>
