import { useEffect, useContext, useState } from 'react'
import { initialImageAmount, maxComputationTime, minImages } from '../constants'
import { useWindowDimension } from '../hooks/useDimensions'
import usePromise from '../hooks/usePromise'
import { findSolution } from '../layout/find-solution'
import { Picture } from '../types'
import { Action, controlContext } from './controls'
import { take } from 'ramda'
import { PictureListItem } from './picture-list-item'

type OwnProps = {
  images: Picture[]
}

export const ImageLayout = ({ images: initialImages }: OwnProps): JSX.Element | null => {
  const { subscribe } = useContext(controlContext)
  const [images, setImages] = useState(take(initialImageAmount, initialImages))
  const dimension = useWindowDimension()

  const { execute, result, status, error } = usePromise(() =>
    findSolution(maxComputationTime, dimension, images)
  )

  useEffect(() => void execute(), [images.length, dimension.height, dimension.width])

  useEffect(() => {
    const addImage = subscribe(Action.addImage, () => {
      setImages(images => take(images.length + 1, initialImages))
    })
    const removeImage = subscribe(Action.removeImage, () => {
      setImages(images => take(Math.max(images.length - 1, minImages), initialImages))
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

  return <ul className="image-gallery">{result?.pictures.map(PictureListItem)}</ul>
}
