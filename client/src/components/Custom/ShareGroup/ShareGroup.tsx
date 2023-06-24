import React from 'react'
import styles from './ShareGroup.module.scss'
import { ShareGroupComponent } from './types'
import { SHARE } from '../../../constants/personalInfo'
import { Tooltip } from '../Tooltip'

export const ShareGroup: ShareGroupComponent = ({ id }) => {
  const icn = []
  const link = `https://akaralevich.netlify.app/blog/post/${id}`
  for (const [key, value] of Object.entries(SHARE)) {
    const [Icon, Button] = value

    const mediaIcon = (
      <Tooltip title={key} placement='top' key={key} arrow>
        <li className={styles.iconWrapper}>
          <Button url={link}>
            <Icon size={'2rem'} round={true} children={undefined} url={''} />
          </Button>
        </li>
      </Tooltip>
    )
    icn.push(mediaIcon)
  }
  return <ul className={styles.shareList}>{icn}</ul>
}

export default ShareGroup
