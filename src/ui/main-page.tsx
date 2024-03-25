/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX, useContext, useState } from 'react'
import { Diorama } from './diorama'
import { useAsync, useEffectOnce } from 'react-use'
import { ImageSet } from '../constants'
import { loadImages } from '../utils/load-images'
import { Action, controlContext } from './controls'

export const MainPage = (): JSX.Element | null => {
  const { subscribe } = useContext(controlContext)
  const [imageset, setImageset] = useState<ImageSet>(ImageSet.animals)
  const { value: images } = useAsync(() => loadImages(imageset), [imageset])

  useEffectOnce(() => {
    subscribe(Action.switchMode, setImageset as any)
  })

  console.log(images)

  return images ? <Diorama images={images} /> : null
}
