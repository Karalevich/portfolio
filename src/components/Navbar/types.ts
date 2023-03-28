import { FunctionComponent } from "react"

type NavProps = {  }
export type NavComponent = FunctionComponent<NavProps>

export type IndexToTabNameT = {[property: string]: number}
export type TabNameToIndexT = {[property: number]: string}