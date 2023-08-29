import { ChangeEvent, FormEvent, FunctionComponent } from 'react'

export type CommentFormProps = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoadingComments?: boolean
  disabled?: boolean
}
export type CommentFormComponent = FunctionComponent<CommentFormProps>
