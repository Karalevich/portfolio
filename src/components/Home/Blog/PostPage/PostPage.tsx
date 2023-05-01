import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { POSTS, SHARE } from 'src/constants/personalInfo'
import styles from './PostPage.module.scss'
import { PostPageComponent } from './types'
import { PostCardComponent, PostProps } from '../types'
import { Tooltip } from '../../../Custom/Tooltip'
import Breadcrumbs from '../../../Custom/Breadcrumbs/Breadcrumbs'
import { OrderIcon } from '../../../Custom/Icons'
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'


export const PostPage: PostPageComponent = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const post = POSTS.find(post => post.id === id) as PostProps
  const { title, date, description, author, comments, img } = post
  const links = [
    { name: 'Home', link: '/home' },
    { name: 'Blog', link: '/blog' },
    { name: `${title}` },
  ]


  return (
    <section className={styles.postPage}>
      <header>
        <h2>{title}</h2>
        <article className={styles.info}>
          <div className={styles.author}>
            <img className={styles.authorImg} src={author.img}/>
            <div className={styles.authorData}>
              <span className={styles.name}>{author.name}</span>
              <span className={styles.date}>{date}</span>
            </div>
          </div>
          <div className={styles.share}>
            <span>SHARE:</span>
            <ul>
              {socialMediaIcons()}
            </ul>
          </div>
        </article>
        <Breadcrumbs links={links}/>
      </header>
      <main>
        <article>
          <img className={styles.mainImg} src={img}/>
          <p>A flyer is one of the most basic marketing materials for businesses. Whether you’re promoting an event,
            sale
            or new product, a flyer can capture the most important information of your promotion while driving interest
            with vibrant colors and interesting images. Follow the steps below to learn how to make a flyer.</p>
          <p>A flyer is one of the most basic marketing materials for businesses. Whether you’re promoting an event,
            sale
            or new product, a flyer can capture the most important information of your promotion while driving interest
            with vibrant colors and interesting images. Follow the steps below to learn how to make a flyer.</p>
          <p>A flyer is one of the most basic marketing materials for businesses. Whether you’re promoting an event,
            sale
            or new product, a flyer can capture the most important information of your promotion while driving interest
            with vibrant colors and interesting images. Follow the steps below to learn how to make a flyer.</p>
          <p>A flyer is one of the most basic marketing materials for businesses. Whether you’re promoting an event,
            sale
            or new product, a flyer can capture the most important information of your promotion while driving interest
            with vibrant colors and interesting images. Follow the steps below to learn how to make a flyer.</p>
        </article>
        <article className={styles.recommendations}>
          <h3 className={styles.youLike}>You may like this too</h3>
          <div className={styles.list}>
             {POSTS.slice(POSTS.length - 3).map(post => <RecommendCard key={post.id} {...post}/>)}
          </div>
        </article>
      </main>
      <footer className={styles.commentSection}>
        <article></article>
      </footer>
    </section>
  )
}

export default PostPage

const socialMediaIcons = () => {
  const icn = []
  for (const [key, value] of Object.entries(SHARE)) {
    const [icon, link] = value
    const mediaIcon = <Tooltip title={key} placement='top' key={key} arrow>
      <li className={styles.iconWrapper}>
        <a href={link as string} target="_blank" className={styles.link}>
          {icon}
        </a>
      </li>
    </Tooltip>
    icn.push(mediaIcon)
  }
  return icn
}

const RecommendCard: PostCardComponent = ({ img, title, description, id }) => {
  const [isCardHover, setIsCardHover] = useState(false)
  const redirect = useNavigate()

  const handleRedirect = () => {
    redirect(`/post/${id}`)
  }

  const toggleIsCardHover = (value: boolean) => () => {
    setIsCardHover(value)
  }
  return (
    <Card className={styles.card} elevation={isCardHover ? 2 : 0} onMouseEnter={toggleIsCardHover(true)}
          onMouseLeave={toggleIsCardHover(false)}>
      <CardActionArea onClick={handleRedirect}>
        <CardMedia className={styles.media} component="img" image={img} alt={title}/>
        <div className={styles.content}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.description}>{description}</p>
        </div>
      </CardActionArea>
    </Card>
  )
}



