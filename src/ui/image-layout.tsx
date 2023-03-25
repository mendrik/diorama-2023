import { useEffect, useContext, useState } from 'react'
import { maxComputationTime } from '../constants'
import { useWindowDimension } from '../hooks/useDimensions'
import usePromise from '../hooks/usePromise'
import { findSolution } from '../layout/find-solution'
import { Picture } from '../types'
import { Action, controlContext } from './controls'
import { take } from 'ramda'

type OwnProps = {
  images: Picture[]
}

export const ImageLayout = ({ images: initialImages }: OwnProps): JSX.Element | null => {
  const { subscribe } = useContext(controlContext)
  const [images, setImages] = useState(take(7, initialImages))

  const dimension = useWindowDimension()

  const { execute, result, status, error } = usePromise(() =>
    findSolution(maxComputationTime, dimension, images)
  )

  useEffect(() => void execute(), [dimension.height, dimension.width])

  useEffect(() => {
    const addImage = subscribe(Action.addImage, () => {
      console.log('addimage')
      setImages(images => take(images.length, initialImages))
    })
    const removeImage = subscribe(Action.removeImage, () => {
      setImages(images => take(images.length - 2, initialImages))
    })
    const refresh = subscribe(Action.refresh, execute)

    return () => {
      addImage()
      removeImage()
      refresh()
    }
  }, [initialImages])

  if (status === 'error') {
    return <div>Failed to layout: {error.message}</div>
  }

  return (
    <ul className="image-gallery">
      {result?.pictures.map(picture => (
        <li
          key={picture.url}
          style={{
            backgroundImage: `url(${picture.url})`,
            left: picture.position.x,
            top: picture.position.y,
            width: picture.dimension.width,
            height: picture.dimension.height
          }}
        />
      ))}
    </ul>
  )
}
