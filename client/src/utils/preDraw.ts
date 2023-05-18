import { CanvasType } from '../components/Canvas/types'

export const preDraw = (context: CanvasRenderingContext2D, canvas: CanvasType) => {
  //context.save()
  const dimensions = getObjectFitSize(
    true,
    canvas.clientWidth,
    canvas.clientHeight,
    canvas.width,
    canvas.height
  )
  const dpr = window.devicePixelRatio || 1
  canvas.width = dimensions.width * dpr
  canvas.height = dimensions.height * dpr
}

const getObjectFitSize = (
  contains: boolean /* true = contain, false = cover */,
  containerWidth: number,
  containerHeight: number,
  width: number,
  height: number
) => {
  const doRatio = width / height
  const cRatio = containerWidth / containerHeight
  let targetWidth = 0
  let targetHeight = 0
  const test = contains ? doRatio > cRatio : doRatio < cRatio

  if (test) {
    targetWidth = containerWidth
    targetHeight = targetWidth / doRatio
  } else {
    targetHeight = containerHeight
    targetWidth = targetHeight * doRatio
  }

  return {
    width: targetWidth,
    height: targetHeight,
    x: (containerWidth - targetWidth) / 2,
    y: (containerHeight - targetHeight) / 2,
  }
}
