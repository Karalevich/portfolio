import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CarouselContext, Slide, Slider } from 'pure-react-carousel'
import { PLACEHOLDER_COUNT_POSTS, PLACEHOLDER_POST } from '../../../../constants/personalInfo'
import classnames from 'classnames'
import styles from './Posts.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { blogActions, getPaginatedPostsThunk, getPostsThunk } from '../../../../actions/blogAction'
import {
  getAllPagesS,
  getCurrentPageS,
  getFetchingPaginatedPostsS,
  getFetchingPostsS,
  getPostsS,
  getSearchValueS,
  getSortValueS,
} from '../../../../selectors/blogSelectors'
import PostCard from '../PostCard/PostCard'
import { PostT } from '../PostCard/types'
import { CircularProgress } from '@mui/material'
import { PostsContent } from './types'

const Posts: PostsContent = ({ isTabletOrMobile, isFullVersion }) => {
  const carouselContext = useContext(CarouselContext)
  const [currentSlide, setCurrentSlide] = useState(carouselContext?.state?.currentSlide)
  const dispatch = useAppDispatch()
  const isFetchingPosts = useAppSelector(getFetchingPostsS)
  const posts = useAppSelector(getPostsS)
  const isFetchingPaginatedPosts = useAppSelector(getFetchingPaginatedPostsS)
  const currentPage = useAppSelector(getCurrentPageS)
  const allPages = useAppSelector(getAllPagesS)
  const searchValue = useAppSelector(getSearchValueS)
  const sortValue = useAppSelector(getSortValueS)
  const observer = useRef<null | IntersectionObserver>(null)

  const isReachedLimit = currentPage >= allPages

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide)
    }

    dispatch(getPostsThunk('', 0, 1))

    carouselContext?.subscribe(onChange)
    return () => {
      carouselContext?.unsubscribe(onChange)
      dispatch(blogActions.setCurrentPageAC(1))
    }
  }, [])

  const lastPostCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingPaginatedPosts) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isReachedLimit) {
          dispatch(blogActions.setCurrentPageAC(currentPage + 1))
          dispatch(getPaginatedPostsThunk(searchValue, sortValue, currentPage + 1))
        }
      })

      if (node) observer.current?.observe(node)
    },
    [isFetchingPaginatedPosts, isReachedLimit, searchValue, sortValue]
  )

  const mappedPosts = (
    isFetchingPosts
      ? Array(PLACEHOLDER_COUNT_POSTS)
          .fill(PLACEHOLDER_POST)
          .map((e, i) => ({ ...e, _id: `${i}` }))
      : posts
  ).map((props: PostT, index: number, self) => {
    return (
      <Fragment key={props._id}>
        {isFullVersion ? (
          <PostCard
            {...props}
            isFullVersion={isFullVersion}
            isFetchingPosts={isFetchingPosts}
            ref={index === self.length - 1 ? lastPostCardRef : null}
          />
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
        <>
          {mappedPosts}
          {isFetchingPaginatedPosts && (
            <CircularProgress className={styles.paginatedLoader} size={'2rem'} />
          )}
        </>
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
