import styles from './CommentForm.module.scss'
import Input from '../../../../Custom/Input/Input'
import LoadingButton from '@mui/lab/LoadingButton'
import React from 'react'
import { CommentFormComponent } from './types'

const CommentForm: CommentFormComponent = ({
  value,
  onChange,
  onSubmit,
  isLoadingComments,
  disabled,
}) => {
  return (
    <form className={styles.commentArea} onSubmit={onSubmit} aria-label='comment-form'>
      <Input
        value={value}
        onChange={onChange}
        fullWidth
        multiline
        rows={3}
        sx={{
          paddingTop: '2px',
          '.MuiInputBase-inputMultiline': {
            borderRadius: '0.625rem',
            backgroundColor: 'var(--input-comment-bcg)',
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

export default CommentForm
