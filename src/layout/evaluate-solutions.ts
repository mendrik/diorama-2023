/* eslint-disable @typescript-eslint/no-explicit-any */
import '../types/ramda'

import type { Config, NonEmptyArray, PositionedPicture, Solution } from '../types/types'
import { evolve, last, type Ord, pipe, prop, sortBy, takeLast } from 'ramda'

export const aspectRatioAndSize = ({ sizeHomogeneity, score }: Solution): Ord => {
  return score * sizeHomogeneity
}

export const evaluateSolutions = (config: Config, results: NonEmptyArray<Solution>): Solution => {
  // prettier-ignore
  const sorted = pipe(
    sortBy(aspectRatioAndSize),
    takeLast(30),
    sortBy(prop('score'))
  )(results)
  return evolve({ pictures: sortBy<PositionedPicture>(prop('url')) }, last(sorted) as Solution)
}
