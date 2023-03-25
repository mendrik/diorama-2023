import { Dimension } from '../types'
import { average } from './average'
import { normalize } from './normalize'

export const sizeVariation = (rects: Dimension[]): number => {
  const avgWidth = average(rects.map(r => r.width))
  const avgHeight = average(rects.map(r => r.height))

  const rectScores = rects.map(rect => {
    const widthCV = rect.width / avgWidth
    const heightCV = rect.height / avgHeight
    return (widthCV + heightCV) / 2
  })

  return average(normalize(rectScores))
}
