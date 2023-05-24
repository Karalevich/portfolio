import React, { useState } from 'react'
import styles from './Comment.module.scss'
import { CommentComponent } from './types'
import ReplyIcon from '@mui/icons-material/Reply'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { SpeedDial, SpeedDialAction, SpeedDialIcon, styled } from '@mui/material'

const actions = [
  { icon: <ShareIcon fontSize={'small'} />, name: 'Share' },
  { icon: <EditIcon fontSize={'small'} />, name: 'Edit' },
  { icon: <ReplyIcon fontSize={'small'} />, name: 'Reply' },
  { icon: <DeleteForeverIcon fontSize={'small'} />, name: 'Delete' },
]

export const Comment: CommentComponent = ({ author, message, id, date }) => {
  const [openReactions, setOpenReactions] = useState(false)
  const handleOpenSpeedDial = () => setOpenReactions(true)
  const handleCloseSpeedDial = () => setOpenReactions(false)
  return (
    <li className={styles.comment}>
      <div>
        <img className={styles.userImage} src={author.img as string} alt={author.name} />
      </div>
      <article>
        <header className={styles.owner}>
          <h3 className={styles.ownerName}>{author.name}</h3>
          <h4 className={styles.commentDate}>
            <p>{date}</p>
          </h4>
        </header>
        <main className={styles.commentMessage}>
          <p>{message}</p>
          <div className={styles.likes}>
            <FavoriteIcon className={styles.favoriteIcon} fontSize={'small'} />
            <span>2</span>
            <StyledSpeedDial
              ariaLabel='SpeedDial controlled open example'
              icon={<SpeedDialIcon />}
              onClose={handleCloseSpeedDial}
              onOpen={handleOpenSpeedDial}
              open={openReactions}
              direction={'right'}
            >
              {actions.map((action) => (
                <StyledSpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={handleCloseSpeedDial}
                />
              ))}
            </StyledSpeedDial>
          </div>
        </main>
      </article>
    </li>
  )
}

export default Comment

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  marginLeft: '2rem',
  '& .MuiSpeedDial-fab': {
    height: '1.4rem',
    minHeight: '1.4rem',
    width: '1.4rem',
    borderRadius: '50% !important',
    boxShadow: 'none',

    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem',
    },
  },
  '& .MuiSpeedDialIcon-root': {
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiSpeedDial-fab': {
      height: '1.95rem',
      minHeight: '1.95rem',
      width: '1.95rem',

      '& .MuiSvgIcon-root': {
        fontSize: '1.6rem',
      },
    },
  },
}))

const StyledSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
  height: '1.6rem',
  minHeight: '1.6rem',
  width: '1.6rem',
  borderRadius: '50% !important',
  margin: '0 0.5rem',
  boxShadow: `0px 6px 10px -4px ${theme.palette.grey[400]}`,

  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
  },

  [theme.breakpoints.down('md')]: {
    height: '2rem',
    minHeight: '2rem',
    width: '2rem',

    '& .MuiSvgIcon-root': {
      fontSize: '1.4rem',
    },
  },
}))
