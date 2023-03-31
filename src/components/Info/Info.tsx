import React from 'react'
import styles from './Info.module.scss'
import { InfoComponent } from './types'
import Avatar from './Avatar/Avatar'
import Skills from './Skills/Skills'
import { LANGUAGES, SKILLS } from '../../constants/personalInfo'


export const Info: InfoComponent = () => {
  return (
    <aside className={styles.info}>
      <Avatar/>
      <Skills title={'Languages'} skills={LANGUAGES}/>
      <Skills title={'Skills'} skills={SKILLS}/>
    </aside>
  )
}

export default Info