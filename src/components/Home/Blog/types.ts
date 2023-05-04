import { FunctionComponent } from 'react'

type BlogProps = {
  isFullVersion: boolean
}
export type BlogComponent = FunctionComponent<BlogProps>

export type PostProps = {
  img: string,
  title: string,
  description: string,
  author: AuthorT,
  date: string,
  comments?: Array<CommentT>,
  id: string
}

type CommentT = {
  author: AuthorT,
  text: string,
}

export type AuthorT = {
  name: string,
  img?: string
}

type PostsProps = {
  isTabletOrMobile: boolean,
  isFullVersion: boolean
}
export type PostsContent = FunctionComponent<PostsProps>

export type PostCardComponent = FunctionComponent<PostProps>