import { Button } from '@mui/material'
import styles from './NotFound.module.scss'
import { NotFoundComponent } from './types'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'


export const NotFound: NotFoundComponent = () => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/home')
  }

  return (
    <section className={styles.notFound}>
      <main className={styles.main}/>
      <footer className={styles.footer}>
        <h1 className={styles.title}>Sorry, page not found!</h1>
        <h4 className={styles.message}>Do not worry, just click the big button "Go Back Home"</h4>
        <Button className={styles.redirect} variant="contained" onClick={handleRedirect}
                startIcon={<ArrowBackIcon className={styles.arrow}/>}>
          Go Back Home
        </Button>
      </footer>

    </section>
  )
}

export default NotFound