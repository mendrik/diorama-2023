import type { Milliseconds } from './types/types'

export const maxComputationTime = 400 as Milliseconds
export const randomizeThreshold = 10 // if amount of pics is bigger we have too many permutations to iterate through, switch to random strategy
export const iconSize = 30
export const initialImageAmount = 6
export const discardBadRatio = 0.8

export enum ImageSet {
  animals,
  family,
  art
}

export const maxImages = {
  [ImageSet.animals]: 18,
  [ImageSet.family]: 14,
  [ImageSet.art]: 12
}
