import { render, screen } from '@testing-library/react'
import TabPanel from './TabPanel'
import shoeSore from '../../../../assets/img/portfolio/shoe.webp'
import { PORTFOLIO_TOPIC } from '../../../../constants/types'
import capSore from '../../../../assets/img/portfolio/cap-store.webp'
import crypto from '../../../../assets/img/portfolio/crypto.webp' // Assuming the component is exported as 'TabPanel'

// Define a sample 'projects' array for testing
const sampleProjects = [
  {
    name: 'shoe store',
    img: shoeSore,
    linkDemo: 'https://dashing-cactus-8548d9.netlify.app/',
    linkRepo: 'https://github.com/AndreyKorolevich/shoe-store',
    topic: PORTFOLIO_TOPIC.FRONTEND,
  },
  {
    name: 'cap store',
    img: capSore,
    linkDemo: 'https://cap-store.netlify.app/',
    linkRepo: 'https://github.com/AndreyKorolevich/cap-store',
    topic: PORTFOLIO_TOPIC.FRONTEND,
  },
  {
    name: 'crypto currency',
    img: crypto,
    linkDemo: 'https://cryptgraph.netlify.app/',
    linkRepo: 'https://github.com/AndreyKorolevich/crypto',
    topic: PORTFOLIO_TOPIC.FRONTEND,
    comingSoon: false,
  },
]

describe('TabPanel Component', () => {
  test('renders without crashing', () => {
    render(<TabPanel projects={sampleProjects} />)
    const wrapperElement = screen.getByLabelText('tabpanel-wrapper')
    const tabs = screen.getAllByLabelText('project-tab')
    const demoButton = screen.queryAllByRole('button', { name: 'View Demo' })
    const repoButton = screen.queryAllByRole('button', { name: 'View Repo' })
    const comingSoonButton = screen.queryAllByRole('button', { name: 'Coming Soon' })

    expect(wrapperElement).toBeInTheDocument()
    expect(demoButton.length).toBe(sampleProjects.filter((s) => s.linkDemo).length)
    expect(repoButton.length).toBe(sampleProjects.filter((s) => s.linkRepo).length)
    expect(comingSoonButton.length).toBe(sampleProjects.filter((s) => s.comingSoon).length)
    expect(tabs.length).toBe(sampleProjects.length)
  })
})
