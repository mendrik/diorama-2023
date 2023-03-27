import { isNil, prop } from 'ramda'
import styled from 'styled-components'
import { minImages } from '../constants'
import { useCalculate } from '../hooks/use-calculate'
import { useImageList } from '../hooks/use-image-list'
import type { Picture } from '../types'
import { PictureListItem } from './picture-list-item'
import { useElementResize } from '../hooks/use-element-resize'
import { useCallback, useMemo } from 'react'

type OwnProps = {
  images: Picture[]
}

const ImageLayout = styled.ol`
  position: relative;
  overflow: hidden;
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
    border: 0.5pt solid white;
  }
`

export const Diorama = ({ images: initialImages }: OwnProps): JSX.Element => {
  const [ref, dimension] = useElementResize<HTMLOListElement>()
  const images = useImageList(initialImages)
  const { error, value } = useCalculate(images, dimension)

  const scale = useCallback(
    (p: 'width' | 'height'): number =>
      value && images.length > minImages ? prop(p, dimension) / prop(p, value.dimension) : 1,
    [value, images.length, dimension]
  )

  const renderedList = useMemo(
    () => (
      <ImageLayout ref={ref} className="diorama-list">
        {value?.pictures.map(pic => (
          <PictureListItem
            picture={pic}
            key={pic.url}
            scaleX={scale('width')}
            scaleY={scale('height')}
          />
        ))}
      </ImageLayout>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref, value]
  )

  if (!isNil(error)) {
    return <div>Failed to layout: {error.message}</div>
  }

  return renderedList
}
