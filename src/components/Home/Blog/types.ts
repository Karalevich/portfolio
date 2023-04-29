import { FunctionComponent } from 'react'

type BlogProps = {
  isFullVersion: boolean
}
export type BlogComponent = FunctionComponent<BlogProps>

export type PostProps = {
  img: string,
  title: string,
  description: string
}

type PostsProps = {
  isTabletOrMobile: boolean,
  isFullVersion: boolean
}
export type PostsContent = FunctionComponent<PostsProps>

export type PostComponent = FunctionComponent<PostProps>