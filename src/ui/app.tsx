import { useEffect } from 'react'
import { images } from '../constants'
import usePromise, { PromiseState } from '../hooks/usePromise'
import { loadImages } from '../utils/load-images'
import { T, cond, propEq } from 'ramda'
import { ImageLayout } from './image-layout'
import { Picture } from '../types'

type Load = PromiseState<Picture[]>

export const App = (): JSX.Element | null => {
  const { execute, ...status } = usePromise(() => loadImages(images))

  useEffect(() => void execute(), [])

  if (propEq<Load>('status', 'error')(status)) {
    status.error
  }

  // prettier-ignore
  return cond<[Load], JSX.Element | null>([
    [propEq<Load>('status', 'error'), () => <span>Failed to load images</span>],
    [propEq<Load>('status', 'done'), ({ result }) => <ImageLayout images={result!}/>],
    [T, () => null],
  ])(status)
}
