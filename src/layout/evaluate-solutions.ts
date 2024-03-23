/* eslint-disable @typescript-eslint/no-explicit-any */
import '../types/ramda'

import type { PositionedPicture, NonEmptyArray, Solution } from '../types/types'
import { evolve, last, pipe, prop, reject, sortBy } from 'ramda'
import { aspectRatioAndSize, aspectRatioThreshold } from '../constants'

export const evaluateSolutions = (results: NonEmptyArray<Solution>): Solution => {
  const withOutGaps = reject<Solution>(({ score }) => score < aspectRatioThreshold)(results)

  const winner = pipe(
    sortBy(aspectRatioAndSize) as any,
    last
  )(withOutGaps.length > 0 ? withOutGaps : results) as Solution

  return evolve({ pictures: sortBy<PositionedPicture>(prop('url')) }, winner)
}
