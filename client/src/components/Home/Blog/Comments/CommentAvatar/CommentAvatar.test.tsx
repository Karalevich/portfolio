import React from 'react'
import { render, screen } from '@testing-library/react'
import CommentAvatar from './CommentAvatar'
import { CommentAvatarProps } from './types'

const mockedInitialProps = {
  name: 'test Name',
  imageUrl: 'test url',
}

describe('CommentAvatar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = (mockedProps: CommentAvatarProps) => {
    return render(<CommentAvatar {...mockedProps} />)
  }

  test('render the image when it passes in component via props with alt equal name', () => {
    renderComponent(mockedInitialProps)
    const avatarElement = screen.getByLabelText('avatar-image')

    expect(avatarElement).toBeInTheDocument()
    expect(avatarElement.getAttribute('alt')).toBe(mockedInitialProps.name)
  })

  test('render the name placeholder when the image does not provided', () => {
    renderComponent({
      ...mockedInitialProps,
      imageUrl: '',
    })
    const avatarElement = screen.getByText(mockedInitialProps.name[0].toUpperCase())

    expect(avatarElement).toBeInTheDocument()
  })
})
