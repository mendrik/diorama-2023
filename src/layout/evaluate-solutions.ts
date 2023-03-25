import { sortBy } from 'ramda'
import type { Ord } from 'ramda'
import { NonEmptyArray, Solution } from '../types'

const aspectRatioAndSize = (solution: Solution): Ord => {
  const score = 1 - solution.aspectRatioDelta + (1 - solution.sizeHomogeneity)
  return score
}

export const evaluateSolutions = (results: NonEmptyArray<Solution>): Solution => {
  const rated = sortBy(aspectRatioAndSize, results) as NonEmptyArray<Solution>
  const winner = rated[0]
  console.log(winner)

  return winner
}
