import { useEffect } from 'react'
import { images } from '../constants'
import usePromise, { PromiseState } from '../hooks/usePromise'
import { loadImages } from '../utils/load-images'
import { T, cond, propEq } from 'ramda'
import { ImageLayout } from './image-layout'
import { Picture } from '../types'

type Load = PromiseState<Picture[]>
type Loaded = Extract<PromiseState<Picture[]>, { status: 'done'}>

export const App = (): JSX.Element | null => {
  const { execute, ...status } = usePromise(() => loadImages(images))

  useEffect(() => void execute(), [])

  // prettier-ignore
  return cond<[Load], JSX.Element | null>([
    [propEq('status', 'error'), () => <span>Failed to load images</span>],
    [propEq('status', 'done'), ({ result }: Loaded) => <ImageLayout images={result}/>],
    [T, () => null]
  ])(status)
}
