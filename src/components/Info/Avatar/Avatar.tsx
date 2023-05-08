import styles from './Avatar.module.scss'
import { AvatarComponent } from './types'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import { Avatar as MUIAvatar } from '@mui/material'
import avatarImg from '../../../assets/img/Me.webp'
import { Tooltip } from '../../Custom/Tooltip'
import { ICONS, INFO } from '../../../constants/personalInfo'
import classnames from 'classnames'

export const Avatar: AvatarComponent = () => {
  return (
    <section className={styles.avatar}>
      <header className={styles.header}>
        <StyledBadge
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='dot'
        >
          <MUIAvatar alt='Andrei Karalevich' src={avatarImg} />
        </StyledBadge>
        <h4 className={styles.name}>Andrei Karalevich</h4>
        <p className={styles.occupation}>Front-End Engineer</p>
      </header>
      <main className={styles.socialMedia}>{socialMediaIcons()}</main>
      <footer className={styles.footer}>{personalInfo()}</footer>
    </section>
  )
}

const personalInfo = () => {
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
  return infos
}

const socialMediaIcons = () => {
  const icn = []
  for (const [key, value] of Object.entries(ICONS)) {
    const [icon, link] = value
    const mediaIcon = (
      <Tooltip title={key} placement='top' key={key} arrow>
        <a href={link as string} target='_blank' className={styles.link}>
          <div className={styles.iconWrapper}>{icon}</div>
        </a>
      </Tooltip>
    )
    icn.push(mediaIcon)
  }
  return icn
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 3px var(--background)`,
    minWidth: '14px',
    height: '14px',
    borderRadius: '50%',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 4s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '20%, 100%': {
      opacity: '0',
      transform: 'scale(2.4)',
    },
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
}))

export default Avatar
