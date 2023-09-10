import { useNavigate } from 'react-router-dom'
import styles from './Service.module.scss'
import { Button, Card } from '@mui/material'
import { OrderIcon } from '../../../Custom/Icons'
import React from 'react'
import { ServiceComponent } from './types'

const Service: ServiceComponent = ({ title, preview, description, icon, navigatePath }) => {
  const redirect = useNavigate()
  const handleRedirect = () => {
    redirect(`/services/${navigatePath}`)
  }
  return (
    <li className={styles.item} key={title}>
      <Card className={styles.card} elevation={0}>
        <header className={styles.cardHeader}>
          {icon({ fontSize: 'large', className: `${styles.icon}` })}
        </header>
        <main className={styles.main}>
          <h4 className={styles.name}>{title}</h4>
          <p className={styles.preview}>{preview}</p>
          <p className={styles.description}>{description}</p>
          <Button
            onClick={handleRedirect}
            className={styles.order}
            size='small'
            endIcon={<OrderIcon className={styles.arrow} />}
          >
            Explore
          </Button>
        </main>
      </Card>
    </li>
  )
}

export default Service
