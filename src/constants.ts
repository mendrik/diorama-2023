import type { Milliseconds, Solution } from './types/types'
import { type Ord, range } from 'ramda'

export const maxImages = 18
export const images = range(1, maxImages).map(n => `./images/${n}.jpg`)
export const maxComputationTime = 500 as Milliseconds
export const randomizeThreshold = 11 // if amount of pics is bigger we have too many permutations to iterate through, switch to random strategy
export const iconSize = 20
export const initialImageAmount = 7
export const aspectRatioThreshold = 0.82

export const aspectRatioAndSize = ({ pictures, sizeHomogeneity, score }: Solution): Ord => {
  return pictures.length <= 4 ? score : score * sizeHomogeneity
}
