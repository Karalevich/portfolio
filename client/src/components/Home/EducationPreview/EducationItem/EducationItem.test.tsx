import { render, screen } from '@testing-library/react'

import EducationItem from './EducationItem'

const mockEducation = {
  name: 'University of Example',
  occupation: 'Bachelors in Computer Science',
  date: '2020 - 2024',
  document: 'B.Sc. in Computer Science',
  description: 'Studied computer science and gained valuable skills.',
}

describe('EducationItem component', () => {
  test('renders the education item with the provided data', () => {
    render(<EducationItem {...mockEducation} />)

    // Test for the presence of education item content
    expect(screen.getByText('University of Example')).toBeInTheDocument()
    expect(screen.getByText('Bachelors in Computer Science')).toBeInTheDocument()
    expect(screen.getByText('2020 - 2024')).toBeInTheDocument()
    expect(screen.getByText('B.Sc. in Computer Science')).toBeInTheDocument()
    expect(screen.getByText('Studied computer science and gained valuable skills.')).toBeInTheDocument()
  })
})
