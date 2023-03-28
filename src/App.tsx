import ThemeProvider from '@mui/material/styles/ThemeProvider'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Nav from './components/Navbar/Navbar'
import { mainTheme } from './styles/themes/main-theme'


export function App() {

  return (
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
        {/*<Info/>*/}
        <Routes>
          <Route path={'/'} element={<Navigate replace to='/home'/>}/>
          <Route path={'/home'} element={<Home/>}/>
          <Route path={'/services'} element={<Home/>}/>
          <Route path={'/cv'} element={<Home/>}/>
          <Route path={'/portfolio'} element={<Home/>}/>
          <Route path={'/blog'} element={<Home/>}/>
          <Route path={'/contact'} element={<Home/>}/>
        </Routes>
        <Nav/>
      </ BrowserRouter>
    </ThemeProvider>
  )
}
