import styles from './ServicePage.module.scss'
import { ServicePageComponent } from './types'
import Recommendations from '../../Recommendations/Recommendations'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { SERVICE_PAGES } from '../../../../constants/personalInfo'
import { Button, useMediaQuery } from '@mui/material'
import classnames from 'classnames'
import MovingIcon from '@mui/icons-material/Moving'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Breadcrumbs from 'src/components/Custom/Breadcrumbs/Breadcrumbs'


export const ServicePage: ServicePageComponent = () => {
  const { servicePage } = useParams()
  const navigate = useNavigate()
  const isTabletOrDesktop = useMediaQuery('(min-width:768px)')

  if (servicePage && !(servicePage in SERVICE_PAGES)) {
    return <div> 404 NOT FOUND</div>
  }

  const { serviceTitle, examples } = SERVICE_PAGES[servicePage as string]
  const [firstWord, secondWord] = serviceTitle.split(' ')


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

  const links = [
    { name: 'Home', link: '/home' },
    { name: 'Services', link: '/services' },
    { name: `${servicePage as string}` },
  ]

  return (
    <section className={styles.servicePage}>
      <header className={styles.header}>
        <h2 className={styles.serviceTitle}>{serviceTitle}</h2>
        <Breadcrumbs links={links}/>
        <div className={styles.previewImg}>
          <h1 className={styles.stack}>
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