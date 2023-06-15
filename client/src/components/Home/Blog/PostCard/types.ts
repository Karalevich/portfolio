import { FileT } from '../../../../reducers/blog/types'
import { ForwardedRef, FunctionComponent } from 'react'
import { AuthorIdT } from '../types'

export type CommentT = {
  author: AuthorIdT
  text: string
}

export type PostT = {
  img: FileT
  title: string
  description: string
  _id: string
  isFullVersion?: boolean
  isFetchingPosts?: boolean
  ref?: ForwardedRef<HTMLDivElement | null>
}

export type CertainPostT = PostT & {
  comments?: Array<CommentT>
  likes: Array<string>
  tags: Array<string>
  content: string
  author: AuthorIdT
  date: string
}

export type PostCardComponent = FunctionComponent<PostT>

export type RecommendCardT = Pick<
  CertainPostT,
  'img' | 'title' | '_id' | 'date' | 'author' | 'isFetchingPosts'
>

export type RecommendCardComponent = FunctionComponent<RecommendCardT>
