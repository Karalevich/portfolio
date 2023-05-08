import { Button } from '@mui/material'
import React from 'react'
import { BannerComponent } from './types'
import styles from './Banner.module.scss'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import Canvas from '../../Canvas/Canvas'

export const Banner: BannerComponent = () => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/contact')
  }
  return (
    <article className={styles.banner}>
      <Canvas />
      <h1 className={styles.name}>
        <span className={styles.pronoun}>I`m</span> Andrei Karalevich
      </h1>
      <h1 className={styles.occupation}>
        <strong className={styles.strong}>Front-End</strong> Engineer
      </h1>
      <main className={styles.message}>
        I have 3 years of experience in Software engineering and creating distinctive user interfaces for
        advanced digital companies.
      </main>
      <Button
        className={styles.button}
        variant='contained'
        onClick={handleRedirect}
        endIcon={<ArrowForwardIcon className={styles.arrow} />}
      >
        Hire me
      </Button>
    </article>
  )
}

export default Banner
