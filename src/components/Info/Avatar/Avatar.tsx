import React from 'react'
import styles from './Avatar.module.scss'
import { AvatarComponent } from './types'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import { Avatar as MUIAvatar, SvgIconProps } from '@mui/material'
import avatarImg from '../../../img/AK-removebg.webp'
import { Tooltip } from '../../Custom/Tooltip'
import { FacebookIcon, LeetcodeIcon, LinkedinIcon, TwitterIcon, VkIcon, GitHubIcon } from '../../Custom/Icons'


export const Avatar: AvatarComponent = () => {
  return (
    <section className={styles.avatar}>
      <header className={styles.header}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <MUIAvatar alt="Andrei Karalevich" src={avatarImg}/>
        </StyledBadge>
        <h4 className={styles.name}>Andrei Karalevich</h4>
        <p className={styles.occupation}>Front-End Engineer</p>
        {socialMediaIcons()}
      </header>
      <main className={styles.socialMedia}>

      </main>
    </section>
  )
}

const socialMediaIcons = () => {
  const icons = [[<VkIcon/>, 'VKontakte'], [<FacebookIcon/>, 'Facebook'], [<TwitterIcon/>, 'Twitter'], [
    <LinkedinIcon/>, 'Linkedin'], [<LeetcodeIcon/>, 'Leetcode'], [<GitHubIcon/>, 'Github']]
  return icons.map(icon => (
    <Tooltip title={icon[1]} placement='top' arrow>
      <div className={styles.iconWrapper}>
        {icon[0]}
      </div>
    </Tooltip>
  ))


}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
    minWidth: '15px',
    height: '14px',
    borderRadius: '12px',
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
      // transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

export default Avatar