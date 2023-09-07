import { render, screen } from '@testing-library/react'
import EducationPreview from './EducationPreview'
import { EDUCATION_HISTORY } from '../../../constants/personalInfo'

describe('EducationPreview component', () => {
  test('renders the education preview with the provided data', () => {
    render(<EducationPreview />)

    // Test for the presence of section header content
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText(/I graduated from the/)).toBeInTheDocument()

    expect(screen.getAllByLabelText('education-item').length).toBe(EDUCATION_HISTORY.length)
  })
})
