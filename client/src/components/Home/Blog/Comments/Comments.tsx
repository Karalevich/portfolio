import styles from './Comments.module.scss'
import { CommentsComponent } from './types'
import Input from '../../../Custom/Input/Input'
import me from '../../../../assets/img/Me.webp'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import Dropdown from '../../../Custom/Dropdown/Dropdown'
import Comment from '../Comment/Comment'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { actionsPosts, likePostThunk } from '../../../../actions/postsAction'
import { getUserIdS } from '../../../../selectors/userSelectors'
import { getCertainPostS } from '../../../../selectors/postsSelectors'

const SELECT = ['By default', 'By date', 'By best']
const comments = [
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
  const dispatch = useAppDispatch()
  const userId = useAppSelector(getUserIdS)
  const post = useAppSelector(getCertainPostS)

  const addLike = () => {
    if (userId && post) {
      // set post with new like for immediate response of user action
      const likedPost = {
        ...post,
        likes: post.likes.includes(userId)
          ? post.likes.filter((id) => id !== userId)
          : [...post.likes, userId],
      }
      dispatch(actionsPosts.setCertainPostAC(likedPost))
      dispatch(likePostThunk(post._id))
    } else {
      console.log('You have to login first')
    }
  }
  return (
    <section className={styles.commentSection}>
      <header className={styles.header}>
        <div className={styles.line}>
          <h3 className={styles.count}>3 Comments</h3>
        </div>
        <div className={styles.actions}>
          <div className={styles.review}>
            <span className={styles.likes}>
              {userId && post?.likes.includes(userId) ? (
                <FavoriteIcon className={styles.liked} fontSize={'small'} onClick={addLike} />
              ) : (
                <FavoriteBorderIcon
                  className={styles.favoriteIcon}
                  fontSize={'small'}
                  onClick={addLike}
                />
              )}
              <p className={styles.number}>{post?.likes.length || 0}</p>
            </span>
            <p className={styles.share}>
              <ShareIcon className={styles.shareIcon} fontSize={'small'} />
              Share
            </p>
          </div>
          <div className={styles.filter}>
            <Dropdown selects={SELECT} />
          </div>
        </div>
      </header>
      <main className={styles.main}>
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
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </ul>
        </article>
      </main>
    </section>
  )
}

export default Comments
