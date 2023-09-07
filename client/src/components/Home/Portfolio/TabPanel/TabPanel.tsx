import styles from './TabPanel.module.scss'
import { Button, Card } from '@mui/material'
import MovingIcon from '@mui/icons-material/Moving'
import React from 'react'
import { TabPanelComponent } from './types'

export const TabPanel: TabPanelComponent = ({ projects, ...other }) => {
  return (
    <div className={styles.tabPanel} role='tabpanel' {...other}>
      <ul className={styles.projectList}>
        {projects.map(({ linkDemo, linkRepo, comingSoon, img }, index) => (
          <li key={index} className={styles.project}>
            <Card className={styles.card} elevation={0}>
              <div className={styles.imageWrapper}>
                <img className={styles.previewImg} src={img} alt={'project image'} loading={'lazy'} />
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
