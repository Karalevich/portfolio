import Card from '@mui/material/Card/Card'
import React, { useState } from 'react'
import styles from './ServicesPreview.module.scss'
import { ServicesPreviewComponent, ServicePreviewComponent } from './types'
import { Button } from '@mui/material'
import { SERVICES } from 'src/constants/personalInfo'
import { OrderIcon } from 'src/components/Custom/Icons'
import classnames from 'classnames'
import ServiceHeader from '../ServiceHeader/ServiceHeader'


export const ServicesPreview: ServicesPreviewComponent = () => {
  const serviceList = []
  for (const [key, value] of Object.entries(SERVICES)) {
    serviceList.push(Service({ title: key, ...value }))
  }

  return (
    <section className={styles.services}>
      <ServiceHeader title={'My Services'}
                     introduction={'Based on commercial experience with a wide range of diverse projects and a constant desire to learn and\n' +
                     '          master new technologies, I provide the following services'}/>
      <main>
        <ul className={styles.list}>
          {serviceList}
        </ul>
      </main>
    </section>
  )
}


const Service: ServicePreviewComponent = ({ title, preview, description, icon }) => {
  const [isShowActions, setIsShowActions] = useState(false)

  const toggleIsShowActions = (value: boolean) => () => {
    setIsShowActions(value)
  }
  return (
    <li className={styles.item} key={title}>
      <Card className={styles.card} elevation={0} onMouseEnter={toggleIsShowActions(true)}
            onMouseLeave={toggleIsShowActions(false)}>
        <header className={styles.cardHeader}>
          {icon({ fontSize: 'large', className: `${styles.icon}` })}
        </header>
        <main className={classnames(styles.main, { [styles.fullMain]: isShowActions })}>
          <h4 className={styles.name}>{title}</h4>
          <p className={styles.preview}>{preview}</p>
          <p className={classnames(styles.description, { [styles.fullDescription]: isShowActions })}>{description}</p>
          <Button className={styles.order} size="small" endIcon={<OrderIcon className={styles.arrow}/>}>
            Order now
          </Button>
        </main>
      </Card>
    </li>
  )
}

export default ServicesPreview