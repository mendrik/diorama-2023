/* eslint-disable @typescript-eslint/no-explicit-any */
import '../types/ramda'

import type { Config, NonEmptyArray, PositionedPicture, Solution } from '../types/types'
import { evolve, last, pipe, prop, sortBy, takeLast, when } from 'ramda'
import { aspectRatioAndSize } from '../constants'

export const evaluateSolutions = (config: Config, results: NonEmptyArray<Solution>): Solution => {
  // prettier-ignore
  const sorted = pipe(
    sortBy(aspectRatioAndSize),
    when(() => config.preferAspectRatio, pipe(
      takeLast((20 - results[0].pictures.length) * 2),
      sortBy(prop('score'))
    ))
  )(results)
  return evolve({ pictures: sortBy<PositionedPicture>(prop('url')) }, last(sorted) as Solution)
}
