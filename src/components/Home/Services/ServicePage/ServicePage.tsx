import React, { useRef } from 'react'
import styles from './ServicePage.module.scss'
import { CustomSeparatorComponent, ServicePageComponent } from './types'
import Recommendations from '../../Recommendations/Recommendations'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { SERVICE_PAGES } from '../../../../constants/personalInfo'
import { Breadcrumbs, Button, useMediaQuery } from '@mui/material'
import classnames from 'classnames'
import MovingIcon from '@mui/icons-material/Moving'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'


export const ServicePage: ServicePageComponent = () => {
  const { servicePage } = useParams()
  const navigate = useNavigate()
  const ref = useRef<HTMLHeadingElement | null>(null)
  const { serviceTitle, examples } = SERVICE_PAGES[servicePage as string]
  const [firstWord, secondWord] = serviceTitle.split(' ')
  const isTabletOrDesktop = useMediaQuery('(min-width:768px)')

  const handleRedirect = () => {
    navigate('/contact')
  }

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
      {text.map((t, index) => <p key={index}
                                 className={classnames(styles.text, { [styles.mainIdea]: !image && index === 0 })}>{t}</p>)}
    </article>
  ))

  return (
    <section className={styles.servicePage}>
      <header className={styles.header}>
        <h2 className={styles.serviceTitle}>{serviceTitle}</h2>
        <CustomSeparator currentService={servicePage as string}/>
        <div className={styles.previewImg}>
          <h1 className={styles.stack} ref={ref}>
            {isTabletOrDesktop && <>
              <span className={styles.first}>{firstWord} </span>
              <span className={styles.second}>{secondWord}</span>
            </>}
            <Button className={styles.order} size={'small'} variant="contained" onClick={handleRedirect}
                    endIcon={<ArrowForwardIcon className={styles.arrow}/>}>Order now</Button>
          </h1>
        </div>
      </header>
      <main className={styles.main}>
        <h3 className={styles.projectsTitle}>
          As a Software Engineer I have worked with a wide range of different projects
          and technologies, here you can get acquainted with some of them.
        </h3>
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