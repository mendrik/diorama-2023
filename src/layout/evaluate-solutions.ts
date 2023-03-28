import { sizeHomogenity } from './../constants'
import { evolve, last, prop, sortBy } from 'ramda'
import type { Ord } from 'ramda'
import type { NonEmptyArray, Solution } from '../types/types'

const aspectRatioAndSize = (solution: Solution): Ord =>
  (solution.aspectRatioDelta + solution.sizeHomogeneity * sizeHomogenity) / (sizeHomogenity + 1)

export const evaluateSolutions = (results: NonEmptyArray<Solution>): Solution => {
  const rated = sortBy(aspectRatioAndSize, results) as NonEmptyArray<Solution>
  const winner = last(rated)
  return evolve({ pictures: sortBy(prop('url')) }, winner) as Solution
}
