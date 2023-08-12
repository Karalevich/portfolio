import { FunctionComponent } from 'react'
import { FileWithPath } from 'react-dropzone'

type DropZoneProps = {
  removeFileFromForm: (img: string) => void
  myFiles: Array<FileWithPath>
  setMyFiles: (files: Array<FileWithPath>) => void
  error?: string | boolean
  disabled?: boolean
}
export type DropZoneComponent = FunctionComponent<DropZoneProps>
