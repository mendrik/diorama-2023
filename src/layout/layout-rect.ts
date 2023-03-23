import { concat } from 'ramda'
import { Dimension, Picture, Position, PositionedPicture, Rect } from '../types'

const isPicture = (rect: Rect): rect is Picture => 'url' in rect

export const layoutRect = (
  position: Position,
  dimension: Dimension,
  rect: Rect
): PositionedPicture[] => {
  if (isPicture(rect)) {
    return [{ dimension, position, url: rect.url }]
  }
  const length = rect.horizontal
    ? dimension.width / rect.aspectRatio
    : dimension.height * rect.aspectRatio

  const position2: Position = rect.horizontal
    ? { x: position.x + length, y: position.y }
    : { x: position.x, y: position.y + length }

  const dimension1: Dimension = rect.horizontal
    ? { width: length, height: dimension.height }
    : { width: dimension.width, height: length }

  const dimension2: Dimension = rect.horizontal
    ? { width: dimension.width - length, height: dimension.height }
    : { width: dimension.width, height: dimension.height - length }

  return concat(
    layoutRect(position, dimension1, rect.first),
    layoutRect(position2, dimension2, rect.second)
  )
}
