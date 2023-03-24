import { useEffect } from 'react'
import { maxComputationTime } from '../constants'
import { useWindowDimension } from '../hooks/useDimensions'
import usePromise from '../hooks/usePromise'
import { layoutImages } from '../layout/layout-images'
import { Picture } from '../types'

type OwnProps = {
  images: Picture[]
}

export const ImageLayout = ({ images }: OwnProps): JSX.Element | null => {
  const dimension = useWindowDimension()

  const {
    execute,
    result: solution,
    status,
    error
  } = usePromise(() => layoutImages(maxComputationTime, dimension, images))

  useEffect(() => void execute(), [dimension.height, dimension.width])

  if (status === 'error') {
    return <div>Failed to layout: {error.message}</div>
  }

  return (
    <ul className="image-gallery">
      {solution?.pictures.map(picture => (
        <li
          key={picture.url}
          style={{
            backgroundImage: `url(${picture.url})`,
            transform: `translate(${picture.position.x.toFixed(2)}px, ${picture.position.y.toFixed(
              2
            )}px)`,
            width: `${picture.dimension.width.toFixed(2)}px`,
            height: `${picture.dimension.height.toFixed(2)}px`
          }}
        />
      ))}
    </ul>
  )
}
