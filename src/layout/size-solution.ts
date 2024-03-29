import { positionPictures } from './position-pictures'
import type { Dimension, Rect, Solution } from '../types/types'
import { sizeVariation } from '../utils/size-variation'
import { flipCount as horizontalFlips } from '../utils/flip-count'

export const sizeSolution = (dimension: Dimension, score: number, composition: Rect): Solution => {
  const pictures = positionPictures({ x: 0, y: 0 }, dimension, composition)
  const sizeHomogeneity = sizeVariation(pictures.map(p => p.dimension))

  const flipCount = horizontalFlips(composition)
  const half = (pictures.length - 1) / 2.0
  const flipScore = Math.max(1 - Math.abs(half - flipCount) / half, 0)

  return {
    dimension,
    score,
    sizeHomogeneity,
    pictures,
    flipScore
  }
}
