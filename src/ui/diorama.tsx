import { invoker, pick, pipe, prop } from 'ramda'
import type { Dimension, Solution } from '../types/types'
import { PictureListItem } from './picture-list-item'
import { useUnit } from 'effector-react'
import { $solution, $targetDimension, dimensionChanged, loadImageSet } from '../state/store'
import { useEffect, useRef } from 'react'
import { debounce } from '../utils/debounce'
import { ImageSet } from '../constants'

const scale = (value: Solution, dimension: Dimension, p: 'width' | 'height'): number =>
  prop(p, dimension) / prop(p, value.dimension)

const updateDimensionsOf = debounce(
  100,
  pipe(invoker(0, 'getBoundingClientRect'), pick(['width', 'height']) as any, dimensionChanged)
)

export const Diorama = () => {
  const ref = useRef(null)
  const [solution, dimension] = useUnit([$solution, $targetDimension])

  useEffect(() => {
    const el = document.getElementById('diorama-list')!
    const ob = new ResizeObserver(() => updateDimensionsOf(el))
    ob.observe(el)
    updateDimensionsOf(el)
    void loadImageSet(ImageSet.animals)
  }, [])

  return (
    <ol id="diorama-list" ref={ref}>
      {solution?.pictures.map((pic, idx) => (
        <PictureListItem
          picture={pic}
          idx={idx}
          key={pic.url}
          scaleX={scale(solution, dimension, 'width')}
          scaleY={scale(solution, dimension, 'height')}
        />
      ))}
    </ol>
  )
}
