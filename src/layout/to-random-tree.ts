import type { Rect } from '../types/types'
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
  // eslint-disable-next-line no-var
  var index2
  do {
    index2 = randomInt(0, max)
  } while(index1 === index2)
  const merged = combine(compositions[index1], compositions[index2])

  return toRandomTree(compositions.with(index1, merged).toSpliced(index2, 1))
}
