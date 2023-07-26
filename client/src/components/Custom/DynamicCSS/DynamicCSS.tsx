import { DynamicCSSComponent } from './types'

const DynamicCSS: DynamicCSSComponent = ({ properties }) => {
  let generateCss = ''
  properties.forEach(({ prop, value }) => {
    const property = `--${prop}: ${value};`
    generateCss += property
  })
  const css = ':root {' + generateCss + '}'

  return <style aria-label='dynamicCSS'>{css}</style>
}

export default DynamicCSS
