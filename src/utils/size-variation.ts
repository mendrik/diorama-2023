import type { Dimension } from '../types/types'

export const sizeVariation = (rects: Dimension[]): number => {
  let maxWidth = 0,
    maxHeight = 0
  let minWidth = Number.POSITIVE_INFINITY,
    minHeight = Number.POSITIVE_INFINITY

  rects.forEach(rect => {
    if (rect.width > maxWidth) maxWidth = rect.width
    if (rect.height > maxHeight) maxHeight = rect.height
    if (rect.width < minWidth) minWidth = rect.width
    if (rect.height < minHeight) minHeight = rect.height
  })

  // Avoid division by zero
  if (maxWidth === 0 || maxHeight === 0) return 0

  return (minWidth / maxWidth + minHeight / maxHeight) / 2
}
