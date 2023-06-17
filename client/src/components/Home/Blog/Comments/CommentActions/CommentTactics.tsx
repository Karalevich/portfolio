import React, { useState } from 'react'
import { CommentTacticsComponent } from './types'
import ShareIcon from '@mui/icons-material/Share'
import EditIcon from '@mui/icons-material/Edit'
import ReplyIcon from '@mui/icons-material/Reply'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { SpeedDial, SpeedDialAction, SpeedDialIcon, styled } from '@mui/material'
import { useAppSelector } from '../../../../../hooks/hooks'
import { getUserIdS } from '../../../../../selectors/userSelectors'

enum COMMENT_ACTIONS_NAME {
  SHARE = 'Share',
  EDIT = 'Edit',
  REPLY = 'Reply',
  DELETE = 'Delete',
}

const actions = [
  { icon: <ShareIcon fontSize={'small'} />, name: COMMENT_ACTIONS_NAME.SHARE },
  { icon: <EditIcon fontSize={'small'} />, name: COMMENT_ACTIONS_NAME.EDIT },
  { icon: <ReplyIcon fontSize={'small'} />, name: COMMENT_ACTIONS_NAME.REPLY },
  { icon: <DeleteForeverIcon fontSize={'small'} />, name: COMMENT_ACTIONS_NAME.DELETE },
]

export const CommentTactics: CommentTacticsComponent = ({
  shareAction,
  replayAction,
  editAction,
  deleteAction,
  author,
}) => {
  const [openReactions, setOpenReactions] = useState(false)
  const userId = useAppSelector(getUserIdS)

  const handleOpenSpeedDial = () => setOpenReactions(true)

  const handleCommentAction = (actionName?: COMMENT_ACTIONS_NAME) => () => {
    setOpenReactions(false)
    switch (actionName) {
      case COMMENT_ACTIONS_NAME.EDIT: {
        editAction && editAction()
        break
      }
      case COMMENT_ACTIONS_NAME.DELETE: {
        deleteAction && deleteAction()
        break
      }
      case COMMENT_ACTIONS_NAME.REPLY: {
        replayAction()
        break
      }
      case COMMENT_ACTIONS_NAME.SHARE: {
        shareAction()
        break
      }
    }
  }

  return (
    <>
      <StyledSpeedDial
        ariaLabel='SpeedDial controlled open example'
        icon={<SpeedDialIcon />}
        onClose={handleCommentAction()}
        onOpen={handleOpenSpeedDial}
        open={openReactions}
        direction={'right'}
      >
        {actions
          .filter((action) => {
            if (
              (action.name === COMMENT_ACTIONS_NAME.EDIT ||
                action.name === COMMENT_ACTIONS_NAME.DELETE) &&
              userId !== author._id
            ) {
              return
            }
            return action
          })
          .map((action) => (
            <StyledSpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleCommentAction(action.name)}
            />
          ))}
      </StyledSpeedDial>
    </>
  )
}

export default CommentTactics

const StyledSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
  height: '1.6rem',
  minHeight: '1.6rem',
  width: '1.6rem',
  borderRadius: '50% !important',
  margin: '0 0.5rem',
  boxShadow: `none`,

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
