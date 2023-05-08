import React from 'react'
import styles from './Breadcrumbs.module.scss'
import { BreadcrumbsComponent } from './types'
import { Link } from 'react-router-dom'
import { Breadcrumbs as MUIBreadcrumbs } from '@mui/material'

const Breadcrumbs: BreadcrumbsComponent = ({ links }) => {
  const breadcrumbs = links.map(({ name, link }, index) => {
    if (link) {
      return (
        <Link to={link} key={index}>
          <p className={styles.link}>{name}</p>
        </Link>
      )
    } else {
      return (
        <p className={styles.currentService} key={index}>
          {name}
        </p>
      )
    }
  })

  return (
    <MUIBreadcrumbs
      separator='›'
      className={styles.breadcrumbs}
      sx={{
        '.MuiBreadcrumbs-separator': {
          color: '#767676',
        },
      }}
    >
      {breadcrumbs}
    </MUIBreadcrumbs>
  )
}

export default Breadcrumbs
