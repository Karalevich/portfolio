import React, { useState } from 'react'
import styles from './ThemeSwitcher.module.scss'
import { ThemeSwitcherComponent } from './types'
import { SwitchThemeIcon } from '../../Custom/Icons'
import classname from 'classnames'


export const ThemeSwitcher: ThemeSwitcherComponent = () => {
  const [isLightTheme, setIsLightTheme] = useState(true)
  return (
    <div className={styles.wrapper}>
      <SwitchThemeIcon onClick={() => setIsLightTheme(!isLightTheme)} className={classname(styles.switcher, {
        [styles.light]: isLightTheme,
        [styles.dark]: !isLightTheme,
      })}/>
    </div>
  )
}

export default ThemeSwitcher