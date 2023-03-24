import { layoutRect } from './layout-rect'
import { Composition } from './composition'
import { Dimension, Solution } from './../types.d'

export const layoutSolution = (
  targetDimension: Dimension,
  aspectRatioDelta: number,
  composition: Composition
): Solution => {
  const pictures = layoutRect({ x: 0, y: 0 }, targetDimension, composition)
  const targetSize = (targetDimension.width * targetDimension.height) / pictures.length

  const minPicture = Math.min(...pictures.map(s => s.dimension.width * s.dimension.height))
  const maxPicture = Math.max(...pictures.map(s => s.dimension.width * s.dimension.height))

  const sizeHomogeneity =
    Math.abs(1 - minPicture / targetSize) + Math.abs(1 - maxPicture / targetSize) / 2

  return {
    aspectRatioDelta,
    sizeHomogeneity,
    pictures
  }
}
