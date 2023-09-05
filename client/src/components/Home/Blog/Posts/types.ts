import { FunctionComponent } from 'react'

export type PostsProps = {
  isTabletOrMobile: boolean
  isFullVersion: boolean
}
export type PostsContent = FunctionComponent<PostsProps>