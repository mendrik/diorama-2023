import '../types/ramda'

import type { PositionedPicture, Config, NonEmptyArray, Solution } from '../types/types'
import { evolve, last, prop, sortBy } from 'ramda'
import type { Ord } from 'ramda'

export const evaluateSolutions = (results: NonEmptyArray<Solution>, config: Config): Solution => {
  const aspectRatioAndSize = (solution: Solution): Ord =>
    (solution.aspectRatioDelta + solution.sizeHomogeneity * config.sizeHomogeneity) /
    (config.sizeHomogeneity + 1)

  const rated = sortBy(aspectRatioAndSize, results)
  const winner = last(rated)
  return evolve({ pictures: sortBy<PositionedPicture>(prop('url')) }, winner)
}
