import ThemeProvider from '@mui/material/styles/ThemeProvider'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Nav from './components/Navbar/Navbar'
import { mainTheme } from './styles/themes/mainTheme'
import Info from './components/Info/Info'
import Copyright from './components/Copyright/Copyright'
import Menu from './components/Menu/Menu'
import styles from './components/Home/Home.module.scss'
import ScrollToTop from './components/Custom/ScrollToTop'
import './index.scss'
import AnimatedRoutes from './components/AminatedRoutes/AnimatedRoutes'
import Auth from './components/Auth/Auth'


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
        <ScrollToTop/>
        <Menu toggleNav={toggleNav} toggleInfo={toggleInfo}/>
        <Info ref={infoRef} isFixed={isFixed} isOpen={isOpenInfo} toggleInfo={toggleInfo}/>
        <section className={styles.home} ref={homeRef}>
          <AnimatedRoutes/>
        </section>
        <Nav toggleNav={toggleNav} isOpen={isOpenNav}/>
        <Auth/>
        <Copyright/>
      </ BrowserRouter>
    </ThemeProvider>
  )
}


