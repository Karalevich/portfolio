import { CommentT } from '../../../../../reducers/comment/types'
import { FunctionComponent } from 'react'

export type CommentListProps = {
  comments: Array<CommentT>
  getReplies: (parentId: string) => Array<CommentT>
}
export type CommentListComponent = FunctionComponent<CommentListProps>
