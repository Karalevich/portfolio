import { ICONS } from '../../../../constants/personalInfo'
import { Tooltip } from '../../../Custom/Tooltip'
import styles from './SocialMediaIcons.module.scss'
import { SocialMedialIconsComponent } from './types'

const SocialMediaIcons: SocialMedialIconsComponent = () => {
  const icn = []
  for (const [key, value] of Object.entries(ICONS)) {
    const [icon, link] = value
    const mediaIcon = (
      <Tooltip title={key} placement='top' key={key} arrow>
        <a href={link as string} target='_blank' className={styles.link} aria-label={key}>
          <div className={styles.iconWrapper}>{icon}</div>
        </a>
      </Tooltip>
    )
    icn.push(mediaIcon)
  }
  return (
    <main className={styles.socialMedia} aria-label={'social-media'}>
      {icn}
    </main>
  )
}

export default SocialMediaIcons
