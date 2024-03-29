import { positionPictures } from './position-pictures'
import type { Dimension, Rect, Solution } from '../types/types'
import { sizeVariation } from '../utils/size-variation'

export const sizeSolution = (
  dimension: Dimension,
  score: number,
  flipScore: number,
  composition: Rect
): Solution => {
  const pictures = positionPictures({ x: 0, y: 0 }, dimension, composition)
  const sizeHomogeneity = sizeVariation(pictures.map(p => p.dimension))

  return {
    dimension,
    score,
    sizeHomogeneity,
    pictures,
    flipScore
  }
}
