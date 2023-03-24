import usePromise from '../hooks/usePromise'
import { Picture, Solution } from '../types'
import { layoutImages } from '../layout/layout-images'
import { maxComputationTime } from '../constants'
import { useWindowDimension } from '../hooks/useDimensions'
import { useEffect, useState } from 'react'

type OwnProps = {
  images: Picture[]
}

export const ImageLayout = ({ images }: OwnProps): JSX.Element | null => {
  const dimension = useWindowDimension()
  const [solution, setSolution] = useState<Solution>()
  const { execute, result, status, error } = usePromise(() =>
    layoutImages(maxComputationTime, dimension, images)
  )

  useEffect(() => {
    if (status !== 'loading') {
      execute()
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
            backgroundImage: `url(${picture.url})`,
            top: `${picture.position.y|0}px`,
            left: `${picture.position.x|0}px`,
            width: `${picture.dimension.width|0}px`,
            height: `${picture.dimension.height|0}px`
          }}
        />
      ))}
    </ul>
  )
}
