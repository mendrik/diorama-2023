import { layoutRect } from './layout-rect'
import { Composition } from './composition'
import { Dimension, PositionedPicture, PositionedPictures } from './../types.d'
import { reduce } from 'ramda'

export const layoutSolution = (
  targetDimension: Dimension,
  aspectRatioDelta: number,
  composition: Composition
): PositionedPictures => {
  const pictures = layoutRect({ x: 0, y: 0 }, targetDimension, composition)
  const targetSize = (targetDimension.width * targetDimension.height) / pictures.length

  const sizeHomogeneity = reduce<PositionedPicture, number>((p, c) => {
    const picSize = c.dimension.width * c.dimension.height
    return (p + Math.abs(targetSize / picSize)) / 2
  }, 0)(pictures)

  return {
    aspectRatioDelta,
    sizeHomogeneity,
    pictures
  }
}
