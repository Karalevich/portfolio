import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import styles from './Comments.module.scss'
import { CommentFormComponent, CommentListComponent, CommentsComponent } from './types'
import me from '../../../../assets/img/Me.webp'
import Input from '../../../Custom/Input/Input'
import Comment from './Comment/Comment'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { getOpenedPostIdS } from '../../../../selectors/postSelector'
import { CommentT } from '../../../../reducers/comment/types'
import { addCommentThunk, getCommentsThunk } from '../../../../actions/commentAction'
import {
  getCommentsS,
  getFetchingCommentsS,
  getLoadingCommentsS,
} from '../../../../selectors/commentSelector'
import { getUserS } from '../../../../selectors/userSelectors'
import LoadingButton from '@mui/lab/LoadingButton'
import CommentAvatar from './CommentAvatar/CommentAvatar'
import { useMediaQuery } from '@mui/material'
import { modalActions } from '../../../../actions/modalAction'
import { MODAL_TYPE } from '../../../../reducers/modal/types'

const postPageFooter = [
  {
    _id: '1',
    author: {
      name: 'Andrei Karalevich',
      _id: '11',
      imageUrl: me,
    },
    post: '1',
    parent: '',
    children: [],
    likes: [],
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper accumsan malesuada sed feugiat. 
    Rhoncus vel ultrices metus ut sed. Sit nunc, in nibh nisi, viverra quis sociismalesuada. Id lacus integer eget 
    quisque senectus. Egestas consectetur vivamus aliquet platea aliquamluctus tristique sem congue.`,
    create_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: '12',
    author: {
      name: 'Andrei Karalevich',
      _id: '11',
      imageUrl: me,
    },
    post: '1',
    parent: '1',
    children: [],
    likes: [],
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper accumsan malesuada sed feugiat. 
    Rhoncus vel ultrices metus ut sed. Sit nunc, in nibh nisi, viverra quis sociismalesuada. Id lacus integer eget 
    quisque senectus. Egestas consectetur vivamus aliquet platea aliquamluctus tristique sem congue.`,
    create_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: '12312312',
    author: {
      name: 'Andrei Karalevich',
      _id: '11',
      imageUrl: me,
    },
    post: '1',
    parent: '',
    children: [],
    likes: [],
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper accumsan malesuada sed feugiat. 
    Rhoncus vel ultrices metus ut sed. Sit nunc, in nibh nisi, viverra quis sociismalesuada. Id lacus integer eget 
    quisque senectus. Egestas consectetur vivamus aliquet platea aliquamluctus tristique sem congue.`,
    create_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: '1231sdf12',
    author: {
      name: 'Andrei Karalevich',
      _id: '11',
      imageUrl: me,
    },
    post: '1',
    parent: '12',
    children: [],
    likes: [],
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper accumsan malesuada sed feugiat. 
    Rhoncus vel ultrices metus ut sed. Sit nunc, in nibh nisi, viverra quis sociismalesuada. Id lacus integer eget 
    quisque senectus. Egestas consectetur vivamus aliquet platea aliquamluctus tristique sem congue.`,
    create_at: new Date(),
    updated_at: new Date(),
  },
]

const Comments: CommentsComponent = () => {
  const [commentValue, setCommentValue] = useState('')
  const dispatch = useAppDispatch()
  const isFetchingComments = useAppSelector(getFetchingCommentsS)
  const isLoadingComments = useAppSelector(getLoadingCommentsS)
  const postId = useAppSelector(getOpenedPostIdS)
  const comments = useAppSelector(getCommentsS)
  const user = useAppSelector(getUserS)
  const isDekstop = useMediaQuery('(min-width:767px)')
  //const comments = postPageFooter

  useEffect(() => {
    postId && dispatch(getCommentsThunk(postId, 1, 0))
  }, [postId])

  const commentGroupByParent = useMemo(() => {
    if (!comments.length) return {}
    const group: { [key: string]: Array<CommentT> } = {}
    comments.forEach((comment) => {
      group[comment.parent || ''] ||= []
      group[comment.parent || ''].push(comment)
    })
    return group
  }, [comments])

  const getReplies = (parentId: string) => {
    return commentGroupByParent[parentId]
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value)
  }

  const onComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user?.isActivated) {
      dispatch(modalActions.openModalAC(MODAL_TYPE.ACTIVATE_ACCOUNT_INFO))
    } else {
      dispatch(addCommentThunk(() => setCommentValue(''), commentValue.trim(), postId))
    }
  }

  return (
    <article className={styles.leaveComment}>
      <div className={styles.inputWrap}>
        {isDekstop && <CommentAvatar name={user?.name} imageUrl={user?.imageUrl} />}
        <CommentForm
          onSubmit={onComment}
          onChange={onChange}
          value={commentValue}
          isLoadingComments={isLoadingComments}
          disabled={!user}
        />
      </div>
      {commentGroupByParent[''] && comments.length > 0 && (
        <CommentList comments={commentGroupByParent['']} getReplies={getReplies} />
      )}
    </article>
  )
}

export default Comments

export const CommentList: CommentListComponent = ({ comments, getReplies }) => {
  return (
    <ul className={styles.comments}>
      {comments.map((comment) => (
        <Comment key={comment._id} {...comment} getReplies={getReplies} />
      ))}
    </ul>
  )
}

export const CommentForm: CommentFormComponent = ({ value, onChange, onSubmit, isLoadingComments, disabled }) => {
  return (
    <form className={styles.commentArea} onSubmit={onSubmit}>
      <Input
        className={styles.textarea}
        value={value}
        onChange={onChange}
        autoFocus
        fullWidth
        multiline
        rows={3}
        sx={{
          paddingTop: '2px',
          '.MuiInputBase-inputMultiline': {
            borderRadius: '0.625rem',
            boxShadow: `#767676 0 0 0 0.1rem`,
          },
        }}
      />
      <LoadingButton
        type={'submit'}
        disableElevation
        variant='outlined'
        size={'small'}
        sx={{ alignSelf: 'end', zIndex: 1 }}
        loading={isLoadingComments}
        loadingPosition='center'
        disabled={disabled}
      >
        Comment
      </LoadingButton>
    </form>
  )
}
