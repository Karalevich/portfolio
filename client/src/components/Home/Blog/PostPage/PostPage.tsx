import { useNavigate, useParams } from 'react-router-dom'
import { SHARE } from 'src/constants/personalInfo'
import styles from './PostPage.module.scss'
import { PostPageComponent } from './types'
import { Tooltip } from '../../../Custom/Tooltip'
import Breadcrumbs from '../../../Custom/Breadcrumbs/Breadcrumbs'
import RecommendCard from './RecommendCard'
import Comments from '../Comments/Comments'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { actionsPosts, getCertainPostThunk } from '../../../../actions/postsAction'
import { getCertainPostS, getRelatedPostsS } from '../../../../selectors/postsSelectors'
import { Button } from '@mui/material'
import { RecommendCardT } from '../PostCard/types'
import SkeletonPostPage from './SkeletonPostPage/SkeletonPostPage'
import { actionsModal } from '../../../../actions/modalAction'
import { MODAL_TYPE } from '../../../../reducers/modal/types'

export const PostPage: PostPageComponent = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const post = useAppSelector(getCertainPostS)
  const relatedPosts = useAppSelector(getRelatedPostsS)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(getCertainPostThunk(id, navigate))
      dispatch(actionsPosts.changeOpenedPostIdAC(id || ''))
      //dispatch(getPostsByTagsThunk(id))
    }
  }, [id])

  const { title, date, authorImg, authorName = 'A', content, img } = post || {}
  const links = [{ name: 'Home', link: '/home' }, { name: 'Blog', link: '/blog' }, { name: `${title}` }]

  const onUpdatePost = () => {
    navigate('/blog/addPost')
  }

  const onDeletePost = () => {
    dispatch(actionsModal.openModalAC(MODAL_TYPE.CONFIRM_DELETE_POST))
  }

  return (
    <section className={styles.postPage}>
      {post ? (
        <header>
          <h2 className={styles.postTitle}>{title}</h2>
          <article className={styles.info}>
            <div className={styles.author}>
              {authorImg ? (
                <img className={styles.authorImg} src={authorImg} alt={'post author'} />
              ) : (
                <span className={styles.authorImg}>{authorName[0].toUpperCase()}</span>
              )}
              <div className={styles.authorData}>
                <span className={styles.name}>{authorName}</span>
                <span className={styles.date}>{date}</span>
              </div>
            </div>
            <div className={styles.share}>
              <span>SHARE:</span>
              <ul className={styles.shareList}>{socialMediaIcons()}</ul>
            </div>
          </article>
          <div className={styles.actionGroup}>
            <Breadcrumbs links={links} />
            <div className={styles.buttonGroup}>
              <Button
                className={styles.buttonPostAction}
                variant='contained'
                size={'medium'}
                onClick={onUpdatePost}
                fullWidth
                disableElevation
              >
                Edit
              </Button>
              <Button
                className={styles.buttonPostAction}
                variant='outlined'
                color={'error'}
                size={'medium'}
                onClick={onDeletePost}
                fullWidth
              >
                Delete
              </Button>
            </div>
          </div>
        </header>
      ) : (
        <SkeletonPostPage />
      )}
      <main>
        {post && (
          <article className={styles.postContent}>
            <img className={styles.mainImg} src={img as string} alt={'post preview'} />
            <div dangerouslySetInnerHTML={{ __html: content as string }} />
          </article>
        )}
        <article className={styles.recommendations}>
          <h3 className={styles.youLike}>You may like this too</h3>
          <div className={styles.recommendList}>
            {relatedPosts.map((post: JSX.IntrinsicAttributes & RecommendCardT) => (
              <RecommendCard key={post._id} {...post} />
            ))}
          </div>
        </article>
      </main>
      <footer>
        <Comments />
      </footer>
    </section>
  )
}

export default PostPage

const socialMediaIcons = () => {
  const icn = []
  for (const [key, value] of Object.entries(SHARE)) {
    const [icon, link] = value
    const mediaIcon = (
      <Tooltip title={key} placement='top' key={key} arrow>
        <li className={styles.iconWrapper}>
          <a href={link as string} target='_blank' className={styles.link}>
            {icon}
          </a>
        </li>
      </Tooltip>
    )
    icn.push(mediaIcon)
  }
  return icn
}
