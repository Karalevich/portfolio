import { FunctionComponent } from 'react'
import { AuthorT } from '../types'

type CommentProps = {
  author: AuthorT
  date: string
  message: string
  id: string
}
export type CommentComponent = FunctionComponent<CommentProps>
