import { ReactElement } from 'react'
import { SvgIconProps } from '@mui/material'
import { SERVICES_NAVIGATION } from './personalInfo'

export type ServiceT = {
  icon: (props: SvgIconProps) => ReactElement
  preview: string
  description: string
  navigatePath: SERVICES_NAVIGATION
}
