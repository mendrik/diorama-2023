import { useEffect } from 'react'
import { images } from '../constants'
import usePromise from '../hooks/usePromise'
import { loadImages } from '../utils/loadImages'
import { T, cond, equals } from 'ramda'
import { ImageLayout } from './image-layout'

export const App = (): JSX.Element | null => {
  const { execute, result, status } = usePromise(() => loadImages(images))

  useEffect(() => void execute(), [])

  // prettier-ignore
  return cond<[string], JSX.Element|null>([
    [equals('error'), () => <span>Failed to load images</span>],
    [equals('done'), () => <ImageLayout images={result}/>],
    [T, () => null],
  ])(status)
}
