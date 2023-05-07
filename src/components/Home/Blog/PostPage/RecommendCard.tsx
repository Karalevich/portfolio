import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styles from './PostPage.module.scss'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import { Card, CardActionArea, CardMedia } from '@mui/material'
import { PostCardComponent } from '../types'


const RecommendCard: PostCardComponent = ({ img, title, id, date, author }) => {
  const [isCardHover, setIsCardHover] = useState(false)
  const redirect = useNavigate()

  const handleRedirect = () => {
    redirect(`/blog/post/${id}`)
  }

  const toggleIsCardHover = (value: boolean) => () => {
    setIsCardHover(value)
  }
  return (
    <Card className={styles.card} elevation={isCardHover ? 8 : 0} onMouseEnter={toggleIsCardHover(true)}
          onMouseLeave={toggleIsCardHover(false)}>
      <CardActionArea className={styles.actionArea} onClick={handleRedirect}>
        <CardMedia className={styles.media} component="img" image={img} alt={title}/>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.data}>
            <span className={styles.type}>
              <AccessTimeIcon fontSize={'small'}/><span>{date}</span>
            </span>
            <span className={styles.type}>
              <PersonOutlineIcon fontSize={'small'}/><span>{author.name}</span>
            </span>
          </div>
        </div>
      </CardActionArea>
    </Card>
  )
}

export default RecommendCard