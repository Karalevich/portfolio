import { FunctionComponent } from 'react'
import { SelectedFileT } from '../../../reducers/posts/types'

type BlogProps = {
  isFullVersion: boolean
}
export type BlogComponent = FunctionComponent<BlogProps>

type CommentT = {
  author: AuthorT
  text: string
}

export type AuthorT = {
  name: string
  img?: SelectedFileT
}

type PostsProps = {
  isTabletOrMobile: boolean
  isFullVersion: boolean
}
export type PostsContent = FunctionComponent<PostsProps>

export type PostT = {
  img: SelectedFileT
  title: string
  description: string
  author: AuthorT
  date: string
  comments?: Array<CommentT>
  _id: string
  isFullVersion?: boolean,
  isFetchingPosts?: boolean
  likes: Array<string>,
}

export type PostCardComponent = FunctionComponent<PostT>
