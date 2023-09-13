import { render, screen } from '@testing-library/react'
import LazyLoadSuspense from './LazyLoadSuspense'

describe('LazyLoadSuspense', () => {
  test('should render its children when not in a suspended state', () => {
    render(<LazyLoadSuspense children={<div data-testid='child'>Child Component</div>} />)

    // Check if child component is rendered when not in a suspended state
    const childComponent = screen.getByTestId('child')
    expect(childComponent).toBeInTheDocument()
  })
})
