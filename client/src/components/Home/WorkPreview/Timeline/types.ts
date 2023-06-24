import { FunctionComponent } from 'react'

type TimelineProps = {
  setObserver: (arg: any, callback?: () => void) => void
  callback?: () => void
}
export type TimelineComponent = FunctionComponent<TimelineProps>

type IconProps = {
  activeStep: number
  index: number
}
export type IconComponent = FunctionComponent<IconProps>
