import React from 'react'
import styles from './Services.module.scss'
import { ServicesComponent, ServiceComponent } from './types'
import { Button, Card } from '@mui/material'
import { SERVICES } from 'src/constants/personalInfo'
import { OrderIcon } from 'src/components/Custom/Icons'
import SectionHeader from '../SectionHeader/SectionHeader'
import { useNavigate } from 'react-router-dom'

export const Services: ServicesComponent = () => {
  const serviceList = []
  for (const [key, value] of Object.entries(SERVICES)) {
    serviceList.push(Service({ title: key, ...value }))
  }

  return (
    <section className={styles.services}>
      <SectionHeader
        title={'My Services'}
        introduction={
          'Based on commercial experience with a wide range of diverse projects and a constant desire to learn and\n' +
          '          master new technologies, I provide the following services'
        }
      />
      <main>
        <ul className={styles.list}>{serviceList}</ul>
      </main>
    </section>
  )
}

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

export default Services
