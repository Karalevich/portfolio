import { Button, Card } from '@mui/material'
import React from 'react'
import styles from './Contact.module.scss'
import { ContactCardComponent, ContactComponent } from './types'
import Input from 'src/components/Custom/Inputs/Input'
import { CONTACT_INFO } from 'src/constants/personalInfo'


export const Contact: ContactComponent = () => {
  const infoCards = CONTACT_INFO.map(info => <ContactCard {...info}/>)
  return (
    <section className={styles.contact}>
      <article className={styles.leaveInfo}>
        <header>
          <h2 className={styles.title}>Leave us your info</h2>
          <Card className={styles.info} elevation={0}>
            <Input className={styles.input} fullWidth label={'Your Full Name (Required)'} required id='name'/>
            <Input className={styles.input} fullWidth label={'Your Email (Required)'} required id='email'/>
            <Input className={styles.input} fullWidth label={'Subject'} id='subject'/>
            <Input className={styles.input} fullWidth label={'Yor Message'} multiline rows={8} id='textarea'/>
            <Button variant="contained">Send Message</Button>
          </Card>
        </header>
      </article>
      <article className={styles.contactInfo}>
        <header>
          <h2 className={styles.title}>Contact information</h2>
        </header>
        <main>
          {infoCards}
        </main>
      </article>
    </section>
  )
}

export default Contact

const ContactCard: ContactCardComponent = ({ info, icon }) => {
  const infoList = info.map(inf => (
    <li className={styles.item} key={inf.title}>
      <span>{inf.title}</span><span>{inf.value}</span>
    </li>
  ))
  return (
    <Card>
      <header className={styles.iconWrapper}>{icon({})}</header>
      <main>
        <ul className={styles.infoList}>
          {infoList}
        </ul>
      </main>
    </Card>
  )
}

