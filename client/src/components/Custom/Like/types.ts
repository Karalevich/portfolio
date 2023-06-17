import { FunctionComponent } from 'react'

type LikeProps = {
  isLiked: boolean
  onClick: () => void
  count: number
}
export type LikeComponent = FunctionComponent<LikeProps>
