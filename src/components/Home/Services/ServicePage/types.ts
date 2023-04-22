import { FunctionComponent } from 'react'

type ServicePageProps = {}
export type ServicePageComponent = FunctionComponent<ServicePageProps>

export type ServicePage = {
  serviceTitle: string,
  image: string,
  projectsTitle: string,
  firstArticle: Article,
  secondArticle: Article,
  thirdArticle: string
}

type Article = {
  image?: string,
  text: string
}
