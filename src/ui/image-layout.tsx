import { useWindowDimension } from '../hooks/useDimensions'
import { Picture } from '../types'
import { PictureListItem } from './picture-list-item'
import { useImageList } from '../hooks/useImageList'
import { useCalculate } from '../hooks/useCalculate'
import { minImages } from '../constants'

type OwnProps = {
  images: Picture[]
}

export const ImageLayout = ({ images: initialImages }: OwnProps): JSX.Element => {
  const dimension = useWindowDimension()
  const images = useImageList(initialImages)
  const { status, error, result } = useCalculate(images, dimension)

  if (status === 'error') {
    return <div>Failed to layout: {error.message}</div>
  }

  const scaleX =
    images.length > minImages ? dimension.width / (result?.dimension.width ?? dimension.width) : 1

  const scaleY =
    images.length > minImages
      ? dimension.height / (result?.dimension.height ?? dimension.height)
      : 1

  return (
    <ul className="image-gallery">
      {result?.pictures.map(pic => (
        <PictureListItem picture={pic} key={pic.url} scaleX={scaleX} scaleY={scaleY} />
      ))}
    </ul>
  )
}
