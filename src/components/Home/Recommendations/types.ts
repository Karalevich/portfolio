import { FunctionComponent } from 'react'

type RecommendationsProps = {}
export type RecommendationsComponent = FunctionComponent<RecommendationsProps>

export type RecommendationProps = {
  title: string,
  author: string,
  occupation: string,
  description: string,
  image: string,
  index?: number
}

type SliderContentComponentProps = {
  widthOfWindow: number
}
export type SliderContentComponent = FunctionComponent<SliderContentComponentProps>


