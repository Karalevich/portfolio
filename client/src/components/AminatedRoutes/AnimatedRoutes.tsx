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
import ErrorModal from '../Custom/Modal/ErrorModal/ErrorModal'

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
        <Route path={'/services/:servicePage'} element={<ServicePage />} />
        <Route path={'/cv'} element={<CV />} />
        <Route path={'/portfolio'} element={<Portfolio />} />
        <Route path={'/blog'} element={<Blog isFullVersion />} />
        <Route
          path={'/blog/post/:id'}
          element={
            <ErrorBoundary fallback={<ErrorModal />}>
              <PostPage />
            </ErrorBoundary>
          }
        />
        <Route path={'/blog/addPost'} element={user ? <AddPost /> : <NotFound />} />
        <Route path={'/contact'} element={<Contact />} />
        <Route path={'/not-found'} element={<NotFound />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default AnimatedRoutes
