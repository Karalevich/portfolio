import { FunctionComponent, ReactElement } from 'react'
import { SvgIconProps } from '@mui/material'
import { SERVICES_NAVIGATION } from '../../../constants/personalInfo'

type ServicesProps = {}
export type ServicesComponent = FunctionComponent<ServicesProps>

type ServiceProps = {
  title: string
  preview: string
  description: string
  icon: (props: SvgIconProps) => ReactElement
  navigatePath: SERVICES_NAVIGATION
}
export type ServiceComponent = FunctionComponent<ServiceProps>
