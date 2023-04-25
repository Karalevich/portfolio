import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './ServicePage.module.scss'
import { CustomSeparatorComponent, ServicePageComponent } from './types'
import Recommendations from '../../Recommendations/Recommendations'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { linkedInRecommendations, SERVICE_PAGES } from '../../../../constants/personalInfo'
import { Breadcrumbs, Button, Link as MUILink } from '@mui/material'
import classnames from 'classnames'
import MovingIcon from '@mui/icons-material/Moving'
import Card from '@mui/material/Card/Card'

export const ServicePage: ServicePageComponent = () => {
  const { servicePage } = useParams()
  const ref = useRef<HTMLHeadingElement | null>(null)
  const { serviceTitle, projectsTitle, examples } = SERVICE_PAGES[servicePage as string]
  const [firstWord, secondWord] = serviceTitle.split(' ')

  const articles = examples.map(({ image, link, text }, index) => (
    <article className={styles.article} key={index}>
      {image && <div className={classnames(styles.imageWrapper, { [styles.leftImage]: index % 2 !== 0 })}>
        <img className={styles.image} src={image}
             alt={'project image'}/>
        <div className={styles.redirect}>
          <a href={link} target="_blank">
            <Button className={styles.website} variant="outlined" endIcon={<MovingIcon/>}>
              Go to Website
            </Button>
          </a>
        </div>
      </div>
      }
      {text.map((t, index) => <p className={styles.text}>{t}</p>)}
    </article>
  ))

  return (
    <section className={styles.servicePage}>
      <header className={styles.header}>
        <h2 className={styles.serviceTitle}>{serviceTitle}</h2>
        <CustomSeparator currentService={servicePage as string}/>
        <div className={styles.previewImg}>
          <h1 className={styles.stack} ref={ref}>
            <span className={styles.first}>{firstWord} </span>
            <span className={styles.second}>{secondWord}</span>
          </h1>
        </div>
      </header>
      <main className={styles.main}>
        <h3 className={styles.projectsTitle}>{projectsTitle}</h3>
        {articles}
      </main>
      <footer>
        <Recommendations/>
      </footer>
    </section>
  )
}

export default ServicePage

const CustomSeparator: CustomSeparatorComponent = ({ currentService }) => {
  const breadcrumbs = [
    <Link to={'/home'} key="1">
      <p className={styles.link}>Home</p>
    </Link>,
    <Link to={'/services'} key="2">
      <p className={styles.link}>Services</p>
    </Link>,
    <p className={styles.currentService} key="3">
      {currentService}
    </p>,
  ]

  return (
    <Breadcrumbs separator="›" className={styles.breadcrumbs} sx={{
      '.MuiBreadcrumbs-separator': {
        color: '#767676',
      },
    }}>
      {breadcrumbs}
    </Breadcrumbs>

  )
}