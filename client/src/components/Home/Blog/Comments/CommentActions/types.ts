import { FunctionComponent } from 'react'
import { AuthorT } from '../../types'

type CommentTacticsProps = {
  editAction?: () => void
  deleteAction?: () => void
  shareAction: () => void
  replayAction: () => void
  author: AuthorT
}
export type CommentTacticsComponent = FunctionComponent<CommentTacticsProps>
