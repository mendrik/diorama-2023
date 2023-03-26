import { prop } from 'ramda'
import { useRef } from 'react'
import styled from 'styled-components'
import { minImages } from '../constants'
import { useCalculate } from '../hooks/use-calculate'
import { useElementResize } from '../hooks/use-element-resize'
import { useImageList } from '../hooks/use-image-list'
import { Picture } from '../types'
import { PictureListItem } from './picture-list-item'

type OwnProps = {
  images: Picture[]
}

const ImageLayout = styled.ol`
  position: relative;
  width: 100vw;
  height: 100vh;
  transition: all 1s linear;
  transform: scale(var(--scaleX), var(--scaleY));
  transform-origin: 0 0;

  > li {
    position: absolute;
    transition-property: width, left, top, height;
    transition-duration: 1s;
    background-repeat: no-repeat;
    background-size: cover;
    outline: 1px solid white;
  }
`

export const Diorama = ({ images: initialImages }: OwnProps): JSX.Element => {
  const ref = useRef<HTMLOListElement>(null)
  const dimension = useElementResize(ref)

  const images = useImageList(initialImages)
  const { status, error, result } = useCalculate(images, dimension)

  if (status === 'error') {
    return <div>Failed to layout: {error.message}</div>
  }

  const scale = (p: 'width' | 'height'): number =>
    dimension && images.length > minImages && result
      ? prop(p, dimension) / prop(p, result.dimension)
      : 1

  return (
    <ImageLayout ref={ref}>
      {result?.pictures.map(pic => (
        <PictureListItem
          picture={pic}
          key={pic.url}
          scaleX={scale('width')}
          scaleY={scale('height')}
        />
      ))}
    </ImageLayout>
  )
}
