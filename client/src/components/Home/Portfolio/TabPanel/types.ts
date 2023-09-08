import { FunctionComponent } from 'react'
import { ProjectT } from '../types'

export type TabPanelProps = {
  dir?: string
  projects: Array<ProjectT>
}
export type TabPanelComponent = FunctionComponent<TabPanelProps>
