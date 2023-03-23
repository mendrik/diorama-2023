import { layoutRect } from './layout-rect'
import { Composition } from './composition'
import { Dimension, PositionedPictures } from './../types.d'

export const layoutSolution = (
  targetDimension: Dimension,
  aspectRatio: number,
  composition: Composition
): PositionedPictures => ({
  aspectRatio,
  dimensionVariation: 0,
  pictures: layoutRect({ x: 0, y: 0 }, targetDimension, composition)
})
