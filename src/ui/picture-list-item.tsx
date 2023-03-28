import type { PositionedPicture } from '../types/types'

type OwnProps = {
  picture: PositionedPicture
  scaleX: number
  scaleY: number
}

export const PictureListItem = ({
  picture: { position, dimension, url },
  scaleX,
  scaleY
}: OwnProps): JSX.Element => (
  <li
    style={{
      backgroundImage: `url(${url})`,
      left: position.x * scaleX,
      top: position.y * scaleY,
      width: dimension.width * scaleX,
      height: dimension.height * scaleY
    }}
  />
)
