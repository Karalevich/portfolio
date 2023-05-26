import { FunctionComponent } from 'react'
import { FileT } from '../../../../reducers/posts/types'
import { FileWithPath } from 'react-dropzone'

export type CreatePostT = {
  title: string
  description: string
  content: string
  tags: string | Array<string>
  img: FileT
}

export type CreatePostWithArrayImgT = {
  [K in keyof Omit<CreatePostT, 'content'>]: K extends 'img' ? Array<FileWithPath> : CreatePostT[K]
}
type AddPostProps = {}

export type AddPostComponent = FunctionComponent<AddPostProps>
