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
  // Calculate dimensions and positions for recursive calls more directly.
  if (rect.horizontal) {
    const lengthHorizontal = dimension.height * rect.first.aspectRatio
    return [
      ...positionPictures(
        position,
        { width: lengthHorizontal, height: dimension.height },
        rect.first
      ),
      ...positionPictures(
        { x: position.x + lengthHorizontal, y: position.y },
        { width: dimension.width - lengthHorizontal, height: dimension.height },
        rect.second
      )
    ]
  } else {
    const lengthVertical = dimension.width / rect.first.aspectRatio
    return [
      ...positionPictures(position, { width: dimension.width, height: lengthVertical }, rect.first),
      ...positionPictures(
        { x: position.x, y: position.y + lengthVertical },
        { width: dimension.width, height: dimension.height - lengthVertical },
        rect.second
      )
    ]
  }
}
