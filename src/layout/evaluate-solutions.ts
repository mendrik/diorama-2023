/* eslint-disable @typescript-eslint/no-explicit-any */
import '../types/ramda'

import type { PositionedPicture, NonEmptyArray, Solution } from '../types/types'
import { evolve, last, pipe, prop, sortBy, takeLast } from 'ramda'
import { aspectRatioAndSize } from '../constants'

export const evaluateSolutions = (results: NonEmptyArray<Solution>): Solution => {
  const sorted = pipe(sortBy(aspectRatioAndSize), takeLast(20), sortBy(prop('score')))(results)
  return evolve({ pictures: sortBy<PositionedPicture>(prop('url')) }, last(sorted) as Solution)
}
