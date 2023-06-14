import { FunctionComponent } from 'react'

type CommentProps = {
  authorName: string
  authorImg: string
  date: string
  message: string
  id: string
}
export type CommentComponent = FunctionComponent<CommentProps>
