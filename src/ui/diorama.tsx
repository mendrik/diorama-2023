import { isNil, prop } from 'ramda'
import styled from 'styled-components'
import { minImages } from '../constants'
import { useCalculate } from '../hooks/use-calculate'
import { useImageList } from '../hooks/use-image-list'
import { Picture } from '../types'
import { PictureListItem } from './picture-list-item'
import { useElementResize } from '../hooks/use-element-resize'

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
    outline: 1px solid white;
  }
`

export const Diorama = ({ images: initialImages }: OwnProps): JSX.Element => {
  const [ref, dimension] = useElementResize<HTMLOListElement>()
  const images = useImageList(initialImages)
  const { error, value } = useCalculate(images, dimension)

  if (!isNil(error)) {
    return <div>Failed to layout: {error.message}</div>
  }

  const scale = (p: 'width' | 'height'): number =>
    value && dimension && images.length > minImages
      ? prop(p, dimension) / prop(p, value.dimension)
      : 1

  return (
    <>
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
    </>
  )
}
