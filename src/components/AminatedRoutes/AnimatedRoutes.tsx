import { useEffect, useState } from 'react'
import './AnimatedRoutes.scss'
import { AnimatedRoutesComponent } from './types'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../Home/Home'
import Services from '../Home/Services/Services'
import ServicePage from '../Home/Services/ServicePage/ServicePage'
import CV from '../Home/CV/CV'
import Portfolio from '../Home/Portfolio/Portfolio'
import Contact from '../Home/Contact/Contact'
import Blog from '../Home/Blog/Blog'


export const AnimatedRoutes: AnimatedRoutesComponent = () => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransistionStage] = useState('fadeIn')

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage('fadeOut')
  }, [location, displayLocation])

  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransistionStage('fadeIn')
          setDisplayLocation(location)
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route path={'/'} element={<Navigate replace to='/home'/>}/>
        <Route path={'/home'} element={<Home/>}/>
        <Route path={'/services'} element={<Services/>}/>
        <Route path={'/services/:servicePage'} element={<ServicePage/>}/>
        <Route path={'/cv'} element={<CV/>}/>
        <Route path={'/portfolio'} element={<Portfolio/>}/>
        {/*<Route path={'/blog'} element={<Blog isFullVersion/>}/>*/}
        <Route path={'/contact'} element={<Contact/>}/>
      </Routes>
    </div>
  )
}

export default AnimatedRoutes