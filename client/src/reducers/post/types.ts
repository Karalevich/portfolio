import { ActionT } from '../store'
import { FileT } from '../blog/types'
import { AuthorT } from '../../components/Home/Blog/types'
import { postActions } from '../../actions/postAction'
import { RecommendCardT } from '../../components/Home/Blog/RecommendCard/types'

export type PostStateT = {
  relatedPosts: Array<RecommendCardT>
  isFetchingForm: boolean
  isFetchingRelatedPosts: boolean
  isFetchingPost: boolean

  img: FileT
  title: string
  description: string
  _id: string
  comments: Array<string>
  likes: Array<string>
  tags: Array<string>
  content: string
  author: AuthorT
  date: string
}

export type PostActionT = ActionT<typeof postActions>
