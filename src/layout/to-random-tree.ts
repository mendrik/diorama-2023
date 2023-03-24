import { append, pipe, without } from 'ramda'
import { Rect } from '../types'
import { randomInt } from '../utils/random'
import { Composition } from './composition'

const combine = (first: Rect, second: Rect): Composition =>
  new Composition(Boolean(randomInt(0, 1)), first, second)

export const toRandomTree = (compositions: Rect[]): Composition => {
  const max = compositions.length - 1
  if (max === 0) {
    return compositions[0] as Composition
  }
  if (max === 1) {
    return combine(compositions[0], compositions[1])
  }
  const index1 = randomInt(0, max)
  const index2 = randomInt(0, max)

  if (index1 === index2) {
    return toRandomTree(compositions)
  }
  const merged = combine(compositions[index1], compositions[index2])

  const lessCompositions = pipe(
    without<Rect>([compositions[index1], compositions[index2]]),
    append<Rect>(merged)
  )(compositions)

  return toRandomTree(lessCompositions)
}
