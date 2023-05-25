import { useParams } from 'react-router-dom'
import { SHARE } from 'src/constants/personalInfo'
import styles from './PostPage.module.scss'
import { PostPageComponent } from './types'
import { Tooltip } from '../../../Custom/Tooltip'
import Breadcrumbs from '../../../Custom/Breadcrumbs/Breadcrumbs'
import RecommendCard from './RecommendCard'
import Comments from '../Comments/Comments'
import NotFound from '../../../NotFound/NotFound'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { getCertainPostThunk, getPostsByTagsThunk } from '../../../../actions/postsAction'
import { getCertainPostS, getRelatedPostsS } from '../../../../selectors/postsSelectors'

export const PostPage: PostPageComponent = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const post = useAppSelector(getCertainPostS)
  const relatedPosts = useAppSelector(getRelatedPostsS)

  useEffect(() => {
    if (id) {
      dispatch(getCertainPostThunk(id))
      dispatch(getPostsByTagsThunk(id))
    }
  }, [id])

  if (!post) {
    return <NotFound />
  }
  const { title, date, author, comments, img } = post
  const links = [{ name: 'Home', link: '/home' }, { name: 'Blog', link: '/blog' }, { name: `${title}` }]

  return (
    <section className={styles.postPage}>
      <header>
        <h2 className={styles.postTitle}>{title}</h2>
        <article className={styles.info}>
          <div className={styles.author}>
            <img className={styles.authorImg} src={author.img as string} />
            <div className={styles.authorData}>
              <span className={styles.name}>{author.name}</span>
              <span className={styles.date}>{date}</span>
            </div>
          </div>
          <div className={styles.share}>
            <span>SHARE:</span>
            <ul className={styles.shareList}>{socialMediaIcons()}</ul>
          </div>
        </article>
        <Breadcrumbs links={links} />
      </header>
      <main>
        <article className={styles.postContent}>
          <img className={styles.mainImg} src={img as string} />
          <p>
            A flyer is one of the most basic marketing materials for businesses. Whether you’re promoting
            an event, sale or new product, a flyer can capture the most important information of your
            promotion while driving interest with vibrant colors and interesting images. Follow the steps
            below to learn how to make a flyer.
          </p>
          <p>
            A flyer is one of the most basic marketing materials for businesses. Whether you’re promoting
            an event, sale or new product, a flyer can capture the most important information of your
            promotion while driving interest with vibrant colors and interesting images. Follow the steps
            below to learn how to make a flyer.
          </p>
          <p>
            A flyer is one of the most basic marketing materials for businesses. Whether you’re promoting
            an event, sale or new product, a flyer can capture the most important information of your
            promotion while driving interest with vibrant colors and interesting images. Follow the steps
            below to learn how to make a flyer.
          </p>
          <p>
            A flyer is one of the most basic marketing materials for businesses. Whether you’re promoting
            an event, sale or new product, a flyer can capture the most important information of your
            promotion while driving interest with vibrant colors and interesting images. Follow the steps
            below to learn how to make a flyer.
          </p>
        </article>
        <article className={styles.recommendations}>
          <h3 className={styles.youLike}>You may like this too</h3>
          <div className={styles.recommendList}>
            {relatedPosts.map((post) => (
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
