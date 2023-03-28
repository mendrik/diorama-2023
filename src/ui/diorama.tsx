import { isNil, prop } from 'ramda'
import styled from 'styled-components'
import { minImages } from '../constants'
import { useCalculate } from '../hooks/use-calculate'
import { useImageList } from '../hooks/use-image-list'
import type { Dimension, Picture, Solution } from '../types/types'
import { PictureListItem } from './picture-list-item'
import { useParentResize } from '../hooks/use-parent-resize'
import { useMemo } from 'react'

type OwnProps = {
  images: Picture[]
}

const ImageLayout = styled.ol`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transition: all 1s linear;

  > li {
    position: absolute;
    transition-property: width, left, top, height;
    transition-duration: 1s;
    background-repeat: no-repeat;
    background-size: cover;
    border: 0.5pt solid white;
  }
`

const scale = (value: Solution, dimension: Dimension, p: 'width' | 'height'): number =>
  value && value.pictures.length > minImages ? prop(p, dimension) / prop(p, value.dimension) : 1

export const Diorama = ({ images: initialImages }: OwnProps): JSX.Element => {
  const [ref, dimension] = useParentResize<HTMLOListElement>()
  const images = useImageList(initialImages)
  const { error, value } = useCalculate(images, dimension)

  const renderedList = useMemo(
    () => (
      <ImageLayout ref={ref} className="diorama-list">
        {value?.pictures.map(pic => (
          <PictureListItem
            picture={pic}
            key={pic.url}
            scaleX={scale(value, dimension, 'width')}
            scaleY={scale(value, dimension, 'height')}
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
