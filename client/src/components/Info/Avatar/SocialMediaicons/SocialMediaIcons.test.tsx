import { render, screen } from '@testing-library/react'
import SocialMediaIcons from './SocialMediaIcons'
import { ICONS } from '../../../../constants/personalInfo'

// Mock the Tooltip component
jest.mock('../../../Custom/Tooltip', () => ({
  Tooltip: ({ children }: any) => <div data-testid='tooltip'>{children}</div>,
}))

describe('SocialMediaIcons Component', () => {
  test('renders social media icons', () => {
    render(<SocialMediaIcons />)
    const socialMediaElement = screen.getByLabelText('social-media')

    expect(socialMediaElement).toBeInTheDocument()

    // Check if each tooltip contains a link with the correct href
    Object.entries(ICONS).forEach(([key, [icon, link]]) => {
      const tooltipElement = screen.getByLabelText(key)

      expect(tooltipElement).toBeInTheDocument()
      expect(tooltipElement).toHaveAttribute('href', link)
    })
  })
})
