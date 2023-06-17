import { ChangeEvent, FormEvent, FunctionComponent } from 'react'
import { CommentT } from '../../../../reducers/comment/types'

type CommentsProps = {}
export type CommentsComponent = FunctionComponent<CommentsProps>

type CommentListProps = {
  comments: Array<CommentT>
  getReplies: (parentId: string) => Array<CommentT>
}
export type CommentListComponent = FunctionComponent<CommentListProps>

type CommentFormProps = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoadingComments?: boolean
}
export type CommentFormComponent = FunctionComponent<CommentFormProps>
