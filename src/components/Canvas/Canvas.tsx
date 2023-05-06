import React, { useEffect, useRef } from 'react'
import styles from './Canvas.module.scss'
import { CanvasComponent, CanvasType } from './types'
import confetti from 'canvas-confetti'
import { animationConfetti } from './animation'

let w = 0
let xpos = 0.5

export const Canvas: CanvasComponent = () => {
  const canvasRef = useRef<CanvasType>(null)


  useEffect(() => {
    const canvas: CanvasType | null = canvasRef?.current
    const resizeWindow = () => {
      if (canvas) {
        w = window.innerWidth
      }
    }
    window.addEventListener('resize', resizeWindow, false)
    window.addEventListener('mousemove', (e: MouseEvent) => {
      xpos = e.pageX / w
    })

    let animationFrameId: number
    if (canvas) {
      canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true })

      window.onload = () => setTimeout(resizeWindow, 0)

      const render = () => {
        animationFrameId = window.requestAnimationFrame(render)
        animationConfetti(canvas, xpos)

      }
      setTimeout(() => render(), 1000)

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
