import styles from './Comments.module.scss'
import { CommentsComponent } from './types'
import Input from '../../../Custom/Inputs/Input'
import me from '../../../../assets/img/Me.webp'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import Dropdown from '../../../Custom/Dropdown/Dropdown'
import Comment from '../Comment/Comment'

const SELECT = [
  'By default', 'By date', 'By best',
]
const comments = [
  {
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
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
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
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
            <img className={styles.userImage} src={me} alt={'user avatar'}/>
            <Input className={styles.textarea} fullWidth multiline rows={3} sx={{
              '.MuiInputBase-inputMultiline': {
                borderRadius: '0.625rem',
                boxShadow: `#767676 0 0 0 0.1rem`,
              },
            }}/>
          </div>
          <ul className={styles.comments}>
            {comments.map(comment => <Comment key={comment.id} {...comment}/>)}
          </ul>
        </article>
      </main>
    </section>
  )
}

export default Comments

