import type { PositionedPicture } from '../types/types'

type OwnProps = {
  picture: PositionedPicture
  scaleX: number
  scaleY: number
  idx: number
}

export const PictureListItem = ({
  picture: { position, dimension, url },
  scaleX,
  scaleY,
  idx
}: OwnProps): JSX.Element => {
  const aspectRatio = dimension.width / dimension.height
  return (
    <li
      className={'photo-frame'}
      style={{
        left: position.x * scaleX,
        top: position.y * scaleY,
        width: dimension.width * scaleX,
        height: dimension.height * scaleY,
      }}
    >
      <img className="photo" src={url} alt="" style={{
        aspectRatio
      }}/>
    </li>
  )
}
