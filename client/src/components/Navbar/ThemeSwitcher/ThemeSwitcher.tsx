import React from 'react'
import styles from './ThemeSwitcher.module.scss'
import { ThemeSwitcherComponent } from './types'
import { SwitchThemeIcon } from '../../Custom/Icons'
import classname from 'classnames'

export const ThemeSwitcher: ThemeSwitcherComponent = ({ handleSwitchTheme, isLightTheme }) => {
  const switchTheme = () => {
    handleSwitchTheme()
  }

  return (
    <div className={styles.wrapper}>
      <input type='checkbox' className={styles.checkbox} onClick={switchTheme} />
      <SwitchThemeIcon
        aria-label='switch-theme-icon'
        className={classname(styles.switcher, {
          [styles.light]: isLightTheme,
          [styles.dark]: !isLightTheme,
        })}
      />
    </div>
  )
}

export default ThemeSwitcher
