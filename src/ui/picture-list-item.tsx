import { PositionedPicture } from '../types'

export const PictureListItem = ({ position, dimension, url }: PositionedPicture): JSX.Element => (
  <li
    key={url}
    style={{
      backgroundImage: `url(${url})`,
      left: position.x,
      top: position.y,
      width: dimension.width,
      height: dimension.height
    }}
  />
)
