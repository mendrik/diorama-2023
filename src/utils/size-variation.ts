import type { Dimension } from '../types/types.js'

export const sizeVariation = (rects: Dimension[]): number => {
	let minArea = Number.POSITIVE_INFINITY
	let maxArea = Number.NEGATIVE_INFINITY

	for (let i = 0; i < rects.length; i++) {
		const rect = rects[i]
		const area = rect.width * rect.height
		if (area < minArea) minArea = area
		if (area > maxArea) maxArea = area
	}

	return minArea / maxArea
}
