import { PositionedPicture } from '../types'

type OwnProps = {
  picture: PositionedPicture
}

export const PictureListItem = ({
  picture: { position, dimension, url }
}: OwnProps): JSX.Element => (
  <li
    style={{
      backgroundImage: `url(${url})`,
      left: position.x,
      top: position.y,
      width: dimension.width,
      height: dimension.height
    }}
  />
)
