import { Dimension } from '../types'
import { average } from './average'

interface ImageSize {
  width: number
  height: number
}

export const sizeVariation = (rects: Dimension[]): number => {
  const totalCV = rects.reduce((acc, image) => {
    const widthCV = image.width / average(rects.map(r => r.width))
    const heightCV = image.height / average(rects.map(r => r.height))
    const cv = (widthCV + heightCV) / 2
    return acc + cv
  }, 0)

  const avgCV = totalCV / rects.length
  return avgCV
}
