import { INFO } from '../../../../constants/personalInfo'
import styles from './PersonalInfo.module.scss'
import classnames from 'classnames'
import { PersonalInfoComponent } from './types'

const PersonalInfo: PersonalInfoComponent = () => {
  const infos = []
  for (const [key, value] of Object.entries(INFO)) {
    const info = (
      <div className={styles.info} key={key}>
        <span className={styles.property}>{key}:</span>
        <span className={classnames(styles.value, { [styles.available]: key === 'Status' })}>
          {value}
        </span>
      </div>
    )
    infos.push(info)
  }
  return <footer className={styles.footer}>{infos}</footer>
}

export default PersonalInfo
