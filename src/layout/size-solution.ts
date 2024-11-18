import type { Dimension, Rect, Solution } from '../types/types'
import { sizeVariation } from '../utils/size-variation'
import { positionPictures } from './position-pictures'

export const sizeSolution = (
	dimension: Dimension,
	score: number,
	composition: Rect
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
