/* eslint-disable @typescript-eslint/no-explicit-any */
import '../types/ramda'

import type { NonEmptyArray, PositionedPicture, Solution } from '../types/types'
import { evolve, last, pipe, prop, sortBy, takeLast } from 'ramda'
import { aspectRatioAndSize, maxImages } from '../constants'

export const evaluateSolutions = (results: NonEmptyArray<Solution>): Solution => {
  const sorted = pipe(
    sortBy(aspectRatioAndSize),
    takeLast((maxImages - results[0].pictures.length) * 5),
    sortBy(prop('score'))
  )(results)
  return evolve({ pictures: sortBy<PositionedPicture>(prop('url')) }, last(sorted) as Solution)
}
