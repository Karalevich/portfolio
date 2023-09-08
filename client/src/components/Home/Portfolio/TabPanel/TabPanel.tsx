import styles from './TabPanel.module.scss'
import { Button, Card } from '@mui/material'
import MovingIcon from '@mui/icons-material/Moving'
import React from 'react'
import { TabPanelComponent } from './types'

const TabPanel: TabPanelComponent = ({ projects, ...other }) => {
  return (
    <div className={styles.tabPanel} aria-label='tabpanel-wrapper' {...other}>
      <ul className={styles.projectList}>
        {projects.map(({ linkDemo, linkRepo, comingSoon, img, name }, index) => (
          <li key={index} className={styles.project} aria-label='project-tab'>
            <Card className={styles.card} elevation={0}>
              <div className={styles.imageWrapper}>
                <img className={styles.previewImg} src={img} alt={name} loading={'lazy'} />
                <div className={styles.redirect}>
                  <div className={styles.buttonGroup}>
                    {linkDemo && (
                      <a className={styles.linkDemo} href={linkDemo} target='_blank'>
                        <Button className={styles.website} variant='outlined' endIcon={<MovingIcon />}>
                          View Demo
                        </Button>
                      </a>
                    )}
                    {linkRepo && (
                      <a className={styles.linkRepo} href={linkRepo} target='_blank'>
                        <Button className={styles.website} variant='outlined' endIcon={<MovingIcon />}>
                          View Repo
                        </Button>
                      </a>
                    )}
                    {comingSoon && (
                      <a className={styles.linkRepo} href={linkRepo} target='_blank'>
                        <Button className={styles.website} variant='outlined'>
                          Coming Soon
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TabPanel
