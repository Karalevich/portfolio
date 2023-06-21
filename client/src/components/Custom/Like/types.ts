import { FunctionComponent } from 'react'

type LikeProps = {
  isLiked: boolean
  onClick: () => void
  count: number
  disabled: boolean
}
export type LikeComponent = FunctionComponent<LikeProps>
