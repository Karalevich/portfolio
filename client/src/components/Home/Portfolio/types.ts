import { FunctionComponent } from 'react'
import { PORTFOLIO_TOPIC } from '../../../constants/types'

type PortfolioProps = {}
export type PortfolioComponent = FunctionComponent<PortfolioProps>

export type ProjectT = {
  name: string
  topic: PORTFOLIO_TOPIC
  img: string
  linkDemo?: string
  linkRepo?: string
  comingSoon?: boolean
}
