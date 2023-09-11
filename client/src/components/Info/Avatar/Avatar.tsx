import styles from './Avatar.module.scss'
import { AvatarComponent } from './types'
import { styled } from '@mui/material/styles'
import { Avatar as MUIAvatar, Badge } from '@mui/material'
import avatarImg from '../../../assets/img/Me.webp'
import PersonalInfo from './PersonalInfo/PersonalInfo'
import SocialMediaIcons from './SocialMediaicons/SocialMediaIcons'

const Avatar: AvatarComponent = () => {
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
      <SocialMediaIcons />
      <PersonalInfo />
    </section>
  )
}

const StyledBadge = styled(Badge)(() => ({
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
