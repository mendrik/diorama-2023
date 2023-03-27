import { initialImageAmount } from '../constants'
import { Action, controlContext } from '../ui/controls'
import { useContext, useState } from 'react'
import { Picture } from '../types'
import { inc, pipe, take, length, flip, curry, dec, max } from 'ramda'
import { useEffectOnce } from 'react-use'

const takeF = curry(flip(take))

export const useImageList = (initialImages: Picture[]): Picture[] => {
  const { subscribe } = useContext(controlContext)
  const [images, setImages] = useState(take(initialImageAmount, initialImages))
  useEffectOnce(() => {
    console.log('imagelist')

    const addImage = subscribe(Action.addImage, () =>
      setImages(pipe(length, inc, takeF(initialImages)))
    )
    const removeImage = subscribe(Action.removeImage, () =>
      setImages(pipe(length, dec, max<number>(1), takeF(initialImages)))
    )
    return () => {
      addImage()
      removeImage()
    }
  })
  return images
}
