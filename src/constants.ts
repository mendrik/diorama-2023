import type { Milliseconds } from './types/types'
import { range } from 'ramda'

export const maxImages = 18
export const images = range(1, maxImages).map(n => `./images/${n}.jpg`)
export const maxComputationTime = 400 as Milliseconds
export const randomizeThreshold = 11 // if amount of pics is bigger we have too many permutations to iterate through, switch to random strategy
export const iconSize = 30
export const initialImageAmount = 10
export const discardBadRatio = 0.8
