import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Tooltip as MUITooltip } from '@mui/material'
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MUITooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(12,20,28,.9)',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    borderRadius: '2px',
  },
}))
