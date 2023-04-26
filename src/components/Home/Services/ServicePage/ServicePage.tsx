import React, { useRef } from 'react'
import styles from './ServicePage.module.scss'
import { CustomSeparatorComponent, ServicePageComponent } from './types'
import Recommendations from '../../Recommendations/Recommendations'
import { useParams, Link } from 'react-router-dom'
import { SERVICE_PAGES } from '../../../../constants/personalInfo'
import { Breadcrumbs, Button, useMediaQuery } from '@mui/material'
import classnames from 'classnames'
import MovingIcon from '@mui/icons-material/Moving'


export const ServicePage: ServicePageComponent = () => {
  const { servicePage } = useParams()
  const ref = useRef<HTMLHeadingElement | null>(null)
  const { serviceTitle, projectsTitle, examples } = SERVICE_PAGES[servicePage as string]
  const [firstWord, secondWord] = serviceTitle.split(' ')
  const isTabletOrDesktop = useMediaQuery('(min-width:768px)')

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
      {text.map((t, index) => <p key={index} className={classnames(styles.text, {[styles.mainIdea]: !image && index === 0})}>{t}</p>)}
    </article>
  ))

  return (
    <section className={styles.servicePage}>
      <header className={styles.header}>
        <h2 className={styles.serviceTitle}>{serviceTitle}</h2>
        <CustomSeparator currentService={servicePage as string}/>
        <div className={styles.previewImg}>
          {isTabletOrDesktop && <h1 className={styles.stack} ref={ref}>
            <span className={styles.first}>{firstWord} </span>
            <span className={styles.second}>{secondWord}</span>
          </h1>}
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