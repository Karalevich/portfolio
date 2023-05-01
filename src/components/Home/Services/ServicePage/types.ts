import { FunctionComponent, ReactElement } from 'react'
import { SvgIconProps } from '@mui/material'

type ServicePageProps = {}
export type ServicePageComponent = FunctionComponent<ServicePageProps>

export type ServicePage = {
  serviceTitle: string,
  icons: Array<(props: SvgIconProps) => ReactElement>,
  examples: Array<Article>
}

type Article = {
  image?: string,
  text: Array<string>,
  link?: string
}
