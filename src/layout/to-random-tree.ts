/* eslint-disable functional/immutable-data */
import type { Rect } from '../types/types'
import { randomInt } from '../utils/random'
import { Composition } from './composition'

const combine = (first: Rect, second: Rect): Composition =>
  new Composition(Boolean(randomInt(0, 1)), first, second)

export const toRandomTree = (compositions: Rect[]): Composition => {
  const max = compositions.length
  if (max === 1) {
    return compositions[0] as Composition
  }
  if (max === 2) {
    return combine(compositions[0], compositions[1])
  }
  const index1 = randomInt(0, max - 1)
  const index2 = randomInt(0, max - 1)

  if (index1 === index2) {
    return toRandomTree(compositions)
  }
  const merged = combine(compositions[index1], compositions[index2])

  const lessCompositions = [...compositions]
  lessCompositions[index1] = merged
  lessCompositions.splice(index2, 1)
  return toRandomTree(lessCompositions)
}
