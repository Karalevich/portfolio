import React, { Fragment, useContext, useEffect, useState } from 'react'

import { CarouselContext, Slide, Slider } from 'pure-react-carousel'
import { PLACEHOLDER_COUNT_POSTS, PLACEHOLDER_POST } from '../../../constants/personalInfo'
import classnames from 'classnames'
import styles from './Blog.module.scss'
import { PostsContent } from './types'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getPostsThunk } from '../../../actions/postsAction'
import { getFetchingPostsS, getPostsS } from '../../../selectors/postsSelectors'
import PostCard from './PostCard/PostCard'

const Posts: PostsContent = ({ isTabletOrMobile, isFullVersion }) => {
  const carouselContext = useContext(CarouselContext)
  const [currentSlide, setCurrentSlide] = useState(carouselContext?.state?.currentSlide)
  const dispatch = useAppDispatch()
  const isFetchingPosts = useAppSelector(getFetchingPostsS)
  const posts = useAppSelector(getPostsS)

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide)
    }

    dispatch(getPostsThunk())

    carouselContext?.subscribe(onChange)
    return () => carouselContext?.unsubscribe(onChange)
  }, [])

  const mappedPosts = (isFetchingPosts
    ? Array(PLACEHOLDER_COUNT_POSTS).fill(PLACEHOLDER_POST).map((e, i) => ({ ...e, _id: `${i}` }))
    : posts
  )
    .map((props, index) => {
      return (
        <Fragment key={props._id}>
          {isFullVersion ? (
            <PostCard {...props} isFullVersion={isFullVersion} isFetchingPosts={isFetchingPosts} />
          ) : (
            <Slide index={index || 0} innerClassName={styles.innerSlide}>
              <PostCard {...props} isFetchingPosts={isFetchingPosts} />
            </Slide>
          )}
        </Fragment>
      )
    })

  return (
    <>
      {isFullVersion ? (
        mappedPosts
      ) : (
        <Slider
          classNameAnimation={classnames({
            [styles.lastSlide]: currentSlide === mappedPosts.length - 1,
            [styles.sliderTray]: isTabletOrMobile,
          })}
        >
          {mappedPosts}
        </Slider>
      )}
    </>
  )
}
export default Posts