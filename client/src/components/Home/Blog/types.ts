import { FunctionComponent } from 'react'
import { SelectedFileT } from '../../../reducers/posts/types'

type BlogProps = {
  isFullVersion: boolean
}
export type BlogComponent = FunctionComponent<BlogProps>

export type AuthorT = {
  name: string
  img?: SelectedFileT
}

type PostsProps = {
  isTabletOrMobile: boolean
  isFullVersion: boolean
}
export type PostsContent = FunctionComponent<PostsProps>
