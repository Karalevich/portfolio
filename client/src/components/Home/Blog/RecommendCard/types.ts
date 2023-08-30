import { FunctionComponent } from 'react'
import { CertainPostT } from '../PostCard/types'

export type RecommendCardT = Pick<
  CertainPostT,
  'img' | 'title' | '_id' | 'date' | 'author' | 'isFetchingPosts'
>
export type RecommendCardComponent = FunctionComponent<RecommendCardT>
