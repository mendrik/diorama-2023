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
    const rightPosition = { x: position.x + lengthHorizontal, y: position.y }
    const leftDim = { width: lengthHorizontal, height: dimension.height }
    const rightDim = { width: dimension.width - lengthHorizontal, height: dimension.height }

    return positionPictures(position, leftDim, rect.first).concat(
      positionPictures(rightPosition, rightDim, rect.second)
    )
  } else {
    const lengthVertical = dimension.width / rect.first.aspectRatio
    const bottomPosition = { x: position.x, y: position.y + lengthVertical }
    const topDim = { width: dimension.width, height: lengthVertical }
    const bottomDim = { width: dimension.width, height: dimension.height - lengthVertical }

    return positionPictures(position, topDim, rect.first).concat(
      positionPictures(bottomPosition, bottomDim, rect.second)
    )
  }
}
