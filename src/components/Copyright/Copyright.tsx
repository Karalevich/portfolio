import React from 'react'
import styles from './Copyright.module.scss'
import { CopyrightComponent } from './types'



export const Copyright: CopyrightComponent = () => {
  return (
    <footer>
         <cite className={styles.copyright}>
          <p className={styles.copyrightText}>Copyright © 2023 Portfolio Andrei Karalevich</p>
        </cite>
    </footer>
  )
}

export default Copyright