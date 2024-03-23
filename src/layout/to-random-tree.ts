import type { Picture, Rect } from '../types/types'
import { Composition } from './composition'
import { randomInt } from '../utils/random'

// eslint-disable-next-line no-restricted-syntax
export function* generateTreeCompositions(pictures: Picture[]): Generator<Rect> {
  if (pictures.length === 1) {
    yield pictures[0] // A single picture is a valid Rect
  } else {
    for (let i = 1; i < pictures.length; i++) {
      const leftSubtrees = generateTreeCompositions(pictures.slice(0, i))
      const rightSubtrees = generateTreeCompositions(pictures.slice(i))

      for (const left of leftSubtrees) {
        for (const right of rightSubtrees) {
          // Explore both orientations for each combination of subtrees
          yield new Composition(true, left, right)
          yield new Composition(false, left, right)
        }
      }
    }
  }
}

const combine = (first: Rect, second: Rect): Composition =>
  new Composition(Boolean(randomInt(0, 1)), first, second)

const toRandomTree = (compositions: Rect[]): Composition => {
  const max = compositions.length - 1
  if (max === 0) {
    return compositions[0] as Composition
  }
  if (max === 1) {
    return combine(compositions[0], compositions[1])
  }
  const index1 = randomInt(0, max)
  // eslint-disable-next-line no-var
  let index2
  do {
    index2 = randomInt(0, max)
  } while(index1 === index2)
  const merged = combine(compositions[index1], compositions[index2])

  return toRandomTree(compositions.with(index1, merged).toSpliced(index2, 1))
}

// eslint-disable-next-line no-restricted-syntax
export function* toRandomTreeGenerator(compositions: Picture[]): Generator<Rect> {
  while(true) {
    yield toRandomTree(compositions)
  }
}

