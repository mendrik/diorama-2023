import { sizeHomogenity } from './../constants'
import { sortBy } from 'ramda'
import type { Ord } from 'ramda'
import { NonEmptyArray, Solution } from '../types'

const aspectRatioAndSize = (solution: Solution): Ord => {
  const score =
    (solution.aspectRatioDelta + solution.sizeHomogeneity * sizeHomogenity) / (sizeHomogenity + 1)
  return score
}

export const evaluateSolutions = (results: NonEmptyArray<Solution>): Solution => {
  const rated = sortBy(aspectRatioAndSize, results) as NonEmptyArray<Solution>
  const winner = rated[rated.length - 1]
  console.debug(winner)
  return winner
}
