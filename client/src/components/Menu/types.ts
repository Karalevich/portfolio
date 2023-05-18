import { FunctionComponent } from 'react'

type MenuProps = {
  toggleNav: (open: boolean) => void
  toggleInfo: (open: boolean) => void
}
export type MenuComponent = FunctionComponent<MenuProps>
