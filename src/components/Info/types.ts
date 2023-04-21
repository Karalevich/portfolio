import { ForwardedRef, FunctionComponent } from 'react'

type InfoProps = {
  ref: ForwardedRef<HTMLElement>,
  isFixed: boolean,
  toggleInfo: (open: boolean) => void,
  isOpen: boolean,
}
export type InfoComponent = FunctionComponent<InfoProps>

type InfoDrawerProps = {
  className?: string,
  closeDrawer?: () => void,
  isFixed: boolean,
  ref?: ForwardedRef<HTMLElement>,
}
export type InfoDrawerComponent = FunctionComponent<InfoDrawerProps>