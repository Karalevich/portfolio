import { FunctionComponent } from 'react'

type DropdownProps = {
  selects: Array<string>
  onSelect?: (item: string) => void
}
export type DropdownComponent = FunctionComponent<DropdownProps>
