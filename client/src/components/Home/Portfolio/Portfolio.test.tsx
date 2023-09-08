import { render, fireEvent, screen } from '@testing-library/react'
import Portfolio from './Portfolio'
import { PORTFOLIO } from '../../../constants/personalInfo'
import { PORTFOLIO_TOPIC } from '../../../constants/types'

describe('Portfolio Component', () => {
  test('renders without crashing', () => {
    render(<Portfolio />)

    const portfolioElement = screen.getByLabelText('portfolio')
    const titleElement = screen.getByText('Portfolio')
    const introductionElement = screen.getByText(/Web technologies are not/)
    const tablistElement = screen.getByRole('tablist')
    const tabsElement = screen.getAllByRole('tab')
    const tabpanelElement = screen.getByLabelText('tabpanel-wrapper')

    expect(portfolioElement).toBeInTheDocument()
    expect(titleElement).toBeInTheDocument()
    expect(introductionElement).toBeInTheDocument()
    expect(tablistElement).toBeInTheDocument()
    expect(tabpanelElement).toBeInTheDocument()
    expect(tabsElement.length).toBe(PORTFOLIO.tabs.length)
  })

  test('renders TabPanel with projects based on selected tab', () => {
    render(<Portfolio />)

    const frontedTab = screen.getByRole('tab', { name: 'Frontend' })
    // Click on the 'Frontend' tab
    fireEvent.click(frontedTab)
    // Check if a project from the 'Frontend' category is displayed
    const frontendProject = screen.getByAltText(
      PORTFOLIO.projects.filter((p) => p.topic === PORTFOLIO_TOPIC.FRONTEND)[0].name
    )
    expect(frontendProject).toBeInTheDocument()
    // Check if a project from the 'Full Stack' category is not displayed
    const fullstackProject = screen.queryByAltText(
      PORTFOLIO.projects.filter((p) => p.topic === PORTFOLIO_TOPIC.FULL_STACK)[0].name
    )
    expect(fullstackProject).not.toBeInTheDocument()
  })
})
