import { FunctionComponent, ReactElement } from 'react'
import { SvgIconProps } from '@mui/material'

export type ContactCardProps = {
  info: Array<{ title: string; value: string; href?: string }>
  icon: (props: SvgIconProps) => ReactElement
}
export type ContactCardComponent = FunctionComponent<ContactCardProps>
