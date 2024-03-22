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
  if (rect.horizontal) {
    const lengthHorizontal = dimension.height * rect.first.aspectRatio
    const positionHorizontal = { x: position.x + lengthHorizontal, y: position.y }
    const dimensionHorizontal = { width: lengthHorizontal, height: dimension.height }
    const remainingWidth = dimension.width - lengthHorizontal
    const dimension2Horizontal = { width: remainingWidth, height: dimension.height }

    return concat(
      positionPictures(position, dimensionHorizontal, rect.first),
      positionPictures(positionHorizontal, dimension2Horizontal, rect.second)
    )
  } else {
    const lengthVertical = dimension.width / rect.first.aspectRatio
    const positionVertical = { x: position.x, y: position.y + lengthVertical }
    const dimensionVertical = { width: dimension.width, height: lengthVertical }
    const remainingHeight = dimension.height - lengthVertical
    const dimension2Vertical = { width: dimension.width, height: remainingHeight }

    return concat(
      positionPictures(position, dimensionVertical, rect.first),
      positionPictures(positionVertical, dimension2Vertical, rect.second)
    )
  }

}
