import { useNavigate, useParams } from 'react-router-dom'
import { PLACEHOLDER_COUNT_RELATED_POSTS, PLACEHOLDER_POST } from 'src/constants/personalInfo'
import styles from './PostPage.module.scss'
import { PostPageComponent } from './types'
import * as DOMPurify from 'dompurify'
import Breadcrumbs from '../../../Custom/Breadcrumbs/Breadcrumbs'
import RecommendCard from '../RecommendCard/RecommendCard'
import PostPageFooter from '../PostPageFooter/PostPageFooter'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { Button, Skeleton } from '@mui/material'
import SkeletonPostPage from './SkeletonPostPage/SkeletonPostPage'
import { modalActions } from '../../../../actions/modalAction'
import { MODAL_TYPE } from '../../../../reducers/modal/types'
import { getUserS } from '../../../../selectors/userSelectors'
import { getCertainPostThunk, postActions } from '../../../../actions/postAction'
import {
  getOpenPostS,
  getFetchingPostS,
  getFetchingRelatedPostsS,
  getRelatedPostsS,
} from '../../../../selectors/postSelector'
import ShareGroup from '../../../Custom/ShareGroup/ShareGroup'
import { RecommendCardT } from '../RecommendCard/types'

export const PostPage: PostPageComponent = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const post = useAppSelector(getOpenPostS)
  const relatedPosts = useAppSelector(getRelatedPostsS)
  const isFetchingRelatedPosts = useAppSelector(getFetchingRelatedPostsS)
  const isFetchingPost = useAppSelector(getFetchingPostS)
  const user = useAppSelector(getUserS)
  const navigate = useNavigate()
  const isRemovePostFromState = useRef(true)

  useEffect(() => {
    if (id) {
      dispatch(getCertainPostThunk(id))
    }
  }, [id])

  useEffect(() => {
    const cleanUp = () => {
      if (isRemovePostFromState.current) {
        dispatch(postActions.resetPostAC())
      }
    }
    return () => cleanUp()
  }, [isRemovePostFromState])

  const { author, title, date, content, img } = post
  const links = [{ name: 'Home', link: '/home' }, { name: 'Blog', link: '/blog' }, { name: `${title}` }]
  const isCurrentUserCreator = author && user && user.id === author._id
  const sanitizedContent = DOMPurify.sanitize(content)

  const onUpdatePost = () => {
    isRemovePostFromState.current = false
    isCurrentUserCreator && navigate('/blog/addPost')
  }

  const onDeletePost = () => {
    isCurrentUserCreator && dispatch(modalActions.openModalAC(MODAL_TYPE.CONFIRM_DELETE_POST))
  }

  return (
    <section className={styles.postPage}>
      {isFetchingPost ? (
        <SkeletonPostPage />
      ) : (
        <header>
          <h2 className={styles.postTitle}>{title}</h2>
          <article className={styles.info}>
            <div className={styles.author}>
              {author?.imageUrl ? (
                <img
                  className={styles.authorImg}
                  src={author.imageUrl}
                  alt={'post author'}
                  aria-label='post-author'
                />
              ) : (
                <span className={styles.authorImg}>{author?.name[0].toUpperCase()}</span>
              )}
              <div className={styles.authorData}>
                <span className={styles.name}>{author?.name}</span>
                <span className={styles.date}>{new Date(`${date}`).toLocaleDateString()}</span>
              </div>
            </div>
            <div className={styles.share}>
              <span>SHARE:</span>
              {id && <ShareGroup id={id} />}
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
      )}
      <main>
        {!isFetchingPost && (
          <article className={styles.postContent}>
            <img
              className={styles.mainImg}
              src={img as string}
              alt={'post preview'}
              aria-label='post preview'
            />
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedContent as string }}
              className={'ql-editor'}
              aria-label='content'
            />
          </article>
        )}
        <article className={styles.recommendations}>
          {isFetchingRelatedPosts ? (
            <h3>
              <Skeleton animation='wave' width={'40%'} className={styles.youLike} />
            </h3>
          ) : (
            <h3 className={styles.youLike}>You may like this too</h3>
          )}
          <div className={styles.recommendList}>
            {(isFetchingRelatedPosts
              ? Array(PLACEHOLDER_COUNT_RELATED_POSTS)
                  .fill(PLACEHOLDER_POST)
                  .map((e, i) => ({ ...e, _id: `${i}` }))
              : relatedPosts
            ).map((post: JSX.IntrinsicAttributes & RecommendCardT) => (
              <RecommendCard key={post._id} {...post} isFetchingPosts={isFetchingRelatedPosts} />
            ))}
          </div>
        </article>
      </main>
      <footer>
        <PostPageFooter />
      </footer>
    </section>
  )
}

export default PostPage
