import { useWindowDimension } from '../hooks/useDimensions'
import { Picture } from '../types'
import { PictureListItem } from './picture-list-item'
import { useImageList } from '../hooks/useImageList'
import { useCalculate } from '../hooks/useCalculate'
import { memo } from 'react'
import { F } from 'ramda'

type OwnProps = {
  images: Picture[]
}

// eslint-disable-next-line react/prop-types
export const ImageLayout = memo<OwnProps>(({ images: initialImages }) => {
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
}, F)

// eslint-disable-next-line functional/immutable-data
ImageLayout.displayName = 'ImageLayout'
