import ThemeProvider from '@mui/material/styles/ThemeProvider'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import { mainTheme } from './themes/main-theme'


export function App() {

  return (
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
        {/*<Info/>*/}
        <Routes>
          <Route path={'/'} element={<Navigate replace to='/home'/>}/>
          <Route path={'/home'} element={<Home/>}/>
        </Routes>
        {/*<Navbar/>*/}
      </ BrowserRouter>
    </ThemeProvider>
  )
}
