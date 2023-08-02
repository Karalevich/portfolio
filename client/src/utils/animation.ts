import { COLORS } from '../constants/settings'
import { range } from './range'
import { CanvasType } from '../components/Canvas/types'

export const animationConfetti = (canvas: CanvasType, xpos: number) => {
  let leftX = 0
  let rightX = 1
  if (xpos >= 0.5) {
    leftX = Number((-0.6 * xpos + 0.3).toFixed(2))
  } else {
    rightX = Number((rightX + (0.3 - 0.6 * xpos)).toFixed(2))
  }

  canvas.confetti({
    particleCount: 1,
    colors: [COLORS[~~range(0, COLORS.length)]],
    spread: 90,
    startVelocity: 1,
    gravity: 0.9,
    drift: (xpos - 0.5) * 4,
    origin: { y: -0.01, x: range(leftX, rightX) },
  })
}
