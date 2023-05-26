import { FunctionComponent } from 'react'
import { FileT } from '../../../reducers/posts/types'
import { FileWithPath } from 'react-dropzone'

type DropZoneProps = {
  fileField: boolean
  resetFileField: (value: boolean) => void
  removeFileFromForm: (img: string) => void,
  myFiles: Array<FileWithPath>,
  setMyFiles: (files: string) => void
}
export type DropZoneComponent = FunctionComponent<DropZoneProps>
