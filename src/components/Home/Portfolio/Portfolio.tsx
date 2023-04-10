import React, { useState } from 'react'
import styles from './Portfolio.module.scss'
import { PortfolioComponent, TabPanelComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { Tab, Tabs } from '@mui/material'
import { PORTFOLIO } from 'src/constants/personalInfo'


export const Portfolio: PortfolioComponent = () => {
  const [tabIndex, setTab] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <section className={styles.portfolio}>
      <SectionHeader title={'Portfolio'} introduction={`Web technologies are my job and hobby to which I devote all my 
       time and passion. You can look at my pet projects below.`}/>
      <Tabs value={tabIndex} onChange={handleChange} className={styles.tabs} sx={{
        '.MuiTab-root': {
          width: `${Math.ceil(100 / PORTFOLIO.length)}%`,
          overflow: 'inherit',
          color: '#2B2B2B',
          transition: 'color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          marginBottom: '15px',
        },
        '.Mui-selected': {
          color: '#ffb400',
        },
        '.MuiTabs-indicator': {
          borderRadius: '3px',
          height: '3px',
        },
      }}>
        {PORTFOLIO.map(p => (
          <Tab key={p.tab} label={p.tab} disableRipple/>
        ))}
      </Tabs>
       {PORTFOLIO.map((p, index) => (
          <TabPanel projects={p.projects} activeTab={tabIndex} index={index} key={p.tab}/>
        ))}
    </section>
  )
}

export default Portfolio

const TabPanel: TabPanelComponent = ({ projects, activeTab, index, ...other }) => {
  const projectList = projects.map(project => (<li key={project.name} className={styles.project}>
    {project.name}
  </li>))
  return (
    <div
      className={styles.tabPanel}
      role="tabpanel"
      hidden={activeTab !== index}
      {...other}
    >
      {activeTab === index && (
        <ul className={styles.projectList}>
          {projectList}
        </ul>
      )}
    </div>
  )
}