import { minImages, initialImageAmount } from './../constants'
import { Action, controlContext } from './../ui/controls'
import { useContext, useEffect, useState } from 'react'
import { Picture } from '../types'
import { take } from 'ramda'

export const useImageList = (initialImages: Picture[]): Picture[] => {
  const { subscribe } = useContext(controlContext)
  const [images, setImages] = useState(take(initialImageAmount, initialImages))
  useEffect(() => {
    const addImage = subscribe(Action.addImage, () =>
      setImages(images => initialImages.slice(0, images.length + 1))
    )
    const removeImage = subscribe(Action.removeImage, () =>
      setImages(images => initialImages.slice(0, Math.max(images.length - 1, minImages)))
    )
    return () => {
      addImage()
      removeImage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return images
}
