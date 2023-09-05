import { FunctionComponent } from 'react'

export type BlogProps = {
  isFullVersion: boolean
}
export type BlogComponent = FunctionComponent<BlogProps>

export type AuthorT = {
  _id: string
  name: string
  imageUrl: string
}

