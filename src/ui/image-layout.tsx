import { useWindowDimension } from '../hooks/useDimensions'
import { Picture } from '../types'
import { PictureListItem } from './picture-list-item'
import { useImageList } from '../hooks/useImageList'
import { useCalculate } from '../hooks/useCalculate'

type OwnProps = {
  images: Picture[]
}

export const ImageLayout = ({ images: initialImages }: OwnProps): JSX.Element | null => {
  const dimension = useWindowDimension()
  const images = useImageList(initialImages)
  const { status, error, result } = useCalculate(images, dimension)

  if (status === 'error') {
    return <div>Failed to layout: {error.message}</div>
  }

  return (
    <ul className="image-gallery">
      {result?.pictures.map((pic, idx) => (
        <PictureListItem picture={pic} key={idx} />
      ))}
    </ul>
  )
}
