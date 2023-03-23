import { randomInt } from '../utils/random'
import { append, head, pipe, remove } from 'ramda'
import { Rect } from '../types'
import { Composition } from './composition'

const combine = (first: Rect, second: Rect): Composition =>
  new Composition(Boolean(randomInt(0, 1)), first, second)

export const toTree = (compositions: Rect[]): Composition => {
  const max = compositions.length - 1
  if (max === 0) {
    return compositions[0]
  }
  if (max === 1) {
    return combine(compositions[0], compositions[1])
  }
  const index1 = randomInt(0, max)
  const index2 = randomInt(0, max)

  if (index1 === index2) {
    return toTree(compositions)
  }
  const merged = combine(compositions[index1], compositions[index2])

  const lessCompositions = pipe(
    remove<Rect>(index1, 1),
    remove<Rect>(index2, 1),
    append<Rect>(merged)
  )(compositions)

  return toTree(lessCompositions)
}
