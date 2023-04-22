import { Button, Card } from '@mui/material'
import React from 'react'
import styles from './Contact.module.scss'
import { ContactCardComponent, ContactComponent } from './types'
import Input from 'src/components/Custom/Inputs/Input'
import { CONTACT_INFO } from 'src/constants/personalInfo'
import Map from '../Map/Map'


export const Contact: ContactComponent = () => {
  const infoCards = CONTACT_INFO.map(info => <ContactCard key={info.icon.toString()} {...info}/>)
  return (
    <>
      <section className={styles.contact}>
        <article className={styles.leaveInfo}>
          <header>
            <h2 className={styles.title}>Leave us your info</h2>
            <Card className={styles.info} elevation={0}>
              <Input className={styles.input} fullWidth label={'Your Full Name (Required)'} required id='name'/>
              <Input className={styles.input} fullWidth label={'Your Email (Required)'} required id='email'/>
              <Input className={styles.input} fullWidth label={'Subject'} id='subject'/>
              <Input className={styles.input} fullWidth label={'Yor Message'} multiline rows={8} id='textarea'/>
              <Button className={styles.send} variant="contained">Send Message</Button>
            </Card>
          </header>
        </article>
        <article className={styles.contactInfo}>
          <header>
            <h2 className={styles.title}>Contact information</h2>
          </header>
          <ul className={styles.cardList}>
            {infoCards}
          </ul>
        </article>
      </section>
      <Map/>
    </>
  )
}

export default Contact

const ContactCard: ContactCardComponent = ({ info, icon }) => {
  const infoList = info.map(inf => (
    <li className={styles.item} key={inf.title}>
      <h4 className={styles.itemTitle}>{inf.title}:</h4>
      <span className={styles.value}><a href={`${inf.href}`} target={'_blank'}>{inf.value}</a></span>
    </li>
  ))
  return (
    <Card className={styles.card} elevation={0}>
      <header className={styles.header}>
        <span className={styles.iconWrapper}>{icon({ fontSize: 'small' })}</span>
      </header>
      <main className={styles.main}>
        <ul className={styles.infoList}>
          {infoList}
        </ul>
      </main>
    </Card>
  )
}

