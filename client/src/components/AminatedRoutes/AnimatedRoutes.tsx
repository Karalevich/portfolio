import React, { lazy, useEffect, useState } from 'react'
import './AnimatedRoutes.scss'
import { AnimatedRoutesComponent, ROUTES_ANIMATIONS } from './types'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { getUserS } from '../../selectors/userSelectors'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallback from '../ErrorBoundaryFallback/ErrorBoundaryFallback'
import LazyLoadSuspense from '../LazyLoadSuspense/LazyLoadSuspense'

const Home = lazy(() => import('../Home/Home'))
const PostPage = lazy(() => import('../Home/Blog/PostPage/PostPage'))
const AddPost = lazy(() => import('../Home/Blog/AddPost/AddPost'))
const NotFound = lazy(() => import('../NotFound/NotFound'))
const ServicePage = lazy(() => import('../Home/Services/ServicePage/ServicePage'))
const Services = lazy(() => import('../Home/Services/Services'))
const CV = lazy(() => import('../Home/CV/CV'))
const Portfolio = lazy(() => import('../Home/Portfolio/Portfolio'))
const Contact = lazy(() => import('../Home/Contact/Contact'))
const Blog = lazy(() => import('../Home/Blog/Blog'))

enum ERROR_BOUNDARY_FALLBACK_TEXT {
  POST_PAGE = 'Sorry for this inconvenience, but some unknown error has occurred during render Post page.',
  BLOG_PAGE = 'Sorry for this inconvenience, but some unknown error has occurred during render list of Posts page.',
  CONTACT_PAGE = 'Sorry for this inconvenience, but some unknown error has occurred during render Contact page.',
  ADD_POST_PAGE = 'Sorry for this inconvenience, but some unknown error has occurred on the Add post page.',
}

export const AnimatedRoutes: AnimatedRoutesComponent = () => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransistionStage] = useState<ROUTES_ANIMATIONS>(ROUTES_ANIMATIONS.FADE_IN)
  const user = useAppSelector(getUserS)
  useEffect(() => {
    if (location !== displayLocation) setTransistionStage(ROUTES_ANIMATIONS.FADE_OUT)
  }, [location, displayLocation])

  const onHandleAnimation = () => {
    if (transitionStage === ROUTES_ANIMATIONS.FADE_OUT) {
      setTransistionStage(ROUTES_ANIMATIONS.FADE_IN)
      setDisplayLocation(location)
    }
  }

  return (
    <div className={`${transitionStage}`} onAnimationEnd={onHandleAnimation}>
      <Routes location={displayLocation}>
        <Route path={'/'} element={<Navigate replace to='/home' />} />
        <Route path={'/home'} element={<LazyLoadSuspense children={<Home />} />} />
        <Route path={'/services'} element={<LazyLoadSuspense children={<Services />} />} />
        <Route
          path={'/services/:servicePage'}
          element={
            <ErrorBoundary fallback={<ErrorBoundaryFallback redirectUrl={'services'} />}>
              <LazyLoadSuspense children={<ServicePage />} />
            </ErrorBoundary>
          }
        />
        <Route path={'/cv'} element={<LazyLoadSuspense children={<CV />} />} />
        <Route path={'/portfolio'} element={<LazyLoadSuspense children={<Portfolio />} />} />
        <Route
          path={'/blog'}
          element={
            <ErrorBoundary
              fallback={
                <ErrorBoundaryFallback
                  redirectUrl={'home'}
                  description={ERROR_BOUNDARY_FALLBACK_TEXT.BLOG_PAGE}
                />
              }
            >
              <LazyLoadSuspense children={<Blog isFullVersion />} />
            </ErrorBoundary>
          }
        />
        <Route
          path={'/blog/post/:id'}
          element={
            <ErrorBoundary
              fallback={
                <ErrorBoundaryFallback
                  redirectUrl={'blog'}
                  description={ERROR_BOUNDARY_FALLBACK_TEXT.POST_PAGE}
                />
              }
            >
              <LazyLoadSuspense children={<PostPage />} />
            </ErrorBoundary>
          }
        />
        <Route
          path={'/blog/addPost'}
          element={
            <ErrorBoundary
              fallback={
                <ErrorBoundaryFallback
                  redirectUrl={'blog'}
                  description={ERROR_BOUNDARY_FALLBACK_TEXT.ADD_POST_PAGE}
                />
              }
            >
              {user && user.isActivated ? (
                <LazyLoadSuspense children={<AddPost />} />
              ) : (
                <LazyLoadSuspense children={<NotFound />} />
              )}
            </ErrorBoundary>
          }
        />
        <Route
          path={'/contact'}
          element={
            <ErrorBoundary
              fallback={
                <ErrorBoundaryFallback description={ERROR_BOUNDARY_FALLBACK_TEXT.CONTACT_PAGE} />
              }
            >
              <LazyLoadSuspense children={<Contact />} />
            </ErrorBoundary>
          }
        />
        <Route path={'/not-found'} element={<LazyLoadSuspense children={<NotFound />} />} />
        <Route path={'*'} element={<LazyLoadSuspense children={<NotFound />} />} />
      </Routes>
    </div>
  )
}

export default AnimatedRoutes
