import { FunctionComponent } from 'react'

type PortfolioProps = {}
export type PortfolioComponent = FunctionComponent<PortfolioProps>

export type ProjectT = {
  name: string
}

type TabPanelProps = {
  dir?: string
  index: number
  activeTab: number
  projects: Array<ProjectT>
}
export type TabPanelComponent = FunctionComponent<TabPanelProps>
