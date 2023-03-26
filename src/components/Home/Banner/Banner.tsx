import { Button } from '@mui/material'
import React from 'react'
import { BannerComponent } from './types'


export const Banner: BannerComponent = () => {
  return (
    <article>
      <h1>I`m Andrei Karalevich Front-end Developer</h1>
      <main>Some very important text</main>
      <Button variant="contained">Contained</Button>
    </article>
  )
}

export default Banner