import { useEffect, useState } from 'react'
import './AnimatedRoutes.scss'
import { AnimatedRoutesComponent, ROUTES_ANIMATIONS } from './types'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../Home/Home'
import Services from '../Home/Services/Services'
import ServicePage from '../Home/Services/ServicePage/ServicePage'
import CV from '../Home/CV/CV'
import Portfolio from '../Home/Portfolio/Portfolio'
import Contact from '../Home/Contact/Contact'
import Blog from '../Home/Blog/Blog'
import PostPage from '../Home/Blog/PostPage/PostPage'
import NotFound from '../NotFound/NotFound'
import AddPost from '../Home/Blog/AddPost/AddPost'
import { useAppSelector } from '../../hooks/hooks'
import { getUserS } from '../../selectors/userSelectors'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallback from '../ErrorBoundaryFallback/ErrorBoundaryFallback'

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
        <Route path={'/home'} element={<Home />} />
        <Route path={'/services'} element={<Services />} />
        <Route
          path={'/services/:servicePage'}
          element={
            <ErrorBoundary fallback={<ErrorBoundaryFallback redirectUrl={'services'} />}>
              <ServicePage />
            </ErrorBoundary>
          }
        />
        <Route path={'/cv'} element={<CV />} />
        <Route path={'/portfolio'} element={<Portfolio />} />
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
              <Blog isFullVersion />
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
              <PostPage />
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
              {user && user.isActivated ? <AddPost /> : <NotFound />}
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
              <Contact />
            </ErrorBoundary>
          }
        />
        <Route path={'/not-found'} element={<NotFound />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default AnimatedRoutes
