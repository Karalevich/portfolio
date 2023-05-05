import React, { useEffect, useRef } from 'react'
import { preDraw } from 'src/utils/preDraw'
import styles from './Canvas.module.scss'
import { CanvasComponent, CanvasType } from './types'
import { Confetti } from './Confetti'

const NUM_CONFETTI = 250
let w = 0
let h = 0
let xpos = 0.5


export const Canvas: CanvasComponent = () => {
  const canvasRef = useRef<CanvasType>(null)


  useEffect(() => {
    const canvas: CanvasType | null = canvasRef?.current
    const resizeWindow = () => {
      if (canvas) {
        w = canvas.width = window.innerWidth
        h = canvas.height = window.innerHeight
      }
    }
    window.addEventListener('resize', resizeWindow, false)
    window.addEventListener('mousemove', (e: MouseEvent) => {
      xpos = e.pageX / w
    })

    let animationFrameId: number
    if (canvas) {
      const originalHeight = canvas.height
      const originalWidth = canvas.width
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      const ratio = Math.min(canvas.clientWidth / originalWidth, canvas.clientHeight / originalHeight)


      window.onload = () => setTimeout(resizeWindow, 0)
      const confetti = new Array(NUM_CONFETTI).fill(0).map(() => new Confetti(context, xpos, w, h))

      const render = () => {
        animationFrameId = window.requestAnimationFrame(render)
        preDraw(context, canvas)
        context.scale(ratio, ratio)
        context.clearRect(0, 0, w, h)
        confetti.forEach((c) => c.draw(xpos, w, h))

      }
      render()
    }
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeWindow, false)
      window.removeEventListener('mousemove', (e: MouseEvent) => {
        xpos = e.pageX / w
      })
    }

  }, [])


  return (
    <>
      <canvas className={styles.canvas} ref={canvasRef} tabIndex={0}/>
    </>
  )
}

export default Canvas




