import { FileT } from '../../../../reducers/blog/types'
import { ForwardedRef, FunctionComponent } from 'react'
import { AuthorT } from '../types'

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
  comments: Array<string>
  likes: Array<string>
  tags: Array<string>
  content: string
  author: AuthorT
  date: string
}

export type PostCardComponent = FunctionComponent<PostT>
