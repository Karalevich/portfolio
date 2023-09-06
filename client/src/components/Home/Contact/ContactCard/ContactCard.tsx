import styles from './ContactCard.module.scss'
import { Card } from '@mui/material'
import React from 'react'
import { ContactCardComponent } from './types'

const ContactCard: ContactCardComponent = ({ info, icon }) => {
  const infoList = info.map((inf) => (
    <li className={styles.item} key={inf.title}>
      <h4 className={styles.itemTitle}>{inf.title}:</h4>
      <span className={styles.value}>
        <a href={`${inf.href}`} target={'_blank'}>
          {inf.value}
        </a>
      </span>
    </li>
  ))
  return (
    <Card className={styles.card} elevation={0}>
      <header className={styles.header}>
        <span className={styles.iconWrapper}>{icon({ fontSize: 'small' })}</span>
      </header>
      <main className={styles.main}>
        <ul className={styles.infoList}>{infoList}</ul>
      </main>
    </Card>
  )
}

export default ContactCard