import React from 'react'
import styles from './Info.module.scss'
import { InfoComponent } from './types'
import Avatar from './Avatar/Avatar'


export const Info: InfoComponent = () => {
  return (
    <aside className={styles.info}>
      <Avatar/>
    </aside>
  )
}

export default Info