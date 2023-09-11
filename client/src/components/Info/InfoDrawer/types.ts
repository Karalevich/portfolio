import { ForwardedRef, FunctionComponent } from 'react'

export type InfoDrawerProps = {
  className?: string
  closeDrawer?: () => void
  isFixed: boolean
  ref?: ForwardedRef<HTMLElement>
}
export type InfoDrawerComponent = FunctionComponent<InfoDrawerProps>
