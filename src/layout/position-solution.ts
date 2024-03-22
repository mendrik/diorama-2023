import { positionPictures } from './position-pictures'
import { Composition } from './composition'
import type { Dimension, Solution } from '../types/types'
import { sizeVariation } from '../utils/size-variation'

export const positionSolution = (
  dimension: Dimension,
  score: number,
  composition: Composition
): Solution => {
  const pictures = positionPictures({ x: 0, y: 0 }, dimension, composition)
  const sizeHomogeneity = sizeVariation(pictures.map(p => p.dimension))
  return {
    dimension,
    score,
    sizeHomogeneity,
    pictures
  }
}
