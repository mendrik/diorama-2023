import { Composition } from '../layout/composition'
import { reduce } from 'ramda'
import { isPicture, Rect } from '../types/types'

// eslint-disable-next-line no-restricted-syntax
function* traverse(node: Rect): Generator<Composition> {
  if (!isPicture(node)) {
    yield* traverse(node.first)
    yield node
    yield* traverse(node.second)
  }
}

export const flipCount = (root: Rect, pictures: number) => {
  const flipCount = reduce(
    (acc: number, node: Composition) => (node.horizontal ? acc + 1 : acc),
    0,
    [...traverse(root)]
  )
  const half = (pictures - 1) / 2.0
  return Math.max(1 - Math.abs(half - flipCount) / half, 0)
}
