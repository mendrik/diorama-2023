import { useEffect } from 'react'
import { images } from '../constants'
import usePromise from '../hooks/usePromise'
import { loadImages } from '../utils/loadImages'

export const App = (): JSX.Element => {
  const { execute, result, status } = usePromise(() => loadImages(images))

  useEffect(() => void execute(), [])

  return <ul>Images go here</ul>
}
