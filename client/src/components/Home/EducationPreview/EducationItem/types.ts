import { FunctionComponent } from 'react'

type EducationItemProps = {
  name: string
  occupation: string
  date: string
  document: string
  description: string
}
export type EducationItemComponent = FunctionComponent<EducationItemProps>
