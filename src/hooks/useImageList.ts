import { minImages, initialImageAmount } from './../constants'
import { Action, controlContext } from './../ui/controls'
import { useContext, useEffect, useState } from 'react'
import { Picture } from '../types'
import { take } from 'ramda'

export const useImageList = (initialImages: Picture[]): Picture[] => {
  const { subscribe } = useContext(controlContext)
  const [images, setImages] = useState(take(initialImageAmount, initialImages))
  useEffect(() => {
    const addImage = subscribe(Action.addImage, () => {
      setImages(images => take(images.length + 1, initialImages))
    })
    const removeImage = subscribe(Action.removeImage, () => {
      setImages(images => take(Math.max(images.length - 1, minImages), initialImages))
    })

    return () => {
      addImage()
      removeImage()
    }
  }, [])
  return images
}
