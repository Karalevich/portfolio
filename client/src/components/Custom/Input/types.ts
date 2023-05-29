import { InputBaseProps } from '@mui/material'
import { FunctionComponent } from 'react'

type InputProps = InputBaseProps & {
  label?: string | boolean
  helperText?: string | boolean
}
export type InputComponent = FunctionComponent<InputProps>
