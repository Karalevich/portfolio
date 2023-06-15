import { FunctionComponent } from 'react'
import { FileT } from '../../../../reducers/blog/types'
import { FileWithPath } from 'react-dropzone'

export type PostFromFormT = {
  title: string
  description: string
  content: string
  tags: string | Array<string>
  img: FileT
}

export type PostFromFormWithArrayImgT = {
  [K in keyof PostFromFormT]: K extends 'img' ? Array<FileWithPath> : PostFromFormT[K]
}
type AddPostProps = {}

export type AddPostComponent = FunctionComponent<AddPostProps>
