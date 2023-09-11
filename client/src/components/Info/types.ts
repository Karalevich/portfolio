import { ForwardedRef, FunctionComponent } from 'react'

export type InfoProps = {
  ref?: ForwardedRef<HTMLElement>
  isFixed: boolean
  toggleInfo: (open: boolean) => void
  isOpen: boolean
}
export type InfoComponent = FunctionComponent<InfoProps>
