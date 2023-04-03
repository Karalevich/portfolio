import { FunctionComponent } from 'react'

type PriceProps = {}
export type PriceComponent = FunctionComponent<PriceProps>

export type PriceItemProps = {
  title: string,
  description: string,
  price: number,
  isPopular: boolean,
  duties: Array<{
    name: string,
    isRequired: boolean
  }>
}
export type PriceItemComponent = FunctionComponent<PriceItemProps>