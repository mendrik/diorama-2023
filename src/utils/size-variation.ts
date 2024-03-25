import type { Dimension } from '../types/types'

export const sizeVariation = (rects: Dimension[], maxDim: Dimension): number => {
  let minWidth = Number.POSITIVE_INFINITY,
    minHeight = Number.POSITIVE_INFINITY

  for (let i = 0; i < rects.length; i++) {
    const rect = rects[i]
    if (rect.width < minWidth) minWidth = rect.width
    if (rect.height < minHeight) minHeight = rect.height
  }

  return (minWidth / maxDim.width) * (minHeight / maxDim.height)
}
