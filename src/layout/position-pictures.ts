import { concat } from 'ramda'
import type { Dimension, Picture, Position, PositionedPicture, Rect } from '../types'

const isPicture = (rect: Rect): rect is Picture => 'url' in rect

export const positionPictures = (
  position: Position,
  dimension: Dimension,
  rect: Rect
): PositionedPicture[] => {
  if (isPicture(rect)) {
    return [{ position, dimension, url: rect.url }]
  }

  const length: number = rect.horizontal
    ? dimension.height * rect.first.aspectRatio
    : dimension.width / rect.first.aspectRatio

  const position2: Position = rect.horizontal
    ? { x: position.x + length, y: position.y }
    : { x: position.x, y: position.y + length }

  const dimension1: Dimension = rect.horizontal
    ? { width: length, height: dimension.height }
    : { width: dimension.width, height: length }

  const dimension2: Dimension = rect.horizontal
    ? { width: Math.abs(dimension.width - length), height: dimension.height }
    : { width: dimension.width, height: Math.abs(dimension.height - length) }

  return concat(
    positionPictures(position, dimension1, rect.first),
    positionPictures(position2, dimension2, rect.second)
  )
}
