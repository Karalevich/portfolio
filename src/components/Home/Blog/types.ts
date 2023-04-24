import { FunctionComponent } from 'react'

type BlogProps = {}
export type BlogComponent = FunctionComponent<BlogProps>

export type PostProps = {
  img: string,
  title: string,
  description: string
}

type PostsProps = {
  isTabletOrMobile: boolean
}
export type PostsContent = FunctionComponent<PostsProps>