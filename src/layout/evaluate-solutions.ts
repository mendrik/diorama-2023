import '../types/ramda'

import type { NonEmptyArray, PositionedPicture, Solution } from '../types/types'
import { evolve, last, type Ord, pipe, prop, sortBy, takeLast } from 'ramda'

export const defaultStrategy = ({ sizeHomogeneity, score }: Solution): Ord => {
  return score * score * sizeHomogeneity
}

export const evaluateSolutions = (results: NonEmptyArray<Solution>): Solution => {
  const sorted = pipe(sortBy(defaultStrategy), takeLast(30), sortBy(prop('score')))(results)
  return evolve({ pictures: sortBy<PositionedPicture>(prop('url')) }, last(sorted) as Solution)
}
