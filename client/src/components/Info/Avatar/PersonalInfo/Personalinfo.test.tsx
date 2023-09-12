import { render, screen } from '@testing-library/react'
import { INFO } from '../../../../constants/personalInfo'
import PersonalInfo from './PersonalInfo'

// Mock the Tooltip component
jest.mock('../../../Custom/Tooltip', () => ({
  Tooltip: ({ children }: any) => <div data-testid='tooltip'>{children}</div>,
}))

describe('PersonalInfo Component', () => {
  test('renders correct components', () => {
    render(<PersonalInfo />)
    const personalInfoElement = screen.getByLabelText('personal-info')

    expect(personalInfoElement).toBeInTheDocument()

    // Check if each tooltip contains a link with the correct href
    Object.entries(INFO).forEach(([key, value]) => {
      const tooltipElement = screen.getByLabelText(key)

      expect(tooltipElement).toBeInTheDocument()
    })
  })
})
