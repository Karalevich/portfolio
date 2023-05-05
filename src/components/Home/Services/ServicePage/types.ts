import { FunctionComponent, ReactElement } from 'react'
import { SvgIconProps } from '@mui/material'

type ServicePageProps = {}
export type ServicePageComponent = FunctionComponent<ServicePageProps>

export type ServicePageT = {
  serviceTitle: string,
  icons: Array<(props: SvgIconProps) => ReactElement>,
  examples: Array<ArticleT>
}

export type ArticleT = {
  image?: string,
  text: Array<string>,
  link?: string
}
