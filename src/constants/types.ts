import { ReactElement } from "react"
import { SvgIconProps } from '@mui/material'

export type ServiceT = {
  icon: (props: SvgIconProps) => ReactElement,
  preview: string,
  description: string
}