import { FunctionComponent } from 'react'

type DynamicCSSProps = {
  properties: Array<CSSProp>
}

export type CSSProp = {
    value: number | string,
    prop: string,
  }
export type DynamicCSSComponent = FunctionComponent<DynamicCSSProps>