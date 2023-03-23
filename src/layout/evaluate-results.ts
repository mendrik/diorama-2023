import { head } from 'ramda'
import { PositionedPictures } from '../types'

export const findBestResult = (results: PositionedPictures[]): PositionedPictures => {
  return head(results)!
}
