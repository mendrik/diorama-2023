import type { Milliseconds, Solution } from './types/types'
import { type Ord } from 'ramda'

export const maxComputationTime = 400 as Milliseconds
export const randomizeThreshold = 11 // if amount of pics is bigger we have too many permutations to iterate through, switch to random strategy
export const iconSize = 30
export const initialImageAmount = 10
export const discardBadRatio = 0.9
export const preferAspectRatio = false

export enum ImageSet {
  animals = 18,
  portraits = 10
}

export const aspectRatioAndSize = ({ pictures, sizeHomogeneity, score }: Solution): Ord => {
  return pictures.length <= 4 ? score : score * sizeHomogeneity
}
