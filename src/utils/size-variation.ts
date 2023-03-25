import { Dimension } from '../types'
import { average } from './average'
import { normalize } from './normalize'

interface ImageSize {
  width: number
  height: number
}

export const sizeVariation = (rects: Dimension[]): number => {
  const avgWidth = average(rects.map(r => r.width))
  const avgHeight = average(rects.map(r => r.height))

  const pictureScores = rects.map(rect => {
    const widthCV = rect.width / avgWidth
    const heightCV = rect.height / avgHeight
    return (widthCV + heightCV) / 2
  })

  return average(normalize(pictureScores))
}
