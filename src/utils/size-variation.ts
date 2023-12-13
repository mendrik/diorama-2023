import type { Dimension } from '../types/types'

export const sizeVariation = (rects: Dimension[]): number => {
  const maxWidth = Math.max(...rects.map(r => r.width))
  const maxHeight = Math.max(...rects.map(r => r.height))
  const minWidth = Math.min(...rects.map(r => r.width))
  const minHeight = Math.min(...rects.map(r => r.height))
  return (minWidth / maxWidth + minHeight / maxHeight) / 2
}
