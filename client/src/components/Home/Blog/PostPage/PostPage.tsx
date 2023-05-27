import { useParams } from 'react-router-dom'
import { SHARE } from 'src/constants/personalInfo'
import styles from './PostPage.module.scss'
import { PostPageComponent } from './types'
import { Tooltip } from '../../../Custom/Tooltip'
import Breadcrumbs from '../../../Custom/Breadcrumbs/Breadcrumbs'
import RecommendCard from './RecommendCard'
import Comments from '../Comments/Comments'
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { actionsPosts, getCertainPostThunk } from '../../../../actions/postsAction'
import {
  getCertainPostS,
  getRelatedPostsS,
} from '../../../../selectors/postsSelectors'
import { Button, Skeleton } from '@mui/material'
import { RecommendCardT } from '../PostCard/types'

export const PostPage: PostPageComponent = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const post = useAppSelector(getCertainPostS)
  const relatedPosts = useAppSelector(getRelatedPostsS)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(getCertainPostThunk(id, navigate))
      //dispatch(getPostsByTagsThunk(id))
    }
  }, [id])

  const { title, date, authorImg, authorName, content, img } = post || {}
  const links = [{ name: 'Home', link: '/home' }, { name: 'Blog', link: '/blog' }, { name: `${title}` }]

  const onUpdatePost = () => {
    dispatch(actionsPosts.changeOpenedPostIdAC(id || ''))
    navigate('/blog/addPost')
  }

  const onDeletePost = () => {

  }

  return (
    <section className={styles.postPage}>
      <header>
        {title
          ? <h2 className={styles.postTitle}>{title}</h2>
          : <Skeleton animation='wave' width={'80%'} />}
        <article className={styles.info}>
          <div className={styles.author}>
            {authorImg ? (
              <img className={styles.authorImg} src={authorImg} alt={'post author'} />
            ) : authorName
              ? <span className={styles.authorImg}>{authorName[0].toUpperCase()}</span>
              : <Skeleton animation='wave' width={'80%'} />}

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
              Update
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
      <main>
        <article className={styles.postContent}>
          {img
            ? <img className={styles.mainImg} src={img as string} alt={'post preview'} />
            : <Skeleton animation='wave' width={'80%'} />}
          {content
            ? <div dangerouslySetInnerHTML={{ __html: content }} />
            : <Skeleton animation='wave' width={'80%'} />}
        </article>
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
