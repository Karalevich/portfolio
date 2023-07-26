import { render, screen } from '@testing-library/react'
import DynamicCSS from './DynamicCSS'

const mockProperties = [
  { prop: 'color', value: 'red' },
  { prop: 'font-size', value: '16px' },
  { prop: 'background', value: '#f0f0f0' },
]

describe('DynamicCSS Component', () => {
  test('renders the correct CSS styles', () => {
    render(<DynamicCSS properties={mockProperties} />)
    const styleTag = screen.getByLabelText('dynamicCSS')

    expect(styleTag).toBeInTheDocument()

    // Concatenate properties to create the expected CSS content
    const expectedCss = ':root {--color: red;--font-size: 16px;--background: #f0f0f0;}'
    expect(styleTag).toHaveTextContent(expectedCss)
  })

  test('renders an empty style tag if no properties are provided', () => {
    render(<DynamicCSS properties={[]} />)
    const styleTag = screen.getByLabelText('dynamicCSS')

    expect(styleTag).toBeInTheDocument()
    expect(styleTag).toHaveTextContent(':root {}')
  })
})
