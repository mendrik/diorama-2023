import { sortBy } from 'ramda'
import type { Ord } from 'ramda'
import { NonEmptyArray, PositionedPictures } from '../types'

const aspectRatioAndSize = (p: PositionedPictures): Ord =>
  (p.aspectRatioDelta + p.sizeHomogeneity) / 2

export const findBestResult = (results: NonEmptyArray<PositionedPictures>): PositionedPictures =>
  sortBy(aspectRatioAndSize, results)[0]
