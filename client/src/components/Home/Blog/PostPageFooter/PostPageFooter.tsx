import styles from './PostPageFooter.module.scss'
import { PostPageFooterComponent } from './types'
import ShareIcon from '@mui/icons-material/Share'
import Dropdown from '../../../Custom/Dropdown/Dropdown'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { getUserIdS } from '../../../../selectors/userSelectors'
import Comments from '../Comments/Comments'
import { getOpenPostS } from '../../../../selectors/postSelector'
import { likePostThunk, postActions } from '../../../../actions/postAction'
import Like from '../../../Custom/Like/Like'
import { getCountCommentsS } from '../../../../selectors/commentSelector'

const SELECT = ['By default', 'By date', 'By best']

export const PostPageFooter: PostPageFooterComponent = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(getUserIdS)
  const post = useAppSelector(getOpenPostS)
  const commentCount = useAppSelector(getCountCommentsS)

  const addLike = () => {
    if (userId && post) {
      // set post with new like for immediate response of user action
      dispatch(postActions.setLikestAC(userId))
      dispatch(likePostThunk(post._id))
    } else {
      console.log('You have to login first')
    }
  }
  return (
    <section className={styles.postPageFooter}>
      <header className={styles.header}>
        <div className={styles.line}>
          <h3 className={styles.count}>
            {commentCount} Comment{commentCount > 1 && 's'}
          </h3>
        </div>
        <div className={styles.actions}>
          <div className={styles.review}>
            <Like
              isLiked={!!(userId && post?.likes.includes(userId))}
              onClick={addLike}
              count={post?.likes.length || 0}
              disabled={!userId}
            />
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
        <Comments />
      </main>
    </section>
  )
}

export default PostPageFooter
