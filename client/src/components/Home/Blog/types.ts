import { FunctionComponent } from 'react'

type BlogProps = {
  isFullVersion: boolean
}
export type BlogComponent = FunctionComponent<BlogProps>

export type AuthorT = {
  _id: string
  name: string
  imageUrl: string
}

type PostsProps = {
  isTabletOrMobile: boolean
  isFullVersion: boolean
}
export type PostsContent = FunctionComponent<PostsProps>
