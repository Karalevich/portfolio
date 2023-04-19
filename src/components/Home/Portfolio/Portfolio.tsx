import React, { useState } from 'react'
import styles from './Portfolio.module.scss'
import { PortfolioComponent, TabPanelComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { Card, CardActionArea, Tab, Tabs } from '@mui/material'
import { PORTFOLIO } from 'src/constants/personalInfo'


export const Portfolio: PortfolioComponent = () => {
  const [tabIndex, setTab] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <section className={styles.portfolio}>
      <SectionHeader title={'Portfolio'} introduction={`Web technologies are not only my job but also hobby to which I devote all my 
       time and passion. You can look at my pet projects below.`}/>
      <Tabs value={tabIndex} onChange={handleChange} className={styles.tabs} sx={{
        minHeight: 0,
        marginBottom: '2rem',
        '.MuiTab-root': {
          width: `${Math.ceil(100 / PORTFOLIO.length)}%`,
          overflow: 'inherit',
          color: '#2B2B2B',
          transition: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          marginBottom: '5px',
        },
        '.Mui-selected': {
          color: 'black',
          fontWeight: 700
        },
        '.MuiTabs-indicator': {
          borderRadius: '3px',
          height: '2px',
        },
      }}>
        {PORTFOLIO.map(p => (
          <Tab key={p.tab} label={p.tab} disableRipple/>
        ))}
      </Tabs>
      {PORTFOLIO.map((p, index) => (
        <TabPanel projects={p.projects} activeTab={tabIndex} index={index}/>
      ))}
    </section>
  )
}

export default Portfolio

const TabPanel: TabPanelComponent = ({ projects, activeTab, index, ...other }) => {
  const projectList = projects.map(project => (
    <li key={project.name} className={styles.project}>
      <Card sx={{ width: '100%', height: '100%', borderRadius: '2px' }} elevation={0}>
        <CardActionArea sx={{
          height: '100%',
          '.MuiCardActionArea-focusHighlight': {
            background: '#ffffff',
          },

          '&:hover': {
            '.MuiCardActionArea-focusHighlight': {
              background: 'rgba(255, 180, 0, 0.8)',
              opacity: 1,
              transitionProperty: 'opacity, background',
            },
          },
        }}>
          {project.name}
        </CardActionArea>
      </Card>
    </li>),
  )

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