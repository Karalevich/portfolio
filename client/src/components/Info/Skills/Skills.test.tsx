import { render, screen } from '@testing-library/react'
import Skills from './Skills'

const skillsData = [
  { skillName: 'Skill 1', skillValue: 80 },
  { skillName: 'Skill 2', skillValue: 60 },
  // Add more skills as needed
]

describe('Skills Component', () => {
  test('renders the title correctly', () => {
    const title = 'Skills Title'
    render(<Skills title={title} skills={skillsData} isProgressBar={true} />)
    const titleElement = screen.getByText(title)
    expect(titleElement).toBeInTheDocument()
  })

  test('renders skill names correctly', () => {
    render(<Skills title='Skills' skills={skillsData} isProgressBar={true} />)

    skillsData.forEach((skill) => {
      const skillNameElement = screen.getByText(skill.skillName)
      expect(skillNameElement).toBeInTheDocument()
    })
  })

  test('renders skill values correctly when isProgressBar is true', () => {
    render(<Skills title='Skills' skills={skillsData} isProgressBar={true} />)

    skillsData.forEach((skill) => {
      const skillValueElement = screen.getByText(`${skill.skillValue}%`)
      expect(skillValueElement).toBeInTheDocument()
    })
  })

  test('renders extra skill icons when isProgressBar is false', () => {
    render(<Skills title='Skills' skills={skillsData} isProgressBar={false} />)

    const extraSkillIcons = screen.getAllByLabelText('extra-skill')
    expect(extraSkillIcons.length).toBe(skillsData.length)
  })
})
