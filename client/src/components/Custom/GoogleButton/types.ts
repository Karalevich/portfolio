import { FunctionComponent } from 'react'
import { ButtonProps } from '@mui/material'

type GoogleButtonProps = ButtonProps & {
  text?: string
}
export type GoogleButtonComponent = FunctionComponent<GoogleButtonProps>
