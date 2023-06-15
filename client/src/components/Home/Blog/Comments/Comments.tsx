import React from 'react'
import styles from './Comments.module.scss'
import { CommentsComponent } from './types'
import me from '../../../../assets/img/Me.webp'
import Input from '../../../Custom/Input/Input'
import Comment from './Comment/Comment'

const postPageFooter = [
  {
    authorName: 'Andrei Karalevich',
    authorImg: me,
    date: '14:12, 03-03-2023',
    message: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper accumsan malesuada sed
            feugiat. Rhoncus vel ultrices metus ut sed. Sit nunc, in nibh nisi, viverra quis sociis
            malesuada.
            Id lacus integer eget quisque senectus. Egestas consectetur vivamus aliquet platea aliquam
            luctus
            tristique sem congue.`,
    id: '123',
  },
  {
    authorName: 'Andrei Karalevich',
    authorImg: me,

    date: '14:12, 03-03-2023',
    message: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper accumsan malesuada sed
            feugiat. Rhoncus vel ultrices metus ut sed. Sit nunc, in nibh nisi, viverra quis sociis
            malesuada.
            Id lacus integer eget quisque senectus. Egestas consectetur vivamus aliquet platea aliquam
            luctus
            tristique sem congue.`,
    id: '122',
  },
]

export const Comments: CommentsComponent = () => {
  return (
    <article className={styles.leaveComment}>
      <div className={styles.commentArea}>
        <img className={styles.userImage} src={me} alt={'user avatar'} />
        <Input
          className={styles.textarea}
          fullWidth
          multiline
          rows={3}
          sx={{
            '.MuiInputBase-inputMultiline': {
              borderRadius: '0.625rem',
              boxShadow: `#767676 0 0 0 0.1rem`,
            },
          }}
        />
      </div>
      <ul className={styles.comments}>
        {postPageFooter.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </ul>
    </article>
  )
}

export default Comments
