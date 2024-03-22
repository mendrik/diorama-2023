import '../types/ramda'

import type { PositionedPicture, Config, NonEmptyArray, Solution } from '../types/types'
import { evolve, last, prop, sortBy } from 'ramda'
import type { Ord } from 'ramda'

const aspectRatioAndSize = (config:Config) => (solution: Solution): Ord =>
  (solution.score + solution.sizeHomogeneity * config.sizeHomogeneity) /
  (config.sizeHomogeneity + 1)

export const evaluateSolutions = (results: NonEmptyArray<Solution>, config: Config): Solution => {
  const rated = sortBy(aspectRatioAndSize(config), results)
  const winner = last(rated)
  return evolve({ pictures: sortBy<PositionedPicture>(prop('url')) }, winner)
}
