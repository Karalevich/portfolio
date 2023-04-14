import { ForwardedRef, FunctionComponent } from 'react'

type InfoProps = {
  ref: ForwardedRef<HTMLElement>,
  isFixed: boolean
}
export type InfoComponent = FunctionComponent<InfoProps>