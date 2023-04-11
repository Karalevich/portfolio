import { FunctionComponent } from "react"

type BlogProps = {  }
export type BlogComponent = FunctionComponent<BlogProps>

type PostProps = {
  index: number,
  img: string,
  title: string,
  description: string
}
export type PostContent = FunctionComponent<PostProps>