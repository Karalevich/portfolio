import { FunctionComponent } from 'react'
import { FileWithPath } from 'react-dropzone'

type FileListProps = {
  acceptedFiles: Array<FileWithPath>
  removeFile: (file: FileWithPath) => void
}
export type FileListComponent = FunctionComponent<FileListProps>
