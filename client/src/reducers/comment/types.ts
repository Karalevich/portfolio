import { ActionT } from '../store'
import { AuthorT } from '../../components/Home/Blog/types'
import { commentActions } from '../../actions/commentAction'

export type CommentT = {
  _id: string
  author: AuthorT
  post: string
  parent?: string
  children: Array<string>
  likes: Array<string>
  message: string
  created_at: Date
  updated_at: Date
}

export type CommentStateT = {
  comments: Array<CommentT>
  isFetchingComments: boolean
  isLoadingComment: boolean
  commentsCount: number
  pagesCount: number
  page: number
}

export type CommentActionT = ActionT<typeof commentActions>
