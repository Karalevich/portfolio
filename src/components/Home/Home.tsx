import { HomeComponent } from './types'
import Banner from './Banner/Banner'
import React from 'react'
import Services from './Services/Services'
import Recommendations from './Recommendations/Recommendations'
import Portfolio from './Portfolio/Portfolio'
import Blog from './Blog/Blog'
import Contact from './Contact/Contact'
import CV from './CV/CV'
import Price from './Price/Price'

export const Home: HomeComponent = () => {
  return (
    <>
      <Banner />
      <Services />
      <Price />
      <Recommendations />
      <CV />
      <Portfolio />
      <Blog isFullVersion={false} />
      <Contact />
    </>
  )
}

export default Home
