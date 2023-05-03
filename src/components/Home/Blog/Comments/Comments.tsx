import React, { useState } from 'react'
import styles from './Comments.module.scss'
import { CommentsComponent } from './types'
import Input from '../../../Custom/Inputs/Input'
import me from '../../../../assets/img/Me.webp'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ReplyIcon from '@mui/icons-material/Reply'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import { SpeedDial, SpeedDialAction, SpeedDialIcon, styled } from '@mui/material'
import Dropdown from '../../../Custom/Dropdown/Dropdown'

const actions = [
  { icon: <ShareIcon fontSize={'small'}/>, name: 'Share' },
  { icon: <EditIcon fontSize={'small'}/>, name: 'Edit' },
  { icon: <ReplyIcon fontSize={'small'}/>, name: 'Reply' },
  { icon: <DeleteForeverIcon fontSize={'small'}/>, name: 'Delete' },
]

const SELECT = [
  'By default', 'By date', 'By best',
]

export const Comments: CommentsComponent = () => {
  const [openReactions, setOpenReactions] = useState(false)
  const handleOpenSpeedDial = () => setOpenReactions(true)
  const handleCloseSpeedDial = () => setOpenReactions(false)

  const comments = {
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
  }
  return (
    <section className={styles.commentSection}>
      <header className={styles.header}>
        <div className={styles.line}>
          <h3 className={styles.count}>
            3 Comments
          </h3>
        </div>
        <div className={styles.actions}>
          <div className={styles.review}>
            <span className={styles.likes}>
              <FavoriteIcon className={styles.favoriteIcon} fontSize={'small'}/>
              2
            </span>
            <p className={styles.share}>
              <ShareIcon className={styles.shareIcon} fontSize={'small'}/>
              Share
            </p>
          </div>
          <div className={styles.filter}>
            <Dropdown selects={SELECT}/>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <article className={styles.leaveComment}>
          <div className={styles.commentArea}>
            <img className={styles.userImage} src={comments.author.img} alt={comments.author.name}/>
            <Input className={styles.textarea} fullWidth multiline rows={3} sx={{
              '.MuiInputBase-inputMultiline': {
                borderRadius: '0.625rem',
                boxShadow: `#767676 0 0 0 0.1rem`,
              },
            }}/>
          </div>
          <ul className={styles.comments}>
            <li className={styles.comment}>
              <div>
                <img className={styles.userImage} src={comments.author.img} alt={comments.author.name}/>
              </div>
              <article>
                <header className={styles.owner}>
                  <h3 className={styles.ownerName}>Andrei Karalevich</h3>
                  <h4 className={styles.commentDate}><p>6 Hours Ago</p></h4>
                </header>
                <main className={styles.commentMessage}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper accumsan malesuada sed
                    feugiat. Rhoncus vel ultrices metus ut sed. Sit nunc, in nibh nisi, viverra quis sociis
                    malesuada.
                    Id lacus integer eget quisque senectus. Egestas consectetur vivamus aliquet platea aliquam
                    luctus
                    tristique sem congue.
                  </p>
                  <div className={styles.likes}>
                    <FavoriteIcon className={styles.favoriteIcon} fontSize={'small'}/>
                    <span>2</span>
                    <StyledSpeedDial
                      ariaLabel="SpeedDial controlled open example"
                      icon={<SpeedDialIcon/>}
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
            <li className={styles.comment}>
              <div>
                <img className={styles.userImage} src={comments.author.img} alt={comments.author.name}/>
              </div>
              <article>
                <header className={styles.owner}>
                  <h3 className={styles.ownerName}>Andrei Karalevich</h3>
                  <h4 className={styles.commentDate}><p>6 Hours Ago</p></h4>
                </header>
                <main className={styles.commentMessage}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper accumsan malesuada sed
                    feugiat. Rhoncus vel ultrices metus ut sed. Sit nunc, in nibh nisi, viverra quis sociis
                    malesuada.
                    Id lacus integer eget quisque senectus. Egestas consectetur vivamus aliquet platea aliquam
                    luctus
                    tristique sem congue.
                  </p>
                  <div className={styles.likes}>
                    <FavoriteIcon className={styles.favoriteIcon} fontSize={'small'}/>
                    <span>2</span>
                    <StyledSpeedDial
                      ariaLabel="SpeedDial controlled open example"
                      icon={<SpeedDialIcon/>}
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
          </ul>
        </article>
      </main>
    </section>
  )
}

export default Comments

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  marginLeft: '2rem',
  '& .MuiSpeedDial-fab': {
    height: '1.4rem',
    minHeight: '1.4rem',
    width: '1.4rem',
    borderRadius: '50% !important',
    boxShadow: 'none',
    paddingTop: '0.2rem',

    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem',
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
}))