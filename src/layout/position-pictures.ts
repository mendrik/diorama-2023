import { concat } from 'ramda'
import type { Dimension, Picture, Position, PositionedPicture, Rect } from '../types/types'

const isPicture = (rect: Rect): rect is Picture => 'url' in rect

export const positionPictures = (
  position: Position,
  dimension: Dimension,
  rect: Rect
): PositionedPicture[] => {
  if (isPicture(rect)) {
    return [{ position, dimension, url: rect.url }]
  }

  const lengthHorizontal = dimension.height * rect.first.aspectRatio
  const lengthVertical = dimension.width / rect.first.aspectRatio

  const length = rect.horizontal ? lengthHorizontal : lengthVertical

  const positionHorizontal = { x: position.x + length, y: position.y }
  const positionVertical = { x: position.x, y: position.y + length }

  const dimensionHorizontal = { width: length, height: dimension.height }
  const dimensionVertical = { width: dimension.width, height: length }

  const remainingWidth = dimension.width - length
  const remainingHeight = dimension.height - length
  const dimension2Horizontal = { width: remainingWidth, height: dimension.height }
  const dimension2Vertical = { width: dimension.width, height: remainingHeight }

  const position2 = rect.horizontal ? positionHorizontal : positionVertical
  const dimension1 = rect.horizontal ? dimensionHorizontal : dimensionVertical
  const dimension2 = rect.horizontal ? dimension2Horizontal : dimension2Vertical

  return concat(
    positionPictures(position, dimension1, rect.first),
    positionPictures(position2, dimension2, rect.second)
  )
}
