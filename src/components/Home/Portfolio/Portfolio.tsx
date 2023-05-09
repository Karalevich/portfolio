import React, { useState } from 'react'
import styles from './Portfolio.module.scss'
import { PortfolioComponent, TabPanelComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { Button, Card, Tab, Tabs } from '@mui/material'
import MovingIcon from '@mui/icons-material/Moving'
import { PORTFOLIO } from 'src/constants/personalInfo'
import { PORTFOLIO_TOPIC } from '../../../constants/types'


export const Portfolio: PortfolioComponent = () => {
  const [tabIndex, setTab] = useState(PORTFOLIO_TOPIC.ALL)

  const handleChange = (event: React.SyntheticEvent, newValue: PORTFOLIO_TOPIC) => {
    setTab(newValue)
  }

  const activeProjects = PORTFOLIO.projects.filter(project => project.topic === tabIndex || tabIndex === PORTFOLIO_TOPIC.ALL)

  return (
    <section className={styles.portfolio}>
      <SectionHeader
        title={'Portfolio'}
        introduction={`Web technologies are not only my job but also hobby to which I devote all my 
       time and passion. You can look at my pet projects below.`}
      />
      <Tabs
        variant='scrollable'
        scrollButtons={false}
        value={tabIndex}
        onChange={handleChange}
        className={styles.tabs}
        sx={{
          minHeight: 0,
          marginBottom: '2rem',
          '.MuiTab-root': {
            width: `auto`,
            overflow: 'inherit',
            color: 'var(--main-text)',
            fontWeight: 400,
            transition: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            marginBottom: '5px',
            minHeight: '0',
            minWidth: '0',
            padding: '0',
            marginLeft: 'auto',
            marginRight: 'auto',
          },
          '.Mui-selected': {
            color: 'var(--main-text) !important',
            fontWeight: 600,
          },
          '.MuiTabs-indicator': {
            borderRadius: '3px',
            height: '2px',
          },
        }}
      >
        {PORTFOLIO.tabs.map((tab) => (
          <Tab key={tab} label={tab} value={tab} disableRipple/>
        ))}
      </Tabs>
      <TabPanel projects={activeProjects}/>
    </section>
  )
}

export default Portfolio

const TabPanel: TabPanelComponent = ({ projects, ...other }) => {
  const projectList = projects.map(({ linkDemo, linkRepo, img }, index) => (
    <li key={index} className={styles.project}>
      <Card
        className={styles.card}
        elevation={0}
      >
        <div className={styles.imageWrapper}>
          <img className={styles.previewImg} src={img} alt={'project image'}/>
          <div className={styles.redirect}>
            <div className={styles.buttonGroup}>
              {linkDemo && <a className={styles.linkDemo} href={linkDemo} target='_blank'>
                <Button className={styles.website} variant='outlined' endIcon={<MovingIcon/>}>
                  Vie Demo
                </Button>
              </a>}
              <a className={styles.linkRepo} href={linkRepo} target='_blank'>
                <Button className={styles.website} variant='outlined' endIcon={<MovingIcon/>}>
                  Vie Repo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Card>
    </li>
  ))

  return (
    <div className={styles.tabPanel} role='tabpanel'  {...other}>
      <ul className={styles.projectList}>{projectList}</ul>
    </div>
  )
}