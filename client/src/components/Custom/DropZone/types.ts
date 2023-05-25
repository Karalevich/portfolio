import { FunctionComponent } from 'react'
import { FileT } from '../../../reducers/posts/types'
import { CreatePostWithArrayImgT } from '../../Home/Blog/AddPost/types'

type DropZoneProps = {
  onChange: (files: string, postData: CreatePostWithArrayImgT) => void
  postData: CreatePostWithArrayImgT
  fileField: boolean
  resetFileField: (value: boolean) => void
  removeFileFromForm: (postData: CreatePostWithArrayImgT, img: Array<FileT>) => void
}
export type DropZoneComponent = FunctionComponent<DropZoneProps>
