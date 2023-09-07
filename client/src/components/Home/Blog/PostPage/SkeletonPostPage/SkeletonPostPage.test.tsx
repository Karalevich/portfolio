import React from 'react'
import { render, screen } from '@testing-library/react'
import SkeletonPostPage from './SkeletonPostPage'

describe('SkeletonPostPage Component', () => {
  test('should render skeleton', async () => {
    render(<SkeletonPostPage />)

    const skeletonElement = screen.getByLabelText('skeleton post page')

    expect(skeletonElement).toBeInTheDocument()
  })
})
