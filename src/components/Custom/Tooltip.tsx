import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Tooltip as MUITooltip} from '@mui/material';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MUITooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(12,20,28,.9)',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(12,20,28,.9)',
    //boxShadow: '0 0 0 1px rgba(0,0,0,.56)',
    borderRadius: '2px',
    opacity: '0.1'
  },
}));