import { positionPictures } from './position-pictures'
import { Composition } from './composition'
import { Dimension, Solution } from '../types'
import { sizeVariation } from '../utils/size-variation'

export const positionSolution = (
  dimension: Dimension,
  aspectRatioDelta: number,
  composition: Composition
): Solution => {
  const pictures = positionPictures({ x: 0, y: 0 }, dimension, composition)
  const sizeHomogeneity = sizeVariation(pictures.map(p => p.dimension))
  return {
    dimension,
    aspectRatioDelta,
    sizeHomogeneity,
    pictures
  }
}
