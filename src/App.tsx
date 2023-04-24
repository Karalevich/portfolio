import ThemeProvider from '@mui/material/styles/ThemeProvider'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Nav from './components/Navbar/Navbar'
import { mainTheme } from './styles/themes/mainTheme'
import Info from './components/Info/Info'
import Copyright from './components/Copyright/Copyright'
import Menu from './components/Menu/Menu'
import Contact from './components/Home/Contact/Contact'
import styles from './components/Home/Home.module.scss'
import Portfolio from './components/Home/Portfolio/Portfolio'
import CV from './components/Home/CV/CV'
import Services from './components/Home/Services/Services'
import ServicePage from './components/Home/Services/ServicePage/ServicePage'



export const App: React.FC<unknown> = () => {
  const infoRef = useRef<null | HTMLElement>(null)
  const homeRef = useRef<null | HTMLElement>(null)
  const [isFixed, setIsFixed] = useState(false)
  const [isOpenNav, setIsOpenNav] = useState(false)
  const [isOpenInfo, setIsOpenInfo] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const fixedNode = infoRef.current
      const scrollNode = homeRef.current

      if (fixedNode && scrollNode) {
        const fixedNodeBottom = Math.floor(fixedNode.getBoundingClientRect().bottom)
        const fixedNodeHeight = Math.floor(fixedNode.getBoundingClientRect().height)
        const scrollNodeHeight = Math.floor(scrollNode.getBoundingClientRect().height)
        const scrollNodeTop = Math.abs(scrollNode.getBoundingClientRect().top)
        const viewportBottom = window.innerHeight


        if (scrollNodeHeight <= fixedNodeHeight) {
          setIsFixed(false)
          return
        }

        if (!isFixed && viewportBottom < fixedNodeHeight && fixedNodeBottom <= viewportBottom) {
          setIsFixed(true)
        }

        if (scrollNodeTop < fixedNode.offsetHeight - viewportBottom) {
          setIsFixed(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleNav = (open: boolean) => {
    setIsOpenNav(open)
  }
  const toggleInfo = (open: boolean) => {
    setIsOpenInfo(open)
  }


  return (
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
        <Menu toggleNav={toggleNav} toggleInfo={toggleInfo}/>
        <Info ref={infoRef} isFixed={isFixed} isOpen={isOpenInfo} toggleInfo={toggleInfo}/>
        <section className={styles.home} ref={homeRef}>
          <Routes>
            <Route path={'/'} element={<Navigate replace to='/home'/>}/>
            <Route path={'/home'} element={<Home/>}/>
            <Route path={'/services'} element={<Services/>}/>
            <Route path={'/services/:servicePage'} element={<ServicePage/>}/>
            <Route path={'/cv'} element={<CV/>}/>
            <Route path={'/portfolio'} element={<Portfolio/>}/>
            <Route path={'/blog'} element={<Home/>}/>
            <Route path={'/contact'} element={<Contact/>}/>
          </Routes>
        </section>
        <Nav toggleNav={toggleNav} isOpen={isOpenNav}/>
        <Copyright/>
      </ BrowserRouter>
    </ThemeProvider>
  )
}
