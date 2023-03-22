import { useEffect } from 'react'
import usePromise from '../hooks/usePromise'
import { Picture } from '../types'
import { layoutImages } from '../utils/layout-images'

type OwnProps = {
  images: Picture[]
}

export const ImageLayout = ({ images }: OwnProps): JSX.Element => {
  const { execute, result } = usePromise(() => layoutImages(images))
  useEffect(() => void execute(), [])
  return <div>Images</div>
}
