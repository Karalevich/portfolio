import { useNavigate, useParams } from 'react-router-dom'
import { PLACEHOLDER_COUNT_RELATED_POSTS, PLACEHOLDER_POST, SHARE } from 'src/constants/personalInfo'
import styles from './PostPage.module.scss'
import { PostPageComponent } from './types'
import { Tooltip } from '../../../Custom/Tooltip'
import Breadcrumbs from '../../../Custom/Breadcrumbs/Breadcrumbs'
import RecommendCard from './RecommendCard'
import Comments from '../Comments/Comments'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { actionsPosts, getCertainPostThunk, getPostsByTagsThunk } from '../../../../actions/postsAction'
import { getCertainPostS, getFetchingRelatedPostsS, getRelatedPostsS } from '../../../../selectors/postsSelectors'
import { Button } from '@mui/material'
import { RecommendCardT } from '../PostCard/types'
import SkeletonPostPage from './SkeletonPostPage/SkeletonPostPage'
import { actionsModal } from '../../../../actions/modalAction'
import { MODAL_TYPE } from '../../../../reducers/modal/types'
import { getUserS } from '../../../../selectors/userSelectors'

export const PostPage: PostPageComponent = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const post = useAppSelector(getCertainPostS)
  const relatedPosts = useAppSelector(getRelatedPostsS)
  const isFetchingRelatedPosts = useAppSelector(getFetchingRelatedPostsS)
  const user = useAppSelector(getUserS)
  const navigate = useNavigate()
  const [isRemovePostFromState, setIsRemovePostFromState] = useState(true)

  useEffect(() => {
    if (id) {
      dispatch(getCertainPostThunk(id))
      dispatch(actionsPosts.changeOpenedPostIdAC(id || ''))
    }
    return () => {
      isRemovePostFromState && dispatch(actionsPosts.changeOpenedPostIdAC(''))
    }
  }, [id, isRemovePostFromState])

  useEffect(() => {
    post?.tags && dispatch(getPostsByTagsThunk(post.tags.join()))
  }, [post?.tags])

  const {
    likes,
    author,
    title,
    date,
    authorImg,
    authorName = 'A',
    content,
    img,
  } = post || {}
  const links = [{ name: 'Home', link: '/home' }, { name: 'Blog', link: '/blog' }, { name: `${title}` }]
  const isCurrentUserCreator = user?.id === author && author && user

  const onUpdatePost = () => {
    setIsRemovePostFromState(false)
    isCurrentUserCreator && navigate('/blog/addPost')
  }

  const onDeletePost = () => {
    isCurrentUserCreator && dispatch(actionsModal.openModalAC(MODAL_TYPE.CONFIRM_DELETE_POST))
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
            {isCurrentUserCreator && (
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
            )}
          </div>
        </header>
      ) : (
        <SkeletonPostPage />
      )}
      <main>
        {post && (
          <article className={styles.postContent}>
            <img className={styles.mainImg} src={img as string} alt={'post preview'} />
            <div dangerouslySetInnerHTML={{ __html: content as string }} className={'ql-editor'} />
          </article>
        )}
        <article className={styles.recommendations}>
          <h3 className={styles.youLike}>You may like this too</h3>
          <div className={styles.recommendList}>
            {(isFetchingRelatedPosts
                ? Array(PLACEHOLDER_COUNT_RELATED_POSTS)
                  .fill(PLACEHOLDER_POST)
                  .map((e, i) => ({ ...e, _id: `${i}` }))
                : relatedPosts
            ).map((post: JSX.IntrinsicAttributes & RecommendCardT) => (
              <RecommendCard key={post._id} {...post} isFetchingPosts={isFetchingRelatedPosts}/>
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
