import { FunctionComponent } from 'react'
import { AuthorIdT } from '../types'

type CommentProps = {
  authorName: string
  authorImg: string
  date: string
  message: string
  id: string
}
export type CommentComponent = FunctionComponent<CommentProps>
