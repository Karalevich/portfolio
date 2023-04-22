import React, { useState } from 'react'
import styles from './ServicePage.module.scss'
import { ServicePageComponent } from './types'
import Recommendations from '../../Recommendations/Recommendations'
import { useParams, useNavigate } from 'react-router-dom'
import { SERVICE_PAGES } from '../../../../constants/personalInfo'


export const ServicePage: ServicePageComponent = () => {
  const { servicePage } = useParams()
  const navigate = useNavigate()

  const { serviceTitle, image, projectsTitle, firstArticle, secondArticle, thirdArticle } = SERVICE_PAGES[servicePage as string]
  return (
    <section className={styles.servicePage}>
      <header className={styles.header}>
        <h2 className={styles.serviceTitle}>{serviceTitle}</h2>
        <img className={styles.previewImg} src={image} alt={serviceTitle}/>
      </header>
      <main className={styles.main}>
        <h3 className={styles.projectsTitle}>{projectsTitle}</h3>
        <article className={styles.firstArticle}>
           <img className={styles.firstArticleImage} src={firstArticle.image} alt={'project image'}/>
          <p className={styles.text}>{firstArticle.text}</p>
        </article>
        <article className={styles.secondArticle}>
          <img className={styles.secondArticleImage} src={secondArticle.image} alt={'project image'}/>
          <p >{secondArticle.text}</p>

        </article>
        <article className={styles.thirdArticle}>
          {thirdArticle}
        </article>
      </main>
      <footer>
        <Recommendations/>
      </footer>
    </section>
  )
}

export default ServicePage