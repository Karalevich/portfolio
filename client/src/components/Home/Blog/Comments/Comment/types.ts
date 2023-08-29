import { FunctionComponent } from 'react'
import { CommentT } from '../../../../../reducers/comment/types'

export type CommentProps = CommentT & {
  getReplies: (parentId: string) => Array<CommentT>
}
export type CommentComponent = FunctionComponent<CommentProps>
