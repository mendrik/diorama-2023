import usePromise from '../hooks/usePromise'
import { Picture, PositionedPictures } from '../types'
import { layoutImages } from '../layout/layout-images'
import { maxComputationTime } from '../constants'
import { useWindowDimension } from '../hooks/useDimensions'
import { useEffect, useState } from 'react'

type OwnProps = {
  images: Picture[]
}

export const ImageLayout = ({ images }: OwnProps): JSX.Element | null => {
  const dimension = useWindowDimension()
  const [solution, setSolution] = useState<PositionedPictures>()
  const { execute, result, status, error } = usePromise(() =>
    layoutImages(maxComputationTime, dimension, images)
  )

  useEffect(() => {
    console.log(dimension.width, dimension.height)
    if (status !== 'loading') {
      void execute()
    }
  }, [dimension.width, dimension.height])

  useEffect(() => {
    if (result != null) {
      setSolution(result)
    }
  }, [result])

  if (status === 'error') {
    return <div>Failed to layout: {error.message}</div>
  }

  return (
    <ul className="image-gallery">
      {solution?.pictures.map(picture => (
        <li
          key={picture.url}
          style={{
            background: `url(${picture.url}) no-repeat cover`,
            top: `${picture.position.y}px`,
            left: `${picture.position.x}px`,
            width: `${picture.dimension.width}px`,
            height: `${picture.dimension.height}px`
          }}
        />
      ))}
    </ul>
  )
}
