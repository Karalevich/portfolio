import { ActionT } from '../store'
import { CommentT, RecommendCardT } from '../../components/Home/Blog/PostCard/types'
import { FileT } from '../blog/types'
import { AuthorIdT } from '../../components/Home/Blog/types'
import { postActions } from '../../actions/postAction'

export type PostStateT = {
  relatedPosts: Array<RecommendCardT>
  isFetchingForm: boolean
  isFetchingRelatedPosts: boolean
  isFetchingPost: boolean

  img: FileT
  title: string
  description: string
  _id: string
  comments?: Array<CommentT>
  likes: Array<string>
  tags: Array<string>
  content: string
  author: AuthorIdT
  date: string
}

export type PostActionT = ActionT<typeof postActions>
