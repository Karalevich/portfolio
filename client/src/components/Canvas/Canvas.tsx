import React, { useEffect, useRef } from 'react'
import styles from './Canvas.module.scss'
import { CanvasComponent, CanvasType } from './types'
import confetti from 'canvas-confetti'
import { animationConfetti } from '../../utils/animation'

let w = 0
let xpos = 0.5

export const Canvas: CanvasComponent = () => {
  const canvasRef = useRef<CanvasType>(null)

  useEffect(() => {
    const canvas: CanvasType | null = canvasRef?.current
    const resizeWindow = () => {
      w = window.innerWidth
    }
    const handleMouseMove = (e: MouseEvent) => {
      xpos = w ? e.pageX / w : xpos
    }
    resizeWindow()
    window.addEventListener('resize', resizeWindow, false)
    window.addEventListener('mousemove', handleMouseMove)

    let animationFrameId: number
    if (canvas) {
      canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true })

      const render = () => {
        animationFrameId = window.requestAnimationFrame(render)
        animationConfetti(canvas, xpos)
      }
      setTimeout(() => render(), 1000) //TODO
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeWindow, false)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <canvas className={styles.canvas} ref={canvasRef} tabIndex={0} aria-label='canvas-cofetti' />
    </>
  )
}

export default Canvas
