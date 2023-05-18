import { ReactElement } from 'react'
import { SvgIconProps } from '@mui/material'
import { SERVICES_NAVIGATION } from './personalInfo'
import { ProjectT } from '../components/Home/Portfolio/types'

export type ServiceT = {
  icon: (props: SvgIconProps) => ReactElement
  preview: string
  description: string
  navigatePath: SERVICES_NAVIGATION
}

export enum PORTFOLIO_TOPIC {
  ALL = 'All Categories',
  FRONTEND = 'Frontend',
  FULL_STACK = 'Full Stack',
  LANDING = 'Landings',
  GAMES = 'Games',
}

export type PortfolioT = {
  tabs: Array<PORTFOLIO_TOPIC>
  projects: Array<ProjectT>
}
