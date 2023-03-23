import { head } from 'ramda'
import { NonEmptyArray, PositionedPictures } from '../types'

export const findBestResult = (results: NonEmptyArray<PositionedPictures>): PositionedPictures =>
  head(results)
