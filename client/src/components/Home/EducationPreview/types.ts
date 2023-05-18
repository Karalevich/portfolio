import { FunctionComponent } from 'react'

type EducationPreviewProps = {}
export type EducationPreviewComponent = FunctionComponent<EducationPreviewProps>

type EducationItemProps = {
  name: string
  occupation: string
  date: string
  document: string
  description: string
}
export type EducationItemComponent = FunctionComponent<EducationItemProps>
