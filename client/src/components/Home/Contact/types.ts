import { FunctionComponent, ReactElement } from 'react'
import { SvgIconProps } from '@mui/material'

export type ContactValuesT = {
  name: string
  subject: string
  message: string
  email: string
}
type ContactProps = {}
export type ContactComponent = FunctionComponent<ContactProps>

export type ContactCardProps = {
  info: Array<{ title: string; value: string; href?: string }>
  icon: (props: SvgIconProps) => ReactElement
}
export type ContactCardComponent = FunctionComponent<ContactCardProps>
