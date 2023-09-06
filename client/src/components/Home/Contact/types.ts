import { FunctionComponent } from 'react'

export type ContactValuesT = {
  name: string
  subject: string
  message: string
  email: string
}
type ContactProps = {}
export type ContactComponent = FunctionComponent<ContactProps>

