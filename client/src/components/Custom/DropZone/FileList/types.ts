import { FunctionComponent } from 'react'
import { FileT } from '../../../../reducers/posts/types'
import { FileWithPath } from 'react-dropzone'

type FileListProps = {
  acceptedFiles: Array<FileWithPath>
  removeFile: (file: string) => void
}
export type FileListComponent = FunctionComponent<FileListProps>
