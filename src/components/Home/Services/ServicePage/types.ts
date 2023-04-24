import { FunctionComponent, ReactElement } from 'react'
import { SvgIconProps } from '@mui/material'

type ServicePageProps = {}
export type ServicePageComponent = FunctionComponent<ServicePageProps>

type CustomSeparatorProps = {
  currentService: string
}
export type CustomSeparatorComponent = FunctionComponent<CustomSeparatorProps>

export type ServicePage = {
  serviceTitle: string,
  icons: Array<(props: SvgIconProps) => ReactElement>,
  projectsTitle: string,
  firstArticle: Article,
  secondArticle: Article,
  thirdArticle: string
}

type Article = {
  image?: string,
  text: string
}
