import { Card } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import React from 'react'
import styles from './Contact.module.scss'
import * as yup from 'yup'
import { ContactCardComponent, ContactComponent, ContactValuesT } from './types'
import Input from 'src/components/Custom/Input/Input'
import { CONTACT_INFO } from 'src/constants/personalInfo'
import Map from '../Map/Map'
import { FormikHelpers, useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { sendMessageFromContactFormThunk } from '../../../actions/serviceAction'
import { getIsLoadingContactFormS } from '../../../selectors/serviceSelector'

const validationContactSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Name should be of minimum 3 characters length')
    .required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  subject: yup.string().max(24, 'Subject should be of maximum 32 characters length'),
  message: yup
    .string()
    .required('Message is required')
    .test('word-count', 'Message should have at least 5 words', (value) => {
      const wordCount = value.trim().split(/\s+/).length
      return wordCount >= 5
    }),
})

export const Contact: ContactComponent = () => {
  const dispatch = useAppDispatch()
  const isLoadingContactFrom = useAppSelector(getIsLoadingContactFormS)
  const formikContact = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: validationContactSchema,
    onSubmit: (values: ContactValuesT, {}: FormikHelpers<ContactValuesT>) => {
      dispatch(sendMessageFromContactFormThunk(values))
    },
  })
  const infoCards = CONTACT_INFO.map((info) => <ContactCard key={info.icon.toString()} {...info} />)
  return (
    <>
      <section className={styles.contact}>
        <article className={styles.leaveInfo}>
          <form onSubmit={formikContact.handleSubmit}>
            <h2 className={styles.title}>Leave me your info</h2>
            <Card className={styles.info} elevation={0}>
              <Input
                className={styles.input}
                fullWidth
                label={'Your Full Name (Required)'}
                id='name'
                name='name'
                onChange={formikContact.handleChange}
                value={formikContact.values.name}
                error={formikContact.touched.name && Boolean(formikContact.errors.name)}
                helperText={formikContact.touched.name && formikContact.errors.name}
                disabled={isLoadingContactFrom}
              />
              <Input
                className={styles.input}
                fullWidth
                label={'Your Email (Required)'}
                id='email'
                name='email'
                onChange={formikContact.handleChange}
                value={formikContact.values.email}
                error={formikContact.touched.email && Boolean(formikContact.errors.email)}
                helperText={formikContact.touched.email && formikContact.errors.email}
                disabled={isLoadingContactFrom}
              />
              <Input
                className={styles.input}
                fullWidth
                label={'Subject'}
                id='subject'
                name='subject'
                onChange={formikContact.handleChange}
                value={formikContact.values.subject}
                error={formikContact.touched.subject && Boolean(formikContact.errors.subject)}
                helperText={formikContact.touched.subject && formikContact.errors.subject}
                disabled={isLoadingContactFrom}
              />
              <Input
                className={styles.input}
                fullWidth
                label={'Yor Message (Required)'}
                placeholder={'Message should have at least 5 words'}
                multiline
                rows={8}
                id='message'
                name='message'
                onChange={formikContact.handleChange}
                value={formikContact.values.message}
                error={formikContact.touched.message && Boolean(formikContact.errors.message)}
                helperText={formikContact.touched.message && formikContact.errors.message}
                disabled={isLoadingContactFrom}
              />
              <LoadingButton
                className={styles.send}
                variant='contained'
                type={'submit'}
                loading={isLoadingContactFrom}
                loadingPosition='center'
                disableElevation
              >
                Send Message
              </LoadingButton>
            </Card>
          </form>
        </article>
        <article className={styles.contactInfo}>
          <header>
            <h2 className={styles.title}>Contact information</h2>
          </header>
          <ul className={styles.cardList}>{infoCards}</ul>
        </article>
      </section>
      <Map />
    </>
  )
}

export default Contact

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
