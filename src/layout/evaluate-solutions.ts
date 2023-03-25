import { sizeHomogenity } from './../constants'
import { last, sortBy } from 'ramda'
import type { Ord } from 'ramda'
import { NonEmptyArray, Solution } from '../types'

const aspectRatioAndSize = (solution: Solution): Ord =>
  (solution.aspectRatioDelta + solution.sizeHomogeneity * sizeHomogenity) / (sizeHomogenity + 1)

export const evaluateSolutions = (results: NonEmptyArray<Solution>): Solution => {
  const rated = sortBy(aspectRatioAndSize, results) as NonEmptyArray<Solution>
  const winner = last(rated)
  console.debug(winner)
  return winner
}
