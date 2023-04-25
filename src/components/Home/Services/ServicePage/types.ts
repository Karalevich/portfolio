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
  examples: Array<Article>
}

type Article = {
  image?: string,
  text: Array<string>,
  link?: string
}
