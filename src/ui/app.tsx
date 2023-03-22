import { useEffect } from 'react'
import { images } from '../constants'
import usePromise, { Status } from '../hooks/usePromise'
import { loadImages } from '../utils/loadImages'
import { T, cond, equals } from 'ramda'
import { ImageLayout } from './image-layout'

export const App = (): JSX.Element | null => {
  const { execute, result, status } = usePromise(() => loadImages(images))

  useEffect(() => void execute(), [])

  // prettier-ignore
  return cond<[Status], JSX.Element|null>([
    [equals<Status>('error'), () => <span>Failed to load images</span>],
    [equals<Status>('done'), () => <ImageLayout images={result!}/>],
    [T, () => null],
  ])(status,)
}
