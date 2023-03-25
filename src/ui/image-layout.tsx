import { useWindowDimension } from '../hooks/useDimensions'
import { Picture } from '../types'
import { PictureListItem } from './picture-list-item'
import { useImageList } from '../hooks/useImageList'
import { useCalculate } from '../hooks/useCalculate'

type OwnProps = {
  images: Picture[]
}

// eslint-disable-next-line react/prop-types
export const ImageLayout = ({ images: initialImages }: OwnProps): JSX.Element => {
  const dimension = useWindowDimension()
  const images = useImageList(initialImages)
  const { status, error, result } = useCalculate(images, dimension)

  if (status === 'error') {
    return <div>Failed to layout: {error.message}</div>
  }

  return (
    <ul className="image-gallery">
      {result?.pictures.map(pic => (
        <PictureListItem picture={pic} key={pic.url} />
      ))}
    </ul>
  )
}
