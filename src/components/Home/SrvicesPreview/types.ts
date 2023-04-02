import { FunctionComponent, ReactElement } from 'react'
import { SvgIconProps } from '@mui/material'

type ServicesPreviewProps = {  }
export type ServicesPreviewComponent = FunctionComponent<ServicesPreviewProps>

type ServicePreviewProps = { title: string, preview: string, description: string, icon: (props: SvgIconProps) => ReactElement }
export type ServicePreviewComponent = FunctionComponent<ServicePreviewProps>