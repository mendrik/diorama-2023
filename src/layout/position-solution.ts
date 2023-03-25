import { positionPictures } from './position-pictures'
import { Composition } from './composition'
import { Dimension, Solution } from '../types'
import { sizeVariation } from '../utils/size-variation'

export const positionSolution = (
  targetDimension: Dimension,
  aspectRatioDelta: number,
  composition: Composition
): Solution => {
  const pictures = positionPictures({ x: 0, y: 0 }, targetDimension, composition)
  const sizeHomogeneity = sizeVariation(pictures.map(p => p.dimension))

  console.log(sizeHomogeneity)

  return {
    aspectRatioDelta,
    sizeHomogeneity,
    pictures
  }
}
