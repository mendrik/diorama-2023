import { isNil, prop } from 'ramda'
import { useCalculate } from '../hooks/use-calculate'
import { useImageList } from '../hooks/use-image-list'
import type { Dimension, Picture, Solution } from '../types/types'
import { PictureListItem } from './picture-list-item'
import { useParentResize } from '../hooks/use-parent-resize'
import { useMemo } from 'react'

type OwnProps = {
  images: Picture[]
}


const scale = (value: Solution, dimension: Dimension, p: 'width' | 'height'): number =>
  prop(p, dimension) / prop(p, value.dimension)

export const Diorama = ({ images: initialImages }: OwnProps): JSX.Element => {
  const [ref, dimension] = useParentResize<HTMLOListElement>()
  const images = useImageList(initialImages)
  const { error, value } = useCalculate(images, dimension)

  const renderedList = useMemo(
    () => (
      <ol ref={ref} className="diorama-list">
        {value?.pictures.map((pic, idx) => (
          <PictureListItem
            picture={pic}
            idx={idx}
            key={pic.url}
            scaleX={scale(value, dimension, 'width')}
            scaleY={scale(value, dimension, 'height')}
          />
        ))}
      </ol>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref, value]
  )

  if (!isNil(error)) {
    return <div>Failed to layout: {error.message}</div>
  }

  return renderedList
}
