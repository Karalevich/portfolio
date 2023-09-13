import { FunctionComponent } from 'react'

export type NavProps = {
  toggleNav: (open: boolean) => void
  isOpen: boolean
}
export type NavComponent = FunctionComponent<NavProps>

export type IndexToTabNameT = { [property: string]: number }
export type TabNameToIndexT = { [property: number]: string }
