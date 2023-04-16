import ThemeProvider from '@mui/material/styles/ThemeProvider'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Nav from './components/Navbar/Navbar'
import { mainTheme } from './styles/themes/mainTheme'
import Info from './components/Info/Info'
import Copyright from './components/Copyright/Copyright'
import Menu from './components/Menu/Menu'


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
        const firstElementBottom = Math.floor(fixedNode.getBoundingClientRect().bottom)
        const firstElementHeight = Math.floor(fixedNode.getBoundingClientRect().height)
        const viewportBottom = window.innerHeight

        if (!isFixed && viewportBottom < firstElementHeight && firstElementBottom <= viewportBottom) {
          setIsFixed(true)
        }

        if (Math.abs(scrollNode.getBoundingClientRect().top) < fixedNode.offsetHeight - viewportBottom) {
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
        <Routes>
          <Route path={'/'} element={<Navigate replace to='/home'/>}/>
          <Route path={'/home'} element={<Home ref={homeRef}/>}/>
          <Route path={'/services'} element={<Home/>}/>
          <Route path={'/cv'} element={<Home/>}/>
          <Route path={'/portfolio'} element={<Home/>}/>
          <Route path={'/blog'} element={<Home/>}/>
          <Route path={'/contact'} element={<Home/>}/>
        </Routes>
        <Nav toggleNav={toggleNav} isOpen={isOpenNav}/>
        <Copyright/>
      </ BrowserRouter>
    </ThemeProvider>
  )
}
