import { useEffect } from 'react'
import { images } from '../constants'
import usePromise, { PromiseState } from '../hooks/usePromise'
import { loadImages } from '../utils/load-images'
import { T, cond, propEq } from 'ramda'
import { ImageLayout } from './image-layout'
import { Picture } from '../types'

export const App = (): JSX.Element | null => {
  const { execute, ...status } = usePromise(() => loadImages(images))

  useEffect(() => void execute(), [])

  // prettier-ignore
  return cond<[PromiseState<Picture[]>], JSX.Element | null>([
    [propEq('status', 'error'), () => <span>Failed to load images</span>],
    [s => s.status === 'done', ({ result }) => <ImageLayout images={result!}/>],
    [T, () => null],
  ])(status)
}
