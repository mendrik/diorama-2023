import type { Dimension } from '../types'
import { average } from './average'

export const sizeVariation = (rects: Dimension[]): number => {
  const maxWidth = Math.max(...rects.map(r => r.width))
  const maxHeight = Math.max(...rects.map(r => r.height))
  const minWidth = Math.min(...rects.map(r => r.width))
  const minHeight = Math.min(...rects.map(r => r.height))
  return average([minWidth / maxWidth, minHeight / maxHeight])
}
