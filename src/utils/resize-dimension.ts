import type { Dimension } from '../types/types.js'

export const resizeDimension = (
	dim: Dimension,
	aspectRatio: number
): Dimension => {
	const newWidth = dim.height * aspectRatio
	if (newWidth <= dim.width) {
		return { width: newWidth, height: dim.height }
	} else {
		const newHeight = dim.width / aspectRatio
		return { width: dim.width, height: newHeight }
	}
}
